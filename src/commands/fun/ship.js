const { ApplicationCommandOptionType, AttachmentBuilder } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  name: "ship",
  description: "Ships two users and calculates their love compatibility 💘",
  usage: "<user1> <user2>",
  options: [
    {
      name: "user1",
      description: "The first user to ship",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "user2",
      description: "The second user to ship",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    await interaction.deferReply();
    const user1 = interaction.options.getUser("user1");
    const user2 = interaction.options.getUser("user2");

    if (user1.id === user2.id) return interaction.editReply("You can't ship yourself!");

    const avatar1 = user1.displayAvatarURL({ extension: "png", size: 256 });
    const avatar2 = user2.displayAvatarURL({ extension: "png", size: 256 });

    const compatibility = getCompatibility(user1.id, user2.id);
    const filled = Math.round(compatibility / 10);
    const hearts = "❤".repeat(filled) + "♡".repeat(10 - filled);
    const shipName = generateShipName(user1.username, user2.username);

    const WIDTH = 700, HEIGHT = 330;
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const bg = await loadImage(path.join(__dirname, "../../../images/ship-background.png"));
    ctx.drawImage(bg, 0, 0, WIDTH, HEIGHT);

    const R = 60;
    const Y_AV = 30;
    const X1 = 150, X2 = WIDTH - 150;

    const img1 = await loadImage(avatar1);
    const img2 = await loadImage(avatar2);
    drawCircle(ctx, img1, X1 - R, Y_AV, R);
    drawCircle(ctx, img2, X2 - R, Y_AV, R);

    ctx.fillStyle = "#222";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(user1.username, X1, Y_AV + R * 2 + 25);
    ctx.fillText(user2.username, X2, Y_AV + R * 2 + 25);

    ctx.font = "32px sans-serif";
    ctx.fillStyle = "#ff4d6d";
    ctx.fillText(hearts, WIDTH / 2, Y_AV + R * 2 + 70);

    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#5533aa";
    ctx.fillText(`${compatibility}% compatible`, WIDTH / 2, Y_AV + R * 2 + 110);

    ctx.font = "italic 24px sans-serif";
    ctx.fillStyle = "#333";
    ctx.fillText(shipName, WIDTH / 2, HEIGHT - 30);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: "ship.png" });
    return interaction.editReply({ files: [attachment] });
  }
};

function getCompatibility(id1, id2) {
  const [a, b] = [id1, id2].sort();
  const hash = crypto.createHash("md5").update(`${a}:${b}`).digest("hex");
  return parseInt(hash.slice(0, 8), 16) % 101;
}

function drawCircle(ctx, img, x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, x, y, r * 2, r * 2);
  ctx.restore();
}

function generateShipName(a, b) {
  const halfA = a.slice(0, Math.ceil(a.length / 2));
  const halfB = b.slice(Math.floor(b.length / 2));
  return `${halfA}${halfB}`;
}
