
'use strict'

const Jasmine = require('jasmine')
const jasmine = new Jasmine()

jasmine.loadConfigFile('spec/jasmine.json')

const JasmineConsoleReporter = require('jasmine-console-reporter')
const reporter = new JasmineConsoleReporter({
	colors: true,
	cleanStack: true,
	verbosity: 4,
	listStyle: 'indent',
	activity: true
})

jasmine.addReporter(reporter)

jasmine.execute()
