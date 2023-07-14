$(document).ready(function() {
    $('.new-tweet textarea').on('input', function() {
      var maxLength = 140;
      var currentLength = $(this).val().length;
      var remainingLength = maxLength - currentLength;
  
      var counterElement = $(this).closest('.new-tweet').find('.counter');
  
      counterElement.text(remainingLength);

      if (remainingLength < 0) {
        counterElement.addClass('negative');
      } else {
        counterElement.removeClass('negative');
      }
    });
  });

