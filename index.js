#! /usr/bin/env node

(function(){

	'use strict';

	var BASE_URL = 'http://www.gocomics.com/calvinandhobbes/',
		STRIP_SELECTOR = '.strip',
		ELEMENT_ATTR = 'src',
		FIRST_DATE = '1985/11/18',
		DATE_FORMAT = 'YYYY/MM/DD';

	var dateGeneratorForOption = {
		'-d' : userProvidedDate,
		'-r' : validRandomDateInFormat
	}; 	 

	var request = require('request'),
		cheerio = require('cheerio'),
		urlOpener = require('openurl'),
		moment = require('moment');

	var option = process.argv[2],
		theDate,
		url;

	if(option) {
		if(dateGeneratorForOption[option]) {
			theDate = dateGeneratorForOption[option]();
		} else {
			console.error('Unknown option', option);
			return;
		}
	}
	
	if(theDate) {
		if(isValidDate(theDate)) {
			url = BASE_URL + theDate;
		} else {
			console.error('Could not parse the date', theDate ,'to', DATE_FORMAT);
			return;
		}
	} else {
		url = BASE_URL;
	}

	console.log('Strip from', url);
	request(url, function(error, response, body){
		if (!error) {
			var $ = cheerio.load(body),
				stripUrl = $(STRIP_SELECTOR).attr(ELEMENT_ATTR);
			urlOpener.open(stripUrl);
		} else {
			console.error('Opps ', error);
		}

	});

	function isValidDate(date) {
		return moment(date, DATE_FORMAT, true).isValid();
	}

	function userProvidedDate() {
		return process.argv[3];
	}

	function validRandomDateInFormat() {
		return moment(validRandomDate()).format(DATE_FORMAT);
	}

	function validRandomDate() {
		var start = new Date(FIRST_DATE);
		var yesterday = moment().subtract(1, 'days').toDate(); 
		return new Date(start.getTime() + Math.random() * (yesterday.getTime() - start.getTime()));
	}

})();