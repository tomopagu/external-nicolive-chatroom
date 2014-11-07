Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
  Meteor.subscribe("messages");
  Template.chatBox.helpers({
    messages: function() {
      return Messages.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.chatBox.events({
    "click #chat-message": function (event) {
      Meteor.loginVisitor();
    },
    "click #send": function (event) {
      // This function is called when the new task form is submitted
      var username;
      if (Meteor.user())
      {
        username = Meteor.user().username;
      }
      else
      {
        var shortID = Meteor.userId().substr(0,6);
        username = 'Anon-'+shortID;

        Meteor.users.update({_id: Meteor.userId()}, {$set: {username: username}});
      }
      var content = $('#chat-message').val();

      Messages.insert({
        user: username,
        content: content,
        createdAt: new Date() // current time
      });

      // Clear form
      $('#chat-message').val('');

      // Prevent default form submit
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {createdAt: -1}});
  });
}

Messages.allow({
  'insert': function () {
    return true;
  }
});
Meteor.users.allow({
  'update': function () {
    return true;
  }
});