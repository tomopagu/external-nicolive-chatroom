if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

if (Meteor.isServer) {
  Accounts.removeOldGuests();

  Meteor.startup(function () {
    // VideoId.insert({videoid: ""});
    // Songlist.insert({name: "", producer: "", rankchange: 0, rankdirection: "", rankid: 0, smcode: ""});
  });

  Houston.add_collection(Messages);
  Houston.add_collection(VideoId);
  Houston.add_collection(Songlist);
  Houston.add_collection(Meteor.users);
}
