var slack = require('slack')('xoxp-89670216483-89737576834-89670820275-f424ea0798674acb6f0b33f96f1760d5');

slack('channels.history', { channel: 'C2MMCN5EH', count: 0, unreads: 1 }, function(err, res) {
  if(err) return console.error(err);
  if(res.ok) {
    console.log(res);
    // res.messages.forEach(function(message) {
    //   console.log(message.text);
    // });
  }
});

// slack('channels.setTopic', { channel: 'C123456789', topic: 'Some topic' }, function(err, res) {
//   if(err) return console.error(err);
//   if(res.ok) {
//     console.log('Topic set');
//   }
// })

slack('groups.list', {}, function(err, res) {
  if(err) return console.error(err);
  console.log(res);
});

slack('channels.history', { channel})
