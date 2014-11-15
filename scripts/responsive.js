// JQuery Stuff
if (Meteor.isClient) {
  window.setTimeout(function(){

    var screenHeight = window.innerHeight;

    var messagesAreaHeight = screenHeight - 60;
    $('.messages').height(messagesAreaHeight);
    $('.message-list').height(messagesAreaHeight);

    $('.messages').scrollTop( 9999 );

    var songsPosition = $('.songs').position();
    var songlistHeight = screenHeight - songsPosition.top;

    $('.songs').height(songlistHeight);

  }, 1000);
}