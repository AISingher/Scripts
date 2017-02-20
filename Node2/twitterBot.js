//thanks a user for following the account with a @ reply tweet.
//displays (5) latest tweets with keyword ('President') on console every (60 secs)
console.log('The bot is starting.')

var Twit=require('twit'); //import twit package

var config=require('./config');//import api keys, account info
var T = new Twit(config);//twitter object with keys

var stream = T.stream('user'); //user stream set up
stream.on('follow',followed);// when someone follows account

function followed(eventMsg){ //thank follower via reply tweet
	console.log("New Follower! \n replying...");
	// var name= eventMsg.source.name;
	var screenName= eventMsg.source.screen_name;
	tweetIt('@' + screenName + ' thanks for the follow!');
}

function tweetIt(txt){//tweet a message from account

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

var keyword='President';
console.log("finding recent tweets with keyword...\n");
findIt(keyword);
setInterval(findIt(keyword), 1000*60); //find 5 latest tweets with 'President' every 60 secs

function findIt(txt){// find latest tweets on twitter with keyword 
var getParams = { 
	q: txt,  //query 
	count: 5 // tweets returned
};

T.get('search/tweets', getParams, gotData);

function gotData(err, data, response) { //display tweets
  var tweets = data.statuses;
  for (var i=0; i<tweets.length; i++){
  	  console.log(tweets[i].text + "\n");
  }
}
}

//'since:2011-07-11',
