const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
 const client = new Client();
 var codigo ;



// CONECTA WHATS - SERVIDOR
module.exports.conectApi = async (req, res) => {
    console.log('ddd');
    client.initialize();
    res.jsonp({mensaje: 'Autenticación exitosa' + this.codigo});
    console.log('ddd');
    // client.connect()
    // .then (([user, chats, contacts, unread]) => {
    //     res.jsonp({mensaje: 'Autenticación exitosa'});
    // })
    // .catch (err => console.log(err) )
};

// ENVIAR MENSAJES

module.exports.sendMessage = async (req, res) => {
    // options = {
    //     quoted: null,
    //     timestamp: new Date()
    // }
    // client.sendTextMessage(`${req.body.phone}@s.whatsapp.net`, req.body.body, options)
    // .then( res.jsonp({mensaje:'Notificación enviada'}))
     client.sendMessage(req.body.phone ,  req.body.body );
    res.jsonp({mensaje:'Notificación enviada' + req.body.phone   +' mensaje ' +   req.body.body });
}

client.on('qr', qr => {
    this.codigo = qr; 
    console.log (qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
   
    console.log('Client is ready!');
   
});


// client.on('message', async msg => {
//     console.log('MESSAGE RECEIVED', msg);

//     if (msg.body == '!ping reply') {
//         // Send a new message as a reply to the current one
//         msg.reply('pong');

//     } else if (msg.body == '!ping') {
//         // Send a new message to the same chat
//         client.sendMessage(msg.from, 'pong');

//     } else if (msg.body.startsWith('send')) {
//         // Direct send a new message to specific id
//         let number = msg.body.split(' ')[1];
//         let messageIndex = msg.body.indexOf(number) + number.length;
//         let message = msg.body.slice(messageIndex, msg.body.length);
//         number = number.includes('@c.us') ? number : `${number}@c.us`;
//         let chat = await msg.getChat();
//         chat.sendSeen();
//         client.sendMessage(number, message);

//     } else if (msg.body.startsWith('!subject ')) {
//         // Change the group subject
//         let chat = await msg.getChat();
//         if (chat.isGroup) {
//             let newSubject = msg.body.slice(9);
//             chat.setSubject(newSubject);
//         } else {
//             msg.reply('This command can only be used in a group!');
//         }
//     } else if (msg.body.startsWith('!echo ')) {
//         // Replies with the same message
//         msg.reply(msg.body.slice(6));
//     } else if (msg.body.startsWith('!desc ')) {
//         // Change the group description
//         let chat = await msg.getChat();
//         if (chat.isGroup) {
//             let newDescription = msg.body.slice(6);
//             chat.setDescription(newDescription);
//         } else {
//             msg.reply('This command can only be used in a group!');
//         }
//     } else if (msg.body == '!leave') {
//         // Leave the group
//         let chat = await msg.getChat();
//         if (chat.isGroup) {
//             chat.leave();
//         } else {
//             msg.reply('This command can only be used in a group!');
//         }
//     } else if (msg.body.startsWith('!join ')) {
//         const inviteCode = msg.body.split(' ')[1];
//         try {
//             await client.acceptInvite(inviteCode);
//             msg.reply('Joined the group!');
//         } catch (e) {
//             msg.reply('That invite code seems to be invalid.');
//         }
//     } else if (msg.body == '!groupinfo') {
//         let chat = await msg.getChat();
//         if (chat.isGroup) {
//             msg.reply(`
//                 *Group Details*
//                 Name: ${chat.name}
//                 Description: ${chat.description}
//                 Created At: ${chat.createdAt.toString()}
//                 Created By: ${chat.owner.user}
//                 Participant count: ${chat.participants.length}
//             `);
//         } else {
//             msg.reply('This command can only be used in a group!');
//         }
//     } else if (msg.body == '!chats') {
//         const chats = await client.getChats();
//         client.sendMessage(msg.from, `The bot has ${chats.length} chats open.`);
//     } else if (msg.body == '!info') {
//         let info = client.info;
//         client.sendMessage(msg.from, `
//             *Connection info*
//             User name: ${info.pushname}
//             My number: ${info.me.user}
//             Platform: ${info.platform}
//             WhatsApp version: ${info.phone.wa_version}
//         `);
//     } else if (msg.body == '!mediainfo' && msg.hasMedia) {
//         const attachmentData = await msg.downloadMedia();
//         msg.reply(`
//             *Media info*
//             MimeType: ${attachmentData.mimetype}
//             Filename: ${attachmentData.filename}
//             Data (length): ${attachmentData.data.length}
//         `);
//     } else if (msg.body == '!quoteinfo' && msg.hasQuotedMsg) {
//         const quotedMsg = await msg.getQuotedMessage();

//         quotedMsg.reply(`
//             ID: ${quotedMsg.id._serialized}
//             Type: ${quotedMsg.type}
//             Author: ${quotedMsg.author || quotedMsg.from}
//             Timestamp: ${quotedMsg.timestamp}
//             Has Media? ${quotedMsg.hasMedia}
//         `);
//     } else if (msg.body == '!resendmedia' && msg.hasQuotedMsg) {
//         const quotedMsg = await msg.getQuotedMessage();
//         if (quotedMsg.hasMedia) {
//             const attachmentData = await quotedMsg.downloadMedia();
//             client.sendMessage(msg.from, attachmentData, { caption: 'Here\'s your requested media.' });
//         }
//     } else if (msg.body == '!location') {
//         msg.reply(new Location(37.422, -122.084, 'Googleplex\nGoogle Headquarters'));
//     } else if (msg.location) {
//         msg.reply(msg.location);
//     } else if (msg.body.startsWith('!status ')) {
//         const newStatus = msg.body.split(' ')[1];
//         await client.setStatus(newStatus);
//         msg.reply(`Status was updated to *${newStatus}*`);
//     } else if (msg.body == '!mention') {
//         const contact = await msg.getContact();
//         const chat = await msg.getChat();
//         chat.sendMessage(`Hi @${contact.number}!`, {
//             mentions: [contact]
//         });
//     } else if (msg.body == '!delete' && msg.hasQuotedMsg) {
//         const quotedMsg = await msg.getQuotedMessage();
//         if (quotedMsg.fromMe) {
//             quotedMsg.delete(true);
//         } else {
//             msg.reply('I can only delete my own messages');
//         }
//     } else if (msg.body === '!archive') {
//         const chat = await msg.getChat();
//         chat.archive();
//     } else if (msg.body === '!mute') {
//         const chat = await msg.getChat();
//         // mute the chat for 20 seconds
//         const unmuteDate = new Date();
//         unmuteDate.setSeconds(unmuteDate.getSeconds() + 20);
//         await chat.mute(unmuteDate);
//     } else if (msg.body === '!typing') {
//         const chat = await msg.getChat();
//         // simulates typing in the chat
//         chat.sendStateTyping();        
//     } else if (msg.body === '!recording') {
//         const chat = await msg.getChat();
//         // simulates recording audio in the chat
//         chat.sendStateRecording();        
//     } else if (msg.body === '!clearstate') {
//         const chat = await msg.getChat();
//         // stops typing or recording in the chat
//         chat.clearState();        
//     }
// });




 client.on('message', message => {
    console.log(message.body);
    console.log (message.from) ;
    // if (message.body == 'Ping') {
    //     // Send a new message as a reply to the current one
    //     message.reply('pong');
    // }

    // if(message.body === 'Hola') {
    //     // client.sendMessage(message.from, 'HOla como estas');
    //     client.sendMessage('5492616651372@c.us', 'BUenos dias kkkk ');
    // }
    
    // if (message.body === 'Hola1') {
    //     // Direct send a new message to specific id
    //     console.log (message.from) ;

        
    //     // console.log ( message.body.split(' '));
    //     // let number = message.body.split(' ')[1];
    //     // let messageIndex = message.body.indexOf(number) + number.length;
    //     // let messages = message.body.slice(messageIndex, message.body.length);
    //     // console.log ( 'numero ' + number) ;
    //     // number = number.includes('@c.us') ? number : `${number}@c.us`;
    //     // let chat = await msg.getChat();
    //     //  chat.sendSeen();
    //     // client.sendMessage(number, message);
    // }

});

// client.initialize();