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


// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
 
    let body = req.body;
 
    if (body.object === 'page') {
 
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {
 
            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
 
            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);
 
            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                console.log(webhook_event.message)
            } else if (webhook_event.postback) {
                console.log(webhook_event.postback)
            }
        });
 
        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
 
});
