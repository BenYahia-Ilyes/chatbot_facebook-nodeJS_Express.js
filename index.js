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



const token = "EAAHASNZACqPQBAEqADudZBKZA3ZCJ8MQ7tXmVoED88q2B8R7k5bT4PohiaG6qgbuDffAmqrWxCQWT5tn6HYxiFXjWzc48OZBnJN9ZAwF887A08OgCaTO3nn87OANWy44naGBSOa9lmSGtBbLWhtNnzKCrcCRkxq4yicslj72NjPQZDZD";
app.post('/webhook/', function(req, res) {
    var messaging_events = req.body.entry[0].messaging;
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        if (event.message && event.message.text) {
            var text = event.message.text;
            sendTextMessage(sender, text + "!");
        }
    }
    res.sendStatus(200);
});
function sendTextMessage(sender, text) {
    var messageData = {
        text: text
    };
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: token
        },
        method: 'POST',
        json: {
            recipient: {
                id: sender
            },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error:', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}


