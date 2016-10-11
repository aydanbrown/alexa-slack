const slack = require('slack')({
  user: 'Node.js',
  channel: 'C2MMCN5EH'
});

var path = ''

slack.listChannels(function(err, result) {
  if(err) return console.error(err);
  console.log('CHANNELS');
  result.channels.forEach(function(channel) {
    console.log(channel.name, channel.id);
  })
  console.log('\n');
})

slack.listUsers(function(err, result) {
  if(err) return console.error(err);
  console.log('USERS');
  result.members.forEach(function(member) {
    console.log(member.name, member.id);
  });
  console.log('\n');
})
