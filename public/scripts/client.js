/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/*

const tweetData = {
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
 */$(document).ready(function() {
  function showError(errorMessage) {
    const $errorElement = $('#error-message');
    $errorElement.text(errorMessage);
    $errorElement.slideDown(); // Show the error message with slideDown animation
  }

  function hideError() {
    const $errorElement = $('#error-message');
    $errorElement.slideUp(); // Hide the error message with slideUp animation
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        renderTweets(response);
      },
      error: function(error) {
        console.error('Error loading tweets:', error);
      }
    });
  }

  loadTweets();

  $('#tweet-form').submit(function(event) {
    event.preventDefault();

    const formData = $(this).serialize();
    const tweetContent = $('#tweet-text').val();

    if (tweetContent === '') {
      const errorMessage = 'Tweet content cannot be empty.';
      showError(errorMessage);
    } else if (tweetContent.length > 140) {
      const errorMessage = 'Tweet content is too long.';
      showError(errorMessage);
    } else {
      $.post('/tweets', $(this).serialize())
        .done(function(response) {
          console.log('Tweet posted successfully:', response);
          $('#tweet-text').val('');
          loadTweets();
          hideError();
        })
        .fail(function(xhr, status, error) {
          console.error('Error posting tweet:', status, error);
        });
    }
  });

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
    const $timeago = $('<div>').addClass('timeago').attr('datetime', tweet.created_at).text(timeago.format(tweet.created_at));
    $likes.append($likesIcon, $likesCount);
    $retweets.append($retweetsIcon, $retweetsCount);
    $footer.append($likes, $retweets, $timeago);
    $tweet.append($username, $handle, $content, $footer);
    
    return $tweet;
  }

  function renderTweets(tweets) {
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement);
    }
  }

  // Initial render of tweets
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };
  
  renderTweets([tweetData]);
  $('.timeago').timeago();
});
