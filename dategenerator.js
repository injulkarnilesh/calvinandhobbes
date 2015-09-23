(function(){
	
	'use strict';

	var CONST = require('./constant'),
		moment = require('moment'),
		nConf = require('nconf');

	var dateGeneratorForOption = {
		'-d' : userProvidedDate,
		'-r' : validRandomDateInFormat,
		'-n' : nextDateToDateFromConfig
	};

	function userProvidedDate() {
		return process.argv[3];
	}

	function validRandomDateInFormat() {
		return moment(validRandomDate()).format(CONST.DATE_FORMAT);
	}

	function validRandomDate() {
		var start = new Date(CONST.FIRST_DATE);
		var yesterday = moment().subtract(1, 'days').toDate(); 
		return new Date(start.getTime() + Math.random() * (yesterday.getTime() - start.getTime()));
	}

	function nextDateToDateFromConfig() {
		return moment(dateFromConfig(), CONST.DATE_FORMAT).add(1, 'days').format(CONST.DATE_FORMAT);
	}

	function dateFromConfig() {
		return nConf.get(CONST.CONF_DATE_PATH);
	}

	function generateDate(option) {
		return dateGeneratorForOption[option]();
	}

	module.exports.date = generateDate;

})();