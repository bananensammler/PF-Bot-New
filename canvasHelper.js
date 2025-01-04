const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js');

async function generateWelcomeImage(member) {
const canvas = Canvas.createCanvas(1024, 512);
const ctx = canvas.getContext('2d');

  // Hintergrundbild laden
const background = await Canvas.loadImage(
    'https://cdn.discordapp.com/attachments/1308115966403547306/1325235116343033910/Screenshot_2025-01-04_at_2.47.28_PM.png?ex=677b0ce1&is=6779bb61&hm=5fcc70d6dab76decf73bd5a9a57f222fe1327ddcbc1d8bebb4eae1d4aecd1f26&'
);
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Profilbild laden
const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
ctx.beginPath();
  ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
ctx.closePath();
ctx.clip();
ctx.drawImage(avatar, 384, 38, 256, 256);

  // Text hinzufügen
ctx.font = '50px sans-serif';
ctx.fillStyle = '#ffffff';
ctx.fillText(`Welcome, ${member.user.tag}!`, 350, 350);

  // Canvas als Datei speichern
const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome-image.png' });
return attachment;
}

module.exports = { generateWelcomeImage };
