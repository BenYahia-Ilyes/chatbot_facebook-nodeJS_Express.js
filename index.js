const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')

const app = express();

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(app.get('port'),function(){ console.log('running, port: 5000 ')});


// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot yoo yo')
})

app.get('/yoo', function (req, res) {
	res.send('yoo yo')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	console.log(req.query)
	if (req.query['hub.verify_token'] === 'yoo_yo') {
		res.send(req.query['hub.challenge'])
	} else {
        res.sendStatus(403);
	}
})

