// Non functional yet, not exposed niether attached to Main object
// The chromosomes are massively heavy in term of data
// Might be UintArray with different length
// Which allow us to go from 3 Gb to 738 Mb (decrease by 300%)
// Still this Proto is pretty heavy and allocate in advance
// Please prefere using Array of Sequences (./Sequence) for light usage until we figure out what to do with this

const Genome = function () {
  this.chr1 = new Uint32Array(15578164) // 59.43 Mb
  this.chr2 = new Uint32Array(15199961) // 57.98 Mb
  this.chr3 = new Uint32Array(12376401) // 47.21 Mb
  this.chr4 = new Uint32Array(11947142) // 45.57 Mb
  this.chr5 = new Uint32Array(11307203) // 43.13 Mb
  this.chr6 = new Uint32Array(10694692) // 40.8 Mb
  this.chr7 = new Uint32Array(9946167) // 37.94 Mb
  this.chr8 = new Uint32Array(9147751) // 34.9 Mb
  this.chr9 = new Uint32Array(8825840) // 33.67 Mb
  this.chr10 = new Uint32Array(8470922) // 32.31 Mb
  this.chr11 = new Uint32Array(8437907) // 32.19 Mb
  this.chr12 = new Uint32Array(8365744) // 31.91 Mb
  this.chr13 = new Uint32Array(7198117) // 27.46 Mb
  this.chr14 = new Uint32Array(6709346) // 25.59 Mb
  this.chr15 = new Uint32Array(6408212) // 24.45 Mb
  this.chr16 = new Uint32Array(5647173) // 21.54 Mb
  this.chr17 = new Uint32Array(5074700) // 19.36 Mb
  this.chr18 = new Uint32Array(4879828) // 18.62 Mb
  this.chr19 = new Uint32Array(3695562) // 14.1 Mb
  this.chr20 = new Uint32Array(3939095) // 15.03 Mb
  this.chr21 = new Uint32Array(3008119) // 11.48 Mb
  this.chr22 = new Uint32Array(3206535) // 12.23 Mb
  this.chrX = new Uint32Array(9704410) // 37.02 Mb
  this.chrY = new Uint32Array(3710847) // 14.16 Mb
  this.chrM = new Uint32Array(1036) // 4.05 Kb
}
// Methods
// TODO add low level methods
Object.assign(Genome.prototype, {
  encode (sequence) {
  },
  decode (chr, from, to) {
  },
  encodeChr (seq) {
    return parseInt(seq.replace(/[ATCG]/g, m => {
      return m === 'A'
        ? '00'
        : m === 'T'
          ? '01'
          : m === 'C'
            ? '10'
            : '11'
    }), 2)
  },
  decodeChr (Uint) {
    let c = Uint;
    const codes = ['A', 'T', 'C', 'G']
    let seq = ''
    while (c / 4 > 1) {
      let r = c % 4
      seq = codes[r] + seq
      c -= r
      c /= 4 
    }
    return codes[c] + seq
  }
})

// module.exports = Genome
