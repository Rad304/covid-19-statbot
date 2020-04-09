module.exports = {
    name: ':hi',
    description: 'Hello!',
    execute(msg, args) {
      msg.reply('Hello from the other side!');
    },
  };
  