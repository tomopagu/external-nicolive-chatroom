Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  Template.chatBox.helpers({
    messages: function() {
      return Messages.find({});
    }
  });

  Template.body.events({
    "click #send": function (event) {
      // This function is called when the new task form is submitted

      var user = jQuery('#user').val();
      var content = jQuery('#chat-message').val();

      Messages.insert({
        user: user,
        content: content,
        createdAt: new Date() // current time
      });

      // Clear form
      jQuery('#chat-message').val('');

      // Prevent default form submit
      return false;
    }
  });
}

Messages.allow({
  'insert': function () {
    return true;
  }
});

Houston.add_collection(Messages);