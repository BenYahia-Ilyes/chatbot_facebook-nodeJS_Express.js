const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')

const app = express();

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(app.get('port'),function(){ console.log('running, port: 5000 ')});


app.get('/',(req, res)  => {
	res.send('yooo yo')
})


//facebook verification
app.get('/webhook',(req, res) => {
	//console.log(req)
	if (req.query['hub.verify_token'] === 'yoo_yo') {
		res.send(req.query['hub.challenge'])
	} else {
        res.sendStatus(403);
	}
})



const token = "EAAHASNZACqPQBAEqADudZBKZA3ZCJ8MQ7tXmVoED88q2B8R7k5bT4PohiaG6qgbuDffAmqrWxCQWT5tn6HYxiFXjWzc48OZBnJN9ZAwF887A08OgCaTO3nn87OANWy44naGBSOa9lmSGtBbLWhtNnzKCrcCRkxq4yicslj72NjPQZDZD";

// recieve and  send msgs
app.post('/webhook', (req, res) => {

	//console.log(req.body)
	console.log("**********************************************************************************")

	var msg = req.body.entry[0].messaging[0];
	//console.log(msg)
	var  sender = msg.sender.id;
	if (msg.message) {

		if (msg.message.attachments)   //Handel Images
		{
			var toSend="Je ne sais pas traiter ce type de demande !"
			var respense = {"text": toSend }
			sendText(sender,respense );
		} 
		else if (msg.message.text)    //Handel Text
		{
			var text = msg.message.text;
			var response = handelText(text)

			sendText(sender, response);
	
		}

	}

    res.sendStatus(200);
});


// write responses according to received text
const handelText = (text) => {

	if (text == "Comment vas-tu ?") {
		return{
			"attachment":{
				"type":"template",
				"payload":{
					"template_type":"button",
					"text": "Comment vas-tu ?",
					"buttons":[
						{
							"type":"postback",
							"title":"Très bien et vous ?",
							"payload":"Oui"  
						},
						{
							"type":"postback",
							"title": "Non, ça ne va pas",
							"payload":"Non" 
						}
					]
				}
			}
		}
	}else{
		return {text: text}
	}
}

function sendText(sender, response) {
	
	let request_body = {
        "recipient": { "id": sender },
        "message": response
	};
	
	request(
	{

        url: 'https://graph.facebook.com/v5.0/me/messages',
        qs: { access_token: token },
        method: 'POST',
		json: request_body
		
	}, (error, response, body)=>
	{
			if (error) {
				console.log('Error:', error);
			} else if (response.body.error) {
				console.log('Error: ', response.body.error);
			}
       });
}
