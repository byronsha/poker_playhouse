const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('../webpack.config.js')
const routes = require('./routes/index')
const db = require('./models')
const gameSocket = require('./socket');

const app = express()
const server = http.createServer(app)
const io = socketIo(server)
const compiler = webpack(webpackConfig)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
} else if (process.env.NODE_ENV === 'production') {
  app.get('/', (res) => {
    res.sendFile(path.join(__dirname + 'index.html'))
  })
}

app.use('/api', routes);
io.on('connection', socket => gameSocket.init(socket, io));
db.sequelize.sync();

server.listen(process.env.PORT)