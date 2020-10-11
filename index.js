const Discord = require('discord.js');
const Client = new Discord.Client();
const random = require('random');
const fs = require('fs');
const jsonfile = require('jsonfile');

const token = ''; //Cannopt display token publicly 

var stats = {};

if(fs.existsSync('stats.json')){
    stats = jsonfile.readFileSync('stats.json');
}

const PREFIX = '!';

Client.on('ready',() =>{
    console.log('This bot is working')
});

Client.on('message',msg=>{

    if(msg.author.id == Client.user.id){
        return;
    }

    if(msg.guild.id in stats ===false){

        stats[msg.guild.id]={};

    }
    
    const guildStats = stats[msg.guild.id];

    if(msg.author.id in guildStats ===false){
        guildStats[msg.author.id]={
            xp: 0,
            level: 0,
            points: 0,
            last_message:0
        };
    }

    const userStats = guildStats[msg.author.id];

    if(Date.now()-userStats.last_message>60000 || msg.content=='!shoot' || msg.content=='!ppg' || msg.content=='!ast' || msg.content=='!reb' || msg.content=='!to' 
    || msg.content=='!stl' || msg.content=='!blk' || msg.content=='!fg' || msg.content=='!ft' || msg.content=='!highlights' || msg.content=='!dunk' || msg.content=='!stepback'
    || msg.content=='!hype' || msg.content=='!mb' || msg.content=='!mjk'){
        
        userStats.xp += random.int(15,25);
        userStats.last_message = Date.now();

        const xpToNextLevel = 5* Math.pow(userStats.level,2)+50*userStats.level + 100;

        if(userStats.xp >= xpToNextLevel){
            userStats.level++;
            userStats.xp = userStats.xp - xpToNextLevel;
            msg.channel.send(msg.author.username + '  has reached level ' + userStats.level);
        }

        jsonfile.writeFileSync('stats.json',stats);


        //console.log(msg.author.username + 'has' + userStats.xp);
        //console.log(xpToNextLevel + ' XP needed for next level');

}
    switch(msg.content){

        case '!profile':
            const xpToNextLevel = 5* Math.pow(userStats.level,2)+50*userStats.level + 100;
            const x = new Discord.MessageEmbed().setTitle('Profile')
            .addField('Level ', userStats.level)
            .addField('Current XP ', userStats.xp)
            .addField('XP Needed To Level Up ',xpToNextLevel)
            .addField('Total Points ',userStats.points)
            .setColor('#008348')
            msg.channel.send(x);
            break;

        case '!shoot':
            
            var result = Math.floor(Math.random()*10);
    
                if(result%2==0){
    
                    userStats.points = userStats.points + 3;
                   const pts = new Discord.MessageEmbed().setTitle('BUCKET ' + "🔥")
                    .addField ('Total Points', userStats.points)
                    .setColor('#008348')
                    msg.channel.send(pts);
                
                }
    
                else{
    
                    userStats.points = userStats.points - 2;
                    
                    if(userStats.points<0){
                        userStats.points = 0
                    }
                    const pts = new Discord.MessageEmbed().setTitle('BRICK ' + "❌")
                    .addField ('Total Points', userStats.points)
                    .setColor('#008348')
                    msg.channel.send(pts);
                }
                break;
    
            

        case '!ppg':
            const p = new Discord.MessageEmbed().setTitle('Points')
            .addField ('Points Per Game', '23.6')
            .setColor('#008348')
            msg.channel.send(p);
            break;

        case '!reb':
            const r = new Discord.MessageEmbed().setTitle('Rebounds')
            .addField ('Rebounds Per Game', '7.1')
            .setColor('#008348')
            msg.channel.send(r);
            break;

        case '!ast':
            const a = new Discord.MessageEmbed().setTitle('Assists')
            .addField ('Assists Per Game', '2.9')
            .setColor('#008348')
            msg.channel.send(a);
             break;

        case '!stl':
            const s = new Discord.MessageEmbed().setTitle('Steals')
            .addField ('Steals Per Game', '1.4')
            .setColor('#008348')
            msg.channel.send(s);
            break;

        case '!blk':
            const b = new Discord.MessageEmbed().setTitle('Blocks')
            .addField ('Blocks Per Game', '0.9')
            .setColor('#008348')
            msg.channel.send(b);
            break;

        case '!fg':
            const f = new Discord.MessageEmbed().setTitle ('Field Goal %')
            .addField ('Field Goal %','.448')
            .setColor('#008348')
            msg.channel.send(f);
            break;

        case '!ft':
            const ft = new Discord.MessageEmbed().setTitle('Free Throw %')
            .addField ('Free Throw %', '.806')
            .setColor('#008348')
            msg.channel.send(ft);
            break;


        case '!to':
            const t = new Discord.MessageEmbed().setTitle('Turnovers')
            .addField ('Turnovers Per Game', '2.2')
            .setColor('#008348')
            msg.channel.send(t);
            break;

        case '!highlights':
            const h = new Discord.MessageEmbed().setTitle('Highlights')
            .addField ('Highlights (2019-2020 Season)', 'https://www.youtube.com/watch?v=tgtEGl1xxZ0&t=714s')
            .setColor('#008348')
            msg.channel.send(h);
            break;

        case '!dunk':
            msg.channel.send("TATUM DUNKS ON LEBRON", {files: ["./images/tatumgif.gif"]});
            break;

        case '!stepback':
            msg.channel.send("TATUM'S NASTY STEPBACK", {files: ["./images/tatumstepback.gif"]});
            break;

        case '!hype':
            msg.channel.send("HYPED TATUM", {files: ["./images/tatumrage.gif"]});
            break;
        
        case '!help':
            const embed = new Discord.MessageEmbed().setTitle('Bot Commands')
            .addField ('Profile', '!profile')
            .addField ('Shooting Game', '!shoot')
            .addField ('Points', '!ppg')
            .addField ('Rebounds', '!reb')
            .addField ('Assists', '!ast')
            .addField ('Steals', '!stl')
            .addField ('Blocks', '!blk')
            .addField ('Field Goal %', '!fg')
            .addField ('Free Throw %', '!ft')
            .addField ('Turnovers', '!to')
            .addField ('Highlights', '!highlights')
            .addField ('Tatum Dunking', '!dunk')
            .addField ('Tatum Stepback', '!stepback')
            .addField ('Tatum Hype Face', '!hype'
            .setColor('#008348')
            msg.channel.send(embed);
            break;

        
    }

    
    
})

Client.login(token);
