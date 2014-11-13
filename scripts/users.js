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
function addSaturation(color, amount) {
    var color = color.replace('#', '').split('');
    var letters = '0123456789ABCDEF'.split('');
    for(var i = 0; i < color.length; i++){
        var newSaturation = 0;
        if(letters.indexOf(color[i]) + amount > 15) newSaturation = 15;
        else if(letters.indexOf(color[i]) + amount < 0) newSaturation = 0;
        else newSaturation = letters.indexOf(color[i]) + amount;
        color[i] = letters[newSaturation];
    }
    return "#" + color.join('');
}

if (Meteor.isClient) {
  Meteor.subscribe("userStatus");
  Template.userList.helpers({
    users: function() {
      return Meteor.users.find({ "status.online": true });
    },
    color: function() {
        var color = '#' + intToARGB(hashCode( this.username ));
        return addSaturation(color, 10);
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
  });
}