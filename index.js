#! /usr/bin/env node

(function(){

	'use strict';

	var request = require('request'),
		cheerio = require('cheerio'),
		urlOpener = require('openurl'),
		moment = require('moment'),
		tmpDir = require('os-tmpdir'),
		nConf = require('nconf'),
		CONST = require('./constant'),
		dateGenerator = require('./dategenerator');

	var option = process.argv[2],
		theDate,
		url;

	nConf.file({ file: configFileLocation() });	

	if(option) {
		theDate = dateGenerator.date(option);
		if(!theDate) {
			console.error('Unknown option', option);
			process.exit(1);
		}
	}
	
	if(theDate) {
		validateDate(theDate);
		url = CONST.BASE_URL + theDate;
		saveDateToConfig(theDate);
	} else {
		url = CONST.BASE_URL;
	}

	console.log('Strip from', url);
	request(url, function(error, response, body){
		if (!error) {
			var $ = cheerio.load(body),
				stripUrl = $(CONST.STRIP_SELECTOR).attr(CONST.ELEMENT_ATTR);
			urlOpener.open(stripUrl);
		} else {
			console.error('Opps ', error);
		}

	});

	function validateDate(dateToValidate) {
		var errorMessage = undefined;
		var date = moment(dateToValidate, CONST.DATE_FORMAT, true);

		if(!date.isValid()) {
			errorMessage = 'Count not parse the date ' + dateToValidate + ' to ' + CONST.DATE_FORMAT;
		} else if (date.isAfter(moment())) {
			errorMessage = 'Time machine not yet invented ' + dateToValidate;
		}

		if(errorMessage) {
			console.error(errorMessage);
			process.exit(1)
		}
	}

	function configFileLocation() {
	 	return tmpDir() + '/' + CONST.CONF_FILE;
	 }

	function saveDateToConfig(dateToSave) {
		nConf.set(CONST.CONF_DATE_PATH, dateToSave);
		nConf.save(function(err) {
			if(err) {
				console.error('Error while saving date', err);
			}
		});
	}

})();