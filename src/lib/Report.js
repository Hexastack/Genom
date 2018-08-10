const Report = function (result) {
  this.summary = result.summary
  this.phenotype = result.phenotype
  this.scores = result.scores
}
// Methods
// TODO add low level methods
Object.assign(Report.prototype, {

})

module.exports = Report
