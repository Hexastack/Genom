module.exports = function (request) {
  return function (params, callback) {
    request(params, (error, response, body) => {
      if (error) {
        return callback(error, null)
      }
      let json = {}
      try {
        json = JSON.parse(body)
      } catch (e) {
        return callback(e, null)
      }

      if (response && response.statusCode != '200') {
        return callback(new Error(json.detail), null)
      }
      return callback(null, json)
    });
  }
}
