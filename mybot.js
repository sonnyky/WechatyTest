const { Wechaty } = require('wechaty')
const bot = Wechaty.instance()
console.log(bot.version())

var inConversation = 0

var string = "foo",
expr = /ox/;
console.log(string.search(expr));

bot // Singleton
.on('scan', (url, code) => 
{
    console.log(`Scan QR Code to login: ${code}\n${url}`)
   
})
.on('login',       user => 
{
    console.log(`User ${user} logined`)
    bot.say('Wechaty login').catch(console.error)
})
.on('message', async message => 
{
    const room = message.room()
    console.log(
      (room ? `${room}` : '')
      + `${message.from()}:${message}`,
    )
    console.log('message coming : ' + `${message}`)
    console.log('isConversation : ' + inConversation)
    if ( !message.self()) {
    try {
        if(inConversation === 0){
            inConversation = 1
            message.say('自动回答')
            const initialResponse =  `展会的资料在这里：http://www.reedexpo.co.jp/en/ \n\n` +
            '需要其他资料吗？\n' + '展会会场请按 1，展会时期请按 2'  
            message.say(initialResponse)
        }else{
            var firstCommand = /1/
            var secondCommand = /2/
            var incomingMessage = `${message}`
            if(firstCommand.test(incomingMessage)){
                console.log('1 is pressed')
                message.say('自动回答')
                message.say('東京')
            }else if(secondCommand.test(incomingMessage)){
                console.log('2 is pressed')
                message.say('自动回答')
                message.say('2018/5/1 ~ 2018/5/4')
            }else{
                console.log('finish conversation')
                message.say('自动回答')
                message.say('对不起，我听不懂 。。哭，等主人回来让她回你吧')
            }
            inConversation = 0;
        }
    }
    catch (e) {
        console.error(e)
      }
    }
})
.start()