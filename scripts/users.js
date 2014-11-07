if (Meteor.isClient) {
  Meteor.subscribe("userStatus");
  Template.userList.helpers({
    users: function() {
      return Meteor.users.find({ "status.online": true });
    },
    color: function() {
        var colors = ['black','green','red','blue','purple','teal'];
        return colors[Math.floor(Math.random()*colors.length)];
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
  });
}