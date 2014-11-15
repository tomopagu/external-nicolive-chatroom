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
    var userdata = Meteor.users.findOne({_id: Meteor.userId()});
    var content = $('#chat-message').val();
    var oldscrollHeight = $('.messages').prop('scrollHeight');

    Messages.insert({
        user: userdata.username,
        color: userdata.color,
        content: content,
        createdAt: new Date() // current time
    });

    // Clear form
    $('#chat-message').val('');

    // Auto-scroll
    var newscrollHeight = $('.messages').prop('scrollHeight');
    if(newscrollHeight > oldscrollHeight)
    {
        $('.messages').animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
    }

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