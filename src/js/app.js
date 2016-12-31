(function (win, doc) {
  const u       = win.u,
        ajax    = win.ajax

  // Starts the app //
  function init () {
    u('.friend').on('click', function (e) {
      e.preventDefault()
      e.stopPropagation()

      var friendId = u(e.currentTarget).attr('data-uuid')

      getPartial({
        route:     '/friend/' + friendId,
        body:      'id=' + friendId,
        container: u('.main-view')
      })
    })
  }

  // Updates the view //
  function update (content, container) {
    u(container).html(content)
  }

  function getPartial (options) {
    if (options.route) {
      ajax(options.route, {
        body:   options.body || '',
        method: options.method || 'GET'
      }, function (err, data) {
        if (data) {
          return update(data, options.container)
        } else {
          console.log(err)
        }
      }, function (xhr) {
        xhr.responseType = 'text'
      })
    }
  }

  init()
})(window, document)
