module.exports = {
  sleep: function(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}
