var slack = require('slack');
var similar = require('string-similarity');


// var req = slack('channels.list');
// console.log('Request: ' + req.on);
slack('channels.list', null, function(err, res) {
  if(err) return console.error(err);
  console.log(res);
});
