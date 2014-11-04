VideoId = new Mongo.Collection('videoid');

if (Meteor.isClient) {
  Meteor.subscribe("videoid");
  Template.videoArea.helpers({
    videoids: function() {
      return VideoId.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("videoid", function () {
    return VideoId.find({});
  });
}