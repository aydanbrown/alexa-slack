var slack = require('slack');
var similar = require('string-similarity');
const alexa = require('alexa');

// var req = slack('channels.list');
// console.log('Request: ' + req.on);
// slack('users.list', null, function(err, res) {
//   if(err) return console.error(err);
//   res.members.forEach(function(member) {
//     console.log(`${member.name} - ${member.real_name}`);
//   })
//   // console.log(res);
// });

alexa.intent.End(null, null, function(attributes, speechlet) {
  console.log(attributes);
  console.log(speechlet);
});
