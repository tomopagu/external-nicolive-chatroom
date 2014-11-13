function generateBgColor (seed) {
    var color = '#' + intToARGB(hashCode( seed ));
    var bgcolor = tinycolor( color ).desaturate(25).toString();
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
  Meteor.subscribe("userStatus");
  Template.userList.helpers({
    users: function() {
      return Meteor.users.find({ "status.online": true });
    },
    color: function() {
        if (typeof this.color === 'undefined')
        {
            var usercolor = generateBgColor( this.username );
            Meteor.users.update({_id: Meteor.userId()}, {$set: {color: usercolor}});
            return usercolor;
        }
        else
        {
            return this.color;
        }
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
  });
}

Meteor.users.allow({
    'update': function () {
        return true;
    }
});