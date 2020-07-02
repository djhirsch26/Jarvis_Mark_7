const search = function(stuff) {
  console.log("Showing stuff: ", stuff)
  return ['SEARCH', stuff]
}

const hello = function() {
  console.log("Hello Sir")
  return ['HELLO']
}

module.exports = {
  hello,
  search,
}
