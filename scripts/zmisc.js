function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}
function intToARGB(i) {
    var h = ((i>>24)&0xFF).toString(16) +
            ((i>>16)&0xFF).toString(16) +
            ((i>>8)&0xFF).toString(16) +
            (i&0xFF).toString(16);
    return h.substring(0, 6);
}

function generateBgColor (seed) {
    var color = '#' + intToARGB(hashCode( seed ));
    var bgcolor = tinycolor( color ).desaturate(5).toString();
    if (tinycolor.isReadable('#000', bgcolor))
    {
        return bgcolor;
    }
    else
    {
        return randomColor();
    }
}

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
}

if (Meteor.isServer) {
  Accounts.removeOldGuests();

  Accounts.onCreateUser(function(options, user) {
    if (user.username === undefined)
    {
      user.username = 'Tomo';
    }

    if (user.username.length === 36)
    {
      var shortID = user._id.substr(0,6);
      user.username = 'Anon-'+shortID;
    }

    user.color = generateBgColor( user.username );
    return user;
  });

  Meteor.startup(function () {
    // VideoId.insert({videoid: ""});
    // Songlist.insert({name: "", producer: "", rankchange: 0, rankdirection: "", rankid: 0, smcode: ""});
  });

  Houston.add_collection(Messages);
  Houston.add_collection(VideoId);
  Houston.add_collection(Songlist);
  Houston.add_collection(Meteor.users);
}

Router.route('/', function () {
  this.render('index');
});