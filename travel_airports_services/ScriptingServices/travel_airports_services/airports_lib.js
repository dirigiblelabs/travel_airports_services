/* globals $ */
/* eslint-env node, dirigible */

var request = require("net/http/request");
var response = require("net/http/response");
var database = require("db/database");

var datasource = database.getDatasource();

// create entity by parsing JSON object from request body
exports.createTravel_airports = function() {
    var input = request.readInputText();
    var requestBody = JSON.parse(input);
    var connection = datasource.getConnection();
    try {
        var sql = "INSERT INTO TRAVEL_AIRPORTS (";
        sql += "AIRPORT_ID";
        sql += ",";
        sql += "AIRPORT_NAME";
        sql += ",";
        sql += "AIRPORT_CITY";
        sql += ",";
        sql += "AIRPORT_COUNTRY";
        sql += ",";
        sql += "AIRPORT_IATA_FAA";
        sql += ",";
        sql += "AIRPORT_ICAO";
        sql += ",";
        sql += "AIRPORT_LATITUDE";
        sql += ",";
        sql += "AIRPORT_LONGITUDE";
        sql += ",";
        sql += "AIRPORT_ALTITUDE";
        sql += ",";
        sql += "AIRPORT_TIMEZONE";
        sql += ",";
        sql += "AIRPORT_DST";
        sql += ",";
        sql += "AIRPORT_TZ";
        sql += ") VALUES ("; 
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ",";
        sql += "?";
        sql += ")";

        var statement = connection.prepareStatement(sql);
        var i = 0;
        var id = datasource.getSequence('TRAVEL_AIRPORTS_AIRPORT_ID').next();
        statement.setInt(++i, id);
        statement.setString(++i, requestBody.airport_name);
        statement.setString(++i, requestBody.airport_city);
        statement.setString(++i, requestBody.airport_country);
        statement.setString(++i, requestBody.airport_iata_faa);
        statement.setString(++i, requestBody.airport_icao);
        statement.setDouble(++i, requestBody.airport_latitude);
        statement.setDouble(++i, requestBody.airport_longitude);
        statement.setDouble(++i, requestBody.airport_altitude);
        statement.setDouble(++i, requestBody.airport_timezone);
        statement.setString(++i, requestBody.airport_dst);
        statement.setString(++i, requestBody.airport_tz);
        statement.executeUpdate();
		response.println(id);
        return id;
    } catch(e) {
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
    return -1;
};

// read single entity by id and print as JSON object to response
exports.readTravel_airportsEntity = function(id) {
    var connection = datasource.getConnection();
    try {
        var result;
        var sql = "SELECT * FROM TRAVEL_AIRPORTS WHERE " + exports.pkToSQL();
        var statement = connection.prepareStatement(sql);
        statement.setInt(1, id);
        
        var resultSet = statement.executeQuery();
        if (resultSet.next()) {
            result = createEntity(resultSet);
        } else {
        	exports.printError(response.NOT_FOUND, 1, "Record with id: " + id + " does not exist.", sql);
        }
        var jsonResponse = JSON.stringify(result, null, 2);
        response.println(jsonResponse);
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
};

// read all entities and print them as JSON array to response
exports.readTravel_airportsList = function(limit, offset, sort, desc) {
    var connection = datasource.getConnection();
    try {
        var result = [];
        var sql = "SELECT ";
        if (limit !== null && offset !== null) {
            sql += " " + datasource.getPaging().genTopAndStart(limit, offset);
        }
        sql += " * FROM TRAVEL_AIRPORTS";
        if (sort !== null) {
            sql += " ORDER BY " + sort;
        }
        if (sort !== null && desc !== null) {
            sql += " DESC ";
        }
        if (limit !== null && offset !== null) {
            sql += " " + datasource.getPaging().genLimitAndOffset(limit, offset);
        }
        var statement = connection.prepareStatement(sql);
        var resultSet = statement.executeQuery();
        while (resultSet.next()) {
            result.push(createEntity(resultSet));
        }
        var jsonResponse = JSON.stringify(result, null, 2);
        response.println(jsonResponse);
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
};

//create entity as JSON object from ResultSet current Row
function createEntity(resultSet) {
    var result = {};
	result.airport_id = resultSet.getInt("AIRPORT_ID");
    result.airport_name = resultSet.getString("AIRPORT_NAME");
    result.airport_city = resultSet.getString("AIRPORT_CITY");
    result.airport_country = resultSet.getString("AIRPORT_COUNTRY");
    result.airport_iata_faa = resultSet.getString("AIRPORT_IATA_FAA");
    result.airport_icao = resultSet.getString("AIRPORT_ICAO");
    result.airport_latitude = resultSet.getDouble("AIRPORT_LATITUDE");
    result.airport_longitude = resultSet.getDouble("AIRPORT_LONGITUDE");
    result.airport_altitude = resultSet.getDouble("AIRPORT_ALTITUDE");
    result.airport_timezone = resultSet.getDouble("AIRPORT_TIMEZONE");
    result.airport_dst = resultSet.getString("AIRPORT_DST");
    result.airport_tz = resultSet.getString("AIRPORT_TZ");
    return result;
}

function convertToDateString(date) {
    var fullYear = date.getFullYear();
    var month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
    var dateOfMonth = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return fullYear + "/" + month + "/" + dateOfMonth;
}

// update entity by id
exports.updateTravel_airports = function() {
    var input = request.readInputText();
    var responseBody = JSON.parse(input);
    var connection = datasource.getConnection();
    try {
        var sql = "UPDATE TRAVEL_AIRPORTS SET ";
        sql += "AIRPORT_NAME = ?";
        sql += ",";
        sql += "AIRPORT_CITY = ?";
        sql += ",";
        sql += "AIRPORT_COUNTRY = ?";
        sql += ",";
        sql += "AIRPORT_IATA_FAA = ?";
        sql += ",";
        sql += "AIRPORT_ICAO = ?";
        sql += ",";
        sql += "AIRPORT_LATITUDE = ?";
        sql += ",";
        sql += "AIRPORT_LONGITUDE = ?";
        sql += ",";
        sql += "AIRPORT_ALTITUDE = ?";
        sql += ",";
        sql += "AIRPORT_TIMEZONE = ?";
        sql += ",";
        sql += "AIRPORT_DST = ?";
        sql += ",";
        sql += "AIRPORT_TZ = ?";
        sql += " WHERE AIRPORT_ID = ?";
        var statement = connection.prepareStatement(sql);
        var i = 0;
        statement.setString(++i, responseBody.airport_name);
        statement.setString(++i, responseBody.airport_city);
        statement.setString(++i, responseBody.airport_country);
        statement.setString(++i, responseBody.airport_iata_faa);
        statement.setString(++i, responseBody.airport_icao);
        statement.setDouble(++i, responseBody.airport_latitude);
        statement.setDouble(++i, responseBody.airport_longitude);
        statement.setDouble(++i, responseBody.airport_altitude);
        statement.setDouble(++i, responseBody.airport_timezone);
        statement.setString(++i, responseBody.airport_dst);
        statement.setString(++i, responseBody.airport_tz);
        var id = responseBody.airport_id;
        statement.setInt(++i, id);
        statement.executeUpdate();
		response.println(id);
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
};

// delete entity
exports.deleteTravel_airports = function(id) {
    var connection = datasource.getConnection();
    try {
    	var sql = "DELETE FROM TRAVEL_AIRPORTS WHERE " + exports.pkToSQL();
        var statement = connection.prepareStatement(sql);
        statement.setString(1, id);
        statement.executeUpdate();
        response.println(id);
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
};

exports.countTravel_airports = function() {
    var count = 0;
    var connection = datasource.getConnection();
    try {
    	var sql = 'SELECT COUNT(*) FROM TRAVEL_AIRPORTS';
        var statement = connection.prepareStatement(sql);
        var rs = statement.executeQuery();
        if (rs.next()) {
            count = rs.getInt(1);
        }
    } catch(e){
        var errorCode = response.BAD_REQUEST;
        exports.printError(errorCode, errorCode, e.message, sql);
    } finally {
        connection.close();
    }
    response.println(count);
};

exports.metadataTravel_airports = function() {
	var entityMetadata = {
		name: 'travel_airports',
		type: 'object',
		properties: []
	};
	
	var propertyairport_id = {
		name: 'airport_id',
		type: 'integer',
	key: 'true',
	required: 'true'
	};
    entityMetadata.properties.push(propertyairport_id);

	var propertyairport_name = {
		name: 'airport_name',
		type: 'string'
	};
    entityMetadata.properties.push(propertyairport_name);

	var propertyairport_city = {
		name: 'airport_city',
		type: 'string'
	};
    entityMetadata.properties.push(propertyairport_city);

	var propertyairport_country = {
		name: 'airport_country',
		type: 'string'
	};
    entityMetadata.properties.push(propertyairport_country);

	var propertyairport_iata_faa = {
		name: 'airport_iata_faa',
		type: 'string'
	};
    entityMetadata.properties.push(propertyairport_iata_faa);

	var propertyairport_icao = {
		name: 'airport_icao',
		type: 'string'
	};
    entityMetadata.properties.push(propertyairport_icao);

	var propertyairport_latitude = {
		name: 'airport_latitude',
		type: 'double'
	};
    entityMetadata.properties.push(propertyairport_latitude);

	var propertyairport_longitude = {
		name: 'airport_longitude',
		type: 'double'
	};
    entityMetadata.properties.push(propertyairport_longitude);

	var propertyairport_altitude = {
		name: 'airport_altitude',
		type: 'double'
	};
    entityMetadata.properties.push(propertyairport_altitude);

	var propertyairport_timezone = {
		name: 'airport_timezone',
		type: 'double'
	};
    entityMetadata.properties.push(propertyairport_timezone);

	var propertyairport_dst = {
		name: 'airport_dst',
		type: 'string'
	};
    entityMetadata.properties.push(propertyairport_dst);

	var propertyairport_tz = {
		name: 'airport_tz',
		type: 'string'
	};
    entityMetadata.properties.push(propertyairport_tz);


	response.println(JSON.stringify(entityMetadata));
};

exports.getPrimaryKeys = function() {
    var result = [];
    var i = 0;
    result[i++] = 'AIRPORT_ID';
    if (result === 0) {
        throw new Error("There is no primary key");
    } else if(result.length > 1) {
        throw new Error("More than one Primary Key is not supported.");
    }
    return result;
};

exports.getPrimaryKey = function() {
	return exports.getPrimaryKeys()[0].toLowerCase();
};

exports.pkToSQL = function() {
    var pks = exports.getPrimaryKeys();
    return pks[0] + " = ?";
};

exports.hasConflictingParameters = function(id, count, metadata) {
    if(id !== null && count !== null){
    	printError(response.EXPECTATION_FAILED, 1, "Expectation failed: conflicting parameters - id, count");
        return true;
    }
    if(id !== null && metadata !== null){
    	printError(response.EXPECTATION_FAILED, 2, "Expectation failed: conflicting parameters - id, metadata");
        return true;
    }
    return false;
}

// check whether the parameter exists 
exports.isInputParameterValid = function(paramName) {
    var param = request.getParameter(paramName);
    if(param === null || param === undefined){
    	printError(response.PRECONDITION_FAILED, 3, "Expected parameter is missing: " + paramName);
        return false;
    }
    return true;
}

// print error
exports.printError = function(httpCode, errCode, errMessage, errContext) {
    var body = {'err': {'code': errCode, 'message': errMessage}};
    response.setStatus(httpCode);
    response.setHeader("Content-Type", "application/json");
    response.print(JSON.stringify(body));
    console.error(JSON.stringify(body));
    if (errContext !== null) {
    	console.error(JSON.stringify(errContext));
    }
}
