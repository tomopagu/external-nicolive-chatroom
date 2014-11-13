Messages = new Mongo.Collection('messages');

function submitMessage (event) {
    // Check it's either the enter key or clicking submit
    if (event.type === 'keypress')
    {
        if (event.keyCode === 10 || event.keyCode === 13)
        {
            sendMessage(event);
        }
    }
    else
    {
        sendMessage(event);
    }
}

function sendMessage (event) {
    if (Meteor.user())
    {
        username = Meteor.user().username;
    }
    else
    {
        var shortID = Meteor.userId().substr(0,6);
        username = 'Anon-'+shortID;

        Meteor.users.update({_id: Meteor.userId()}, {$set: {username: username}});
    }
    var content = $('#chat-message').val();

    Messages.insert({
        user: username,
        content: content,
        createdAt: new Date() // current time
    });

    // Clear form
    $('#chat-message').val('');

    // Prevent default form submit
    return false;
}

if (Meteor.isClient) {
    Meteor.subscribe("messages");
    Template.chatBox.helpers({
        messages: function() {
            return Messages.find({}, {sort: {createdAt: 1}});
        }
    });
    Template.chatMessage.helpers({
        color: function() {
            var userdata = Meteor.users.findOne({username: this.user});
            return userdata.color;
        }
    });

    Template.chatBox.events({
        "click #chat-message": function (event) {
            Meteor.loginVisitor();
        },
        "click #send": function (event) {
            submitMessage(event);
        },
        "keypress #chat-message": function (event) {
            submitMessage(event);
        }
    });
}

if (Meteor.isServer) {
    Meteor.publish("messages", function () {
        return Messages.find({}, {sort: {createdAt: 1}});
    });
}

Messages.allow({
    'insert': function () {
        return true;
    }
});
Meteor.users.allow({
    'update': function () {
        return true;
    }
});