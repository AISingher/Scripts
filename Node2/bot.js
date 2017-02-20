console.log('The bot is starting')

var Twit=require('twit'); //import twit package

var config=require('./config');//import api keys
var T = new Twit(config);//twitter object with keys

var stream = T.stream('user'); //user stream set up
stream.on('follow',followed);// someone follows account

function followed(eventMsg){
	console.log("follow event");
	var name= eventMsg.source.name;
	var screenName= eventMsg.source.screen_name;
	tweetIt('@' + screenName + ' thanks for the follow!');
}


// tweetIt();
// setInterval(tweetIt, 1000*20); //call tweetIt every 20 secs

function tweetIt(txt){

	// var r = Math.floor(Math.random()*100);

	var postParams ={
		status: txt
	};

	T.post('statuses/update', postParams, postData);

	function postData(err, data, response) {
		if(err){
			console.log("Error");
		}
		else{
	  		console.log("Sucess");
		}
	}
}


// var getParams = { 
// 	q: 'bananas since:2011-07-11', //query 
// 	count: 5 //# tweets returned
// };

// T.get('search/tweets', getParams, gotData);

// function gotData(err, data, response) { //callback 
//   var tweets = data.statuses;
//   for (var i=0; i<tweets.length; i++){
//   	  console.log(tweets[i].text + "\n");
//   }
// };