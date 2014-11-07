// JQuery Stuff
if (Meteor.isClient) {
  window.setTimeout(function(){

    var screenHeight = window.innerHeight;

    var messagesAreaHeight = screenHeight - 60;
    $('.messages').height(messagesAreaHeight);

    var songsPosition = $('.songs').position();
    var songlistHeight = screenHeight - songsPosition.top;

    $('.songs').height(songlistHeight);

  }, 1000);
}