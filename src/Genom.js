const request = require('request')
const requestApi = require('./lib/requestAPI')

const report = require('./Report')
const sequence = require('./Sequence')

const Genom = function(token, timeout) {
  const requestWrapper = request.defaults({
    baseUrl: 'https://genomelink.io/v1',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    timeout: timeout || 20000
  })
  this.doRequest = requestApi(requestWrapper)
  this.report = report(this.doRequest)
  this.sequence = sequence(this.doRequest)
}

module.exports = Genom
