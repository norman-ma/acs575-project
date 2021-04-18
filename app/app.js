require('dotenv').config()

const express = require('express')
const bodyParser= require('body-parser')
const path = require('path')
const { Client } = require('pg')
const db = new Client()

db.connect(err => {
	if(err)
		console.error('Connection error', err.stack)
	else
		console.log('Connected to database')
})

const port = process.env.PORT
const app = express()

global.db = db
global.app = app
global.express = express

app.set('port', process.env.port || port)
app.set('views', __dirname + '/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./routes'))

app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})