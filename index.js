const path       = require('path'),
      express    = require('express'),
      exphbs     = require('express-handlebars'),
      api        = require('./lib/api'),
      config     = require('./config'),
      server     = express(),
      router     = express.Router(),

      ENV        = 'dev',
      PORT       = config.env[ENV].port,
      FILES      = config.env[ENV].files,

      hbs = exphbs.create({
        extname:       '.hbs',
        viewsDir:      `${FILES}/templates/pages/`,
        layoutsDir:    `${FILES}/templates/layouts/`,
        partialsDir:   `${FILES}/templates/partials/`,
        defaultLayout: 'master'
      })

// Express - Server Configuration //
server.use('/', express.static(path.join(__dirname, FILES)))
server.use(router)
server.engine('.hbs', hbs.engine)
server.set('port', process.env.PORT || PORT)
server.set('view engine', '.hbs')
server.set('views', 'src/templates/')

// Default Route - Renders the Homepage layout //
router.get('/', function (req, res) {
  const userData    = api.getUser(),
        friendsData = api.getFriends()

  res.render('pages/home', {
    user:    userData,
    friends: friendsData
  })
})

// Default Route - Renders the Homepage layout //
router.get('/friend/:id', function (req, res, next) {
  const friendData  = api.getFriend(req.params.id)
  res.render('partials/friend-profile', {
    layout: false,
    friend: friendData,
    apiKey: config.MAPS_KEY
  })
})

// Get Users Route - Returns the compiled userlist //
router.get('/api/getFriends', function (req, res, next) {
  res.render('partials/user-list', {
    layout: false,
    users:  api.getFriends()
  })
})

router.get('/api/getUser', function (req, res, next) {
  res.render('partials/usercard', {
    user: api.getUser()
  })
})

// Makes the server listen for requests on the defined port //
server.listen(server.get('port'), function () {
  console.log(`Server listening on port: ${server.get('port')}. Environment: ${server.get('env')}`)
})
