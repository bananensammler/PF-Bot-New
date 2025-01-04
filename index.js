const { Client, GatewayIntentBits } = require('discord.js');
const { generateWelcomeImage } = require('./canvasHelper');
require('dotenv').config();
const config = require('./config.json');
const fs = require('fs');

// Discord Client erstellen
const client = new Client({
intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
],
});

// Event: Bot ist bereit
client.once('ready', () => {
console.log(`Bot ist online als ${client.user.tag}`);
});

// Event: Neuer Member tritt dem Server bei
client.on('guildMemberAdd', async (member) => {
try {
    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (!channel) return console.log("Willkommenskanal nicht gefunden!");

    // Willkommen-Bild generieren
    const welcomeImage = await generateWelcomeImage(member);

    // Bild senden
    await channel.send({
    content: `Welcome to PF Lufthansa Virtual, ${member}!`,
    files: [welcomeImage],
    });

    console.log(`Willkommensnachricht für ${member.user.tag} gesendet!`);
} catch (error) {
    console.error("Fehler beim Senden der Willkommensnachricht:", error);
}
});

// Event: Bot speichert, was im Chat gesagt wird
client.on('messageCreate', (message) => {
if (message.author.bot) return;

  // Nachricht in einer Datei speichern
const logMessage = `${new Date().toISOString()} - ${message.author.tag}: ${message.content}\n`;
fs.appendFileSync('messages.log', logMessage, (err) => {
    if (err) console.error("Fehler beim Speichern der Nachricht:", err);
});
});

client.login(process.env.DISCORD_TOKEN);
