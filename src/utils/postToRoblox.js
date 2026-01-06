const { fetch, FormData } = require("undici");
const { Blob } = require("buffer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const GROUP_ID = 4346739;
const URL = `https://apis.roblox.com/community-links/v1/shout/${GROUP_ID}/create`;

const ROBLOXSECURITY = process.env.ROBLOXSECURITY;

function mimeFromFilename(filename) {
  const ext = filename.toLowerCase().split(".").pop();
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "gif") return "image/gif";
  if (ext === "webp") return "image/webp";
  return "application/octet-stream";
}

const IMAGE_MAP = {
  shift: path.join(process.cwd(), "images", "ssc_shift_banner.png"),
  training: path.join(process.cwd(), "images", "ssc_training_banner.png"),
  general: path.join(process.cwd(), "images", "ssc_welcome_banner.png"),
  default: path.join(process.cwd(), "images", "ssc_welcome_banner.png"),
};

async function postToRoblox(type, title, content) {
  const form = new FormData();
  form.set("title", title);
  form.set("content", content);

  const imagePath = IMAGE_MAP[type] ?? IMAGE_MAP.default;
  const buf = fs.readFileSync(imagePath);
  const filename = path.basename(imagePath);

  form.set(
    "image",
    new Blob([buf], { type: mimeFromFilename(filename) }),
    filename
  );

  const headers = {
    accept: "application/json, text/plain, */*",
    origin: "https://www.roblox.com",
    referer: "https://www.roblox.com/",
    cookie: `.ROBLOSECURITY=${ROBLOXSECURITY}`,
  };

  let res = await fetch(URL, { method: "POST", headers, body: form });

  if (res.status === 403) {
    const csrf = res.headers.get("x-csrf-token");
    if (csrf) {
      res = await fetch(URL, {
        method: "POST",
        headers: { ...headers, "x-csrf-token": csrf },
        body: form,
      });
    }
  }

  if (!res.ok) {
  const body = await res.text();

  const err = new Error(body);   
  err.status = res.status;       
  err.body = body;               
  throw err;
}

  return res.json();
}

module.exports = postToRoblox;
