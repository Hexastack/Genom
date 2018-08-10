const request = require('request')
const requestApi = require('./lib/requestAPI')

const report = require('./Report')
const genome = require('./Genome')

const Geno = function(token, timeout) {
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
  this.genome = genome(this.doRequest)
}

module.exports = Geno
