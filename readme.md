[![Stories in Ready](https://badge.waffle.io/tomo-san/external-nicolive-chatroom.png?label=ready&title=Ready)](https://waffle.io/tomo-san/external-nicolive-chatroom)
# External Nicolive Chatroom

A meteor webapp that houses a chatroom & embed of a Nicolive stream.

### Still in progress

Mostly going to be used by the English community when no English chatroom exists on Niconico itself.

Could have some other uses though!

## Install
1. Clone repo
2. Run `meteor reset && meteor` in the root.
3. Go to `http://localhost:3000/admin` in browser to set up your useraccount.

## Misc
- You might need to log out, type a message as an 'anon' to get the username column to show up. Once that appears you can edit yours in the admin area
- You might need to uncomment lines 11 & 12 in `zmisc.js` and then wait for the server to restart. This will build the songlist & videoid columns. You can remove the songlist message but leave the empty songlist data until you have made a new row.

## Future Aims
- Reading the nicolive comments, translating them and adding them to our chat.
- Voting for a stream to be played, for when a stream is over and an admin isn't on to switch it.