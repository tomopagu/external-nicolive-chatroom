if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

if (Meteor.isServer) {
  Accounts.removeOldGuests();

  Houston.add_collection(Messages);
  Houston.add_collection(Meteor.users);
}
