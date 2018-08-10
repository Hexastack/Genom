const Report = require('./lib/Report')

const actions = function (report, population) {
  return {
    method: 'GET',
    uri: `/reports/${report}/`,
    qs: {
      population,
    }
  }
}

const reports = [
  'agreeableness',
  'alcohol-drinking-behavior',
  'alpha-linolenic-acid',
  'anger',
  'beard-thickness',
  'beta-carotene',
  'bitter-taste',
  'black-hair',
  'blood-glucose',
  'bmi',
  'body-fat-mass',
  'body-fat-percentage',
  'breast-size',
  'caffeine-consumption',
  'caffeine-metabolite-ratio',
  'calcium',
  'carbohydrate-intake',
  'childhood-intelligence',
  'conscientiousness',
  'depression',
  'egg-allergy',
  'endurance-performance',
  'excessive-daytime-sleepiness',
  'extraversion',
  'folate',
  'freckles',
  'gambling',
  'eye-color',
  'weight',
  'harm-avoidance',
  'hearing-function',
  'height',
  'hippocampal-volume',
  'intelligence',
  'iron',
  'job-related-exhaustion',
  'lean-body-mass',
  'lobe-size',
  'longevity',
  'magnesium',
  'male-pattern-baldness-aga',
  'mathematical-ability',
  'milk-allergy',
  'morning-person',
  'motion-sickness',
  'neuroticism',
  'novelty-seeking',
  'openness',
  'peanuts-allergy',
  'phosphorus',
  'protein-intake',
  'reading-and-spelling-ability',
  'red-hair',
  'red-wine-liking',
  'response-to-vitamin-e-supplementation',
  'reward-dependence',
  'skin-pigmentation',
  'sleep-duration',
  'smell-sensitivity-for-malt',
  'smoking-behavior',
  'visceral-and-subcutaneous-adipose-tissue-ratio',
  'vitamin-a',
  'vitamin-b12',
  'vitamin-d',
  'vitamin-e',
  'waist',
  'waist-hip-ratio',
  'white-wine-liking',
  'word-reading-ability'
]

const populations = [
  'european' 
  // will be supported later,
  // 'east-asian',
  // 'african',
  // 'global'
]

module.exports = function (request) {
  return function (report, population = 'european') {
    return new Promise((resolve, reject) => {
      if (reports.indexOf(report) === -1) {
        return reject (new Error(`The requested report: "${report}" isn't supported by the api, please refere to : 'https://genomelink.io/developers/reference/reports/'`))
      }
      if (populations.indexOf(population) === -1) {
        return reject (new Error(`The requested population: "${population}" isn't supported yet by the api, only '${populations}' are available at the moment`))
      }
      const payload = actions(report, population)
      request(payload, (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(new Report(res))
      })
    })
  }
}
