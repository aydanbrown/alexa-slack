var slack = require('slack')('xoxp-89670216483-89737576834-89670820275-f424ea0798674acb6f0b33f96f1760d5');
var similar = require('string-similarity');

// slack('channels.history', { channel: 'C2MMCN5EH', count: 0, unreads: 1 }, function(err, res) {
//   if(err) return console.error(err);
//   if(res.ok) {
//     console.log(res);
//     // res.messages.forEach(function(message) {
//     //   console.log(message.text);
//     // });
//   }
// });

// slack('channels.setTopic', { channel: 'C123456789', topic: 'Some topic' }, function(err, res) {
//   if(err) return console.error(err);
//   if(res.ok) {
//     console.log('Topic set');
//   }
// })

// slack('channels.list', {}, function(err, res) {
//   if(err) return console.log(err);
//   if(res.ok) {
//     var tests = {};
//     var comparison = [];
//     res.channels.forEach(function(channel) {
//       tests[channel.name] = channel.id;
//       comparison.push(channel.name);
//     });
//     console.log(comparison);
//     var matches = similar.findBestMatch('randomness', comparison);
//     console.log(matches);
//     console.log('Matching Channel: ' + tests[matches.bestMatch.target] + ', ' + matches.bestMatch.rating);
//   }
// });

slack('channels.history', { channel: 'C2MMCN5EH', count: 1 }, function(err, result) {
  if(err) return console.error(err);
  console.log(result);
})
