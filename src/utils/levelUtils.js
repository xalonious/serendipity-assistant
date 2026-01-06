const Canvas = require('canvas');
const path = require('path');

function roundRect(ctx, x, y, width, height, radius) {
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
}

const generateRankCard = async ({ avatar, username, level, xp, xpNeeded, rank }) => {
  const canvas = Canvas.createCanvas(900, 300);
  const ctx = canvas.getContext('2d');

  const bg = await Canvas.loadImage(path.join(__dirname, '../../images', 'card-background.png'));
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  const avatarImg = await Canvas.loadImage(avatar);
  ctx.save();
  ctx.beginPath();
  ctx.arc(120, 150, 80, 0, Math.PI * 2);
  ctx.closePath();
  ctx.shadowColor = '#000';
  ctx.shadowBlur = 10;
  ctx.clip();
  ctx.drawImage(avatarImg, 40, 70, 160, 160);
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px Sans';
  ctx.shadowColor = '#000';
  ctx.shadowBlur = 4;
  ctx.fillText(username, 230, 100);

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.font = '24px Sans';
  ctx.textAlign = 'right';
  ctx.fillText(`Rank #${rank}`, canvas.width - 30, 40);
  ctx.textAlign = 'left';

  const levelText = `Level ${level}`;
  ctx.font = '24px Sans';
  const textWidth = ctx.measureText(levelText).width;
  const padding = 20;
  ctx.fillStyle = '#5865F2';
  roundRect(ctx, 230, 120, textWidth + padding * 2, 40, 20);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillText(levelText, 230 + padding, 150);

  const barX = 230;
  const barY = 190;
  const barWidth = 600;
  const barHeight = 25;
  const radius = 15;
  const progress = xp / xpNeeded;

  ctx.fillStyle = '#3e3f42';
  roundRect(ctx, barX, barY, barWidth, barHeight, radius);
  ctx.fill();

  ctx.fillStyle = '#00b0f4';
  roundRect(ctx, barX, barY, barWidth * progress, barHeight, radius);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = '20px Sans';
  ctx.fillText(`${xp} / ${xpNeeded} XP`, barX, barY + 45);

  return canvas.toBuffer('image/png');
};

const getXpNeeded = (level) => {
  return 5 * (level ** 2) + 50 * level + 100;
};

module.exports = {
  generateRankCard,
  getXpNeeded,
};
