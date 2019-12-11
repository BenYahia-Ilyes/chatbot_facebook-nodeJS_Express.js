const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')

const app = express();

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(app.get('port'),function(){ console.log('running, port: 5000 ')});


// index
app.get('/',(req, res)  => {
	res.send('hello world i am a secret bot yoo yo')
})


// for facebook verification
app.get('/webhook',(req, res) => {
	//console.log(req)
	if (req.query['hub.verify_token'] === 'yoo_yo') {
		res.send(req.query['hub.challenge'])
	} else {
        res.sendStatus(403);
	}
})



const token = "EAAHASNZACqPQBAEqADudZBKZA3ZCJ8MQ7tXmVoED88q2B8R7k5bT4PohiaG6qgbuDffAmqrWxCQWT5tn6HYxiFXjWzc48OZBnJN9ZAwF887A08OgCaTO3nn87OANWy44naGBSOa9lmSGtBbLWhtNnzKCrcCRkxq4yicslj72NjPQZDZD";
app.post('/webhook', (req, res) => {

	console.log(req.body)
	console.log("**********************************************************************************")

	var msg = req.body.entry[0].messaging[0];
	//console.log(msg)
	var  sender = msg.sender.id;
	console.log(msg)
	if (msg.message) {

		if (msg.message.attachments)
		{
			sendText(sender, "Je ne sais pas traiter ce type de demande !");
		} 
		else if (msg.message.text)
		{
			var text = msg.message.text;

			if (text == "Comment vas-tu ?")
			{
				sendText(sender, "special treatment ");

			}
			else
			{
				sendText(sender, text);

			}	
		}



	}

    res.sendStatus(200);
});


function sendText(sender, text) {
    var toSend = {text: text};
    request(
	{

        url: 'https://graph.facebook.com/v5.0/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: toSend,
		}
		
	}, function(error, response, body)
	 {
        if (error) {
            console.log('Error:', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
     });
}
