const Sequence = require('./lib/Sequence')

const actions = function (region, start, end) {
  return {
    method: 'GET',
    uri: `/genomes/sequence/`,
    qs: {
      region: `${region}:${start}-${end}`,
    }
  }
}

const regions = {
  chr1: { start: 1, end: 249250621 },
  chr2: { start: 1, end: 243199373 },
  chr3: { start: 1, end: 198022430 },
  chr4: { start: 1, end: 191154276 },
  chr5: { start: 1, end: 180915260 },
  chr6: { start: 1, end: 171115067 },
  chr7: { start: 1, end: 159138663 },
  chr8: { start: 1, end: 146364022 },
  chr9: { start: 1, end: 141213431 },
  chr10: { start: 1, end: 135534747 },
  chr11: { start: 1, end: 135006516 },
  chr12: { start: 1, end: 133851895 },
  chr13: { start: 1, end: 115169878 },
  chr14: { start: 1, end: 107349540 },
  chr15: { start: 1, end: 102531392 },
  chr16: { start: 1, end: 90354753 },
  chr17: { start: 1, end: 81195210 },
  chr18: { start: 1, end: 78077248 },
  chr19: { start: 1, end: 59128983 },
  chr20: { start: 1, end: 63025520 },
  chr21: { start: 1, end: 48129895 },
  chr22: { start: 1, end: 51304566 },
  chrX: { start: 1, end: 155270560 },
  chrY: { start: 1, end: 59373566 },
  chrM: { start: 1, end: 16569 }
}

module.exports = function (request) {
  return function (region, start, end) {
    return new Promise((resolve, reject) => {
      const range = end - start
      if (range <= 0 || range > 100000) {
        return reject(new Error(`The requested Sequence is too long or negative: requested "${range}" chromosomes, while it has to be between 1 and 100000`))
      }
      if (!regions[region]) {
        return reject(new Error(`The requested chromosome: "${region}" does not exist`))
      }
      if (start < regions[region].start || end > regions[region].end) {
        return reject(new Error(`The requested Sequence is out of bounds: recieved "${start} to ${end}" while ${region} is from ${regions[region].start} to ${regions[region].end}`))
      }
      const payload = actions(region, start, end)
      request(payload, (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(new Sequence(res, region, start, end))
      })
    })
  }
}
