$(document).ready(function() {
  // Function to display error messages
  function showError(errorMessage) {
    const $errorElement = $('#error-message');
    $errorElement.text(errorMessage);
    $errorElement.slideDown(); // Show the error message with slideDown animation
  }

  // Function to hide error messages
  function hideError() {
    const $errorElement = $('#error-message');
    $errorElement.slideUp(); // Hide the error message with slideUp animation
  }

  // Function to load tweets from the server
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

  // Load tweets when the page is ready
  loadTweets();

  // Handle form submission when user wants to post a new tweet
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
      // Post the new tweet to the server
      $.post('/tweets', $(this).serialize())
        .done(function(response) {
          console.log('Tweet posted successfully:', response);
          $('#tweet-text').val(''); // Clear the tweet text area
          loadTweets(); // Reload tweets to display the new one
          hideError(); // Hide any existing error message
        })
        .fail(function(xhr, status, error) {
          console.error('Error posting tweet:', status, error);
        });
    }
  });

  // Function to create HTML elements for each tweet
  function createTweetElement(tweet) {
    const { name, handle, avatars } = tweet.user;
    const { text } = tweet.content;
    const created_at = tweet.created_at;
  
    const $tweet = $(
      `<article class="tweet">
         <div class="tweet-header">
          <img class="profile-picture" src="${avatars}" alt="${name}">
          <span class="username">${name}</span>
          <span class="handle">${handle}</span>
         </div>
         <div class="tweet-text">${text}</div>
         <footer>
          <div class="likes"><i class="fas fa-heart"></i> <span>0</span></div>
          <div class="retweets"><i class="fas fa-retweet"></i> <span>0</span></div>
          <div class="timeago" datetime="${created_at}">${timeago.format(created_at)}</div>
         </footer>
      </article>`
    );
  
    return $tweet;
  }

  // Function to render tweets on the page
  function renderTweets(tweets) {
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement);
    }
  }

  const tweetData = {
    // Placeholder tweet data, modify or fetch from server as needed
  };
  
  // Render tweets on the page
  renderTweets([tweetData]);

  // Initialize timeago plugin to show relative timestamps
  $('.timeago').timeago();
});
