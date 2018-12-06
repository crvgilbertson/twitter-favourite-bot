const Twitter = require('twitter');
const config = require('./config.js');
let T = new Twitter(config);

// Search parameters
var params = {
  q: '#PMQs',
  count: 10,
  result_type: 'recent',
  lang: 'en'
}

// Initiate search
T.get('search/tweets', params, function(err, data, response) {
  // identify any errors
  if(!err){
    // Loop through tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get tweet Id
      let id = { id: data.statuses[i].id_str }
      // Favourite the tweet
      T.post('favorites/create', id, function(err, response){
        // log error is unable to favourite
        if(err){
          console.log(err[0].message);
        }
        // log if successful in favouriting
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})
