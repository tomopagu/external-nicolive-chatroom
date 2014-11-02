Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
  Template.chatBox.helpers({
    messages: function() {
      return Messages.find();
      // return Messages.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.chatBox.events({
    "click #send": function (event) {
      // This function is called when the new task form is submitted

      var username = Meteor.user().username;
      var content = jQuery('#chat-message').val();

      Messages.insert({
        user: username,
        content: content,
        createdAt: new Date() // current time
      });

      // Clear form
      jQuery('#chat-message').val('');

      // Prevent default form submit
      return false;
    }
  });

  Meteor.loginVisitor()
}

Messages.allow({
  'insert': function () {
    return true;
  }
});

Accounts.removeOldGuests();

Houston.add_collection(Messages);
Houston.add_collection(Meteor.users);