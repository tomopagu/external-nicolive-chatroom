Songlist = new Mongo.Collection('songlist');

Songlist.after.insert(function (userId, doc) {
  var rankid = '<span class="rankid">'+doc.rankid+'</span>';
  var name = '<span class="songname">'+doc.name+'</span>';
  var producer = '<span class="producer">'+doc.producer+'</span>';
  var nicolink = '<a href="http://www.nicovideo.jp/watch/'+doc.smcode+'" title="'+doc.name+'" target="_blank">'+doc.smcode+'</a>';

  Messages.insert({
    user: null,
    content: rankid+': '+name+'  '+producer+' // '+nicolink,
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
