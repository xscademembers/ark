const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../../_source/pages");
const slides = [];

for (let i = 1; i <= 7; i++) {
  const v = fs.readFileSync(path.join(dir, `slide${i}.html`), "utf8");
  const d = fs.readFileSync(path.join(dir, `slide${i}-detail.html`), "utf8");
  const sub = (v.match(/slide-subtitle[^>]*>([\s\S]*?)<\/p>/) || [])[1]?.trim() || "";
  const title = (v.match(/slide-title[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.trim() || "";
  const dsub = (d.match(/detail-subtitle[^>]*>([\s\S]*?)<\/p>/) || [])[1]?.trim() || "";
  const dtitle = (d.match(/detail-title[^>]*>([\s\S]*?)<\/h2>/) || [])[1]?.trim() || "";
  const desc = (d.match(/detail-description[^>]*>([\s\S]*?)<\/p>/) || [])[1]?.trim() || "";
  const video = (v.match(/src="([^"]+\.mp4)"/) || [])[1]?.replace("../", "/") || "";
  const img = (d.match(/src="([^"]+\.(?:png|jpg))"/) || [])[1]?.replace("../", "/") || "";
  slides.push({
    id: i,
    subtitle: sub,
    title,
    detailSubtitle: dsub,
    detailTitle: dtitle,
    description: desc,
    video,
    image: img,
  });
}

const outDir = path.join(__dirname, "../src/lib");
fs.mkdirSync(outDir, { recursive: true });

const ts = `export type SlideData = {
  id: number;
  subtitle: string;
  title: string;
  detailSubtitle: string;
  detailTitle: string;
  description: string;
  video: string;
  image: string;
};

export const slidesData: SlideData[] = ${JSON.stringify(slides, null, 2)};
`;

fs.writeFileSync(path.join(outDir, "slidesData.ts"), ts);
console.log("wrote slidesData.ts", slides.length);
