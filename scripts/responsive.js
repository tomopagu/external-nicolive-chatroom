// JQuery Stuff
if (Meteor.isClient) {
  window.setTimeout(function(){

    var screenHeight = window.innerHeight;

    var messagesAreaHeight = screenHeight - 60;
    $('.messages').attr('style', 'height: '+messagesAreaHeight+'px;');
    $('.message-list').attr('style', 'height: '+messagesAreaHeight+'px;');


    var scrollHeight = $('.messages').prop('scrollHeight');
    $('.messages').scrollTop( scrollHeight );

    var songsPosition = $('.songs').position();
    var songlistHeight = screenHeight - songsPosition.top;

    $('.songs').height(songlistHeight);

  }, 1000);
}