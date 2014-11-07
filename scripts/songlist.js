Songlist = new Mongo.Collection('songlist');

Songlist.after.insert(function (userId, doc) {
  Messages.insert({
    user: null,
    content: '<a href="http://www.nicovideo.jp/watch/'+doc.smcode+'" title="'+doc.name+' - '+doc.producer+'" target="_blank"><div class="rankid ui small red horizontal label">'+doc.rankid+'</div><span class="songname">'+doc.name+'</span></a>',
    createdAt: new Date() // current time
  });
});

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
