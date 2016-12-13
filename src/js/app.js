(function (win, doc) {
  fetch('/api/get/')
  .then((response) => {
    console.log(response)
  })
  .catch((err) => {
    console.log(err)
  })
})(window, document)
