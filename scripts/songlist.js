Songlist = new Mongo.Collection('songlist');

if (Meteor.isClient) {
  Meteor.subscribe("songlist");
  Template.songList.helpers({
    songs: function() {
      return Songlist.find({}, {sort: {rankid: 1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("songlist", function () {
    return Songlist.find({}, {sort: {rankid: 1}});
  });
}
