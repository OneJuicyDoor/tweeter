/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

*/
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


function createTweetElement(tweet) {
  
  const $tweet = $('<article>').addClass('tweet');
  const $username = $('<div>').addClass('username').text(tweet.user.name);
  const $handle = $('<div>').addClass('handle').text(tweet.user.handle);
  const $content = $('<div>').text(tweet.content.text);
  const $footer = $('<footer>');
  const $likes = $('<div>').addClass('likes');
  const $likesIcon = $('<i>').addClass('fas fa-heart');
  const $likesCount = $('<span>').text('0');
  const $retweets = $('<div>').addClass('retweets');
  const $retweetsIcon = $('<i>').addClass('fas fa-retweet');
  const $retweetsCount = $('<span>').text('0');
  
  $likes.append($likesIcon, $likesCount);
  $retweets.append($retweetsIcon, $retweetsCount);
  $footer.append($likes, $retweets);
  $tweet.append($username, $handle, $content, $footer);
  
  return $tweet;


  }


const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $('#tweets-container').append($tweetElement);
  }
};


renderTweets(data)