
'use strict'

const request = require('sync-request')

function checkCountryCode(code = 'GB') {
    const res = request('GET', `https://restcountries.eu/rest/v2/alpha/${code}`)
    if (res.statusCode === 400) {
        throw new Error('invalid country code')
    }
}
