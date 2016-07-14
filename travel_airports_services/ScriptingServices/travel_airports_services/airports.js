/* globals $ */
/* eslint-env node, dirigible */

var entityTravel_airports = require('travel_airports_services/airports_lib');
var request = require("net/http/request");
var response = require("net/http/response");
var xss = require("utils/xss");

handleRequest();

function handleRequest() {
	
	response.setContentType("application/json; charset=UTF-8");
	response.setCharacterEncoding("UTF-8");
	
	// get method type
	var method = request.getMethod();
	method = method.toUpperCase();
	
	//get primary keys (one primary key is supported!)
	var idParameter = entityTravel_airports.getPrimaryKey();
	
	// retrieve the id as parameter if exist 
	var id = xss.escapeSql(request.getParameter(idParameter));
	var count = xss.escapeSql(request.getParameter('count'));
	var metadata = xss.escapeSql(request.getParameter('metadata'));
	var sort = xss.escapeSql(request.getParameter('sort'));
	var limit = xss.escapeSql(request.getParameter('limit'));
	var offset = xss.escapeSql(request.getParameter('offset'));
	var desc = xss.escapeSql(request.getParameter('desc'));
	
	if (limit === null) {
		limit = 100;
	}
	if (offset === null) {
		offset = 0;
	}
	
	if(!entityTravel_airports.hasConflictingParameters(id, count, metadata)) {
		// switch based on method type
		if ((method === 'POST')) {
			// create
			entityTravel_airports.createTravel_airports();
		} else if ((method === 'GET')) {
			// read
			if (id) {
				entityTravel_airports.readTravel_airportsEntity(id);
			} else if (count !== null) {
				entityTravel_airports.countTravel_airports();
			} else if (metadata !== null) {
				entityTravel_airports.metadataTravel_airports();
			} else {
				entityTravel_airports.readTravel_airportsList(limit, offset, sort, desc);
			}
		} else if ((method === 'PUT')) {
			// update
			entityTravel_airports.updateTravel_airports();    
		} else if ((method === 'DELETE')) {
			// delete
			if(entityTravel_airports.isInputParameterValid(idParameter)){
				entityTravel_airports.deleteTravel_airports(id);
			}
		} else {
			entityTravel_airports.printError(response.BAD_REQUEST, 4, "Invalid HTTP Method", method);
		}
	}
	
	// flush and close the response
	response.flush();
	response.close();
}