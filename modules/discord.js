const { MessageBuilder  } = require('discord-webhook-node');

const sendTaskStatus = (hook, title, message, success) => {
    let embed = new MessageBuilder()
        .setTitle(title)
        .setColor(success === true? '#009800' : '#FC2929')

    if(message.trim().length != 0)
        embed = embed.setDescription(message)

    hook.send(embed);
}

const sendMessage = (hook, title, message) => {
    let embed = new MessageBuilder()
        .setTitle(title)
        .setColor('#7289DA')

    if(message.trim().length != 0)
        embed = embed.setDescription(message)

    hook.send(embed);
}

module.exports = {
    sendMessage,
    sendTaskStatus
}