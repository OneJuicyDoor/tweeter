
$(document).ready(function() {
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
    const tweetContent = $('#tweet-text').val().trim(); // Use trim() to remove whitespace

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
  const { name, handle } = tweet.user;
  const { text } = tweet.content;
  const created_at = tweet.created_at

  const $tweet = $(
    `<article class="tweet">
       <div class="tweet-header">
        <span class="username">${name}</span>
        <span class="handle">${handle} </span>
       </div>
    <div class="tweet-text">${text}</div>
     <footer>
      <div class="likes"><i class="fas fa-heart"></i> <span>0</span></div>
       <div class="retweets"><i class="fas fa-retweet"></i> <span>0</span></div>
      <div class="timeago" datetime="${created_at}">${timeago.format(created_at)}</div>
     </footer>
  <article/>`)
  
   return $tweet;
}

  function renderTweets(tweets) {
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement);
    }
  }

  const tweetData = {
  };
  
  renderTweets([tweetData]);
  $('.timeago').timeago();
});
