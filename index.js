const path    = require('path'),
      express = require('express'),
      exphbs  = require('express-handlebars'),
      api     = require('./lib/api'),
      config  = require('./config'),
      server  = express(),
      router  = express.Router(),

      ENV     = 'dev',
      PORT    = config.env[ENV].port,
      FILES   = config.env[ENV].files,

      hbs = exphbs.create({
        extname:       '.hbs',
        layoutsDir:    `${FILES}/templates/layouts/`,
        partialsDir:   `${FILES}/templates/partials/`,
        defaultLayout: 'master'
      })

server.use('/', express.static(path.join(__dirname, FILES)))
server.use(router)
server.engine('.hbs', hbs.engine)

server.set('view engine', '.hbs')
server.set('views', 'src/templates/views/')

router.get('/', function (req, res) {
  res.render('index')
})

router.get('/api/get', function (req, res) {
  const data = api.getUser()

  if (data) {
    res.status(200).json(data)
  } else {
    res.status(404).send('404 Oopsie')
  }
})

server.listen(PORT, function () {
  console.log(`Server listening on port: ${PORT}. Environment: ${ENV}`)
})
