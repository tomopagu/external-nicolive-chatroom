if (Meteor.isClient) {
  Meteor.subscribe("userStatus");
  Template.userList.helpers({
    users: function() {
      return Meteor.users.find({ "status.online": true });
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
  });
}