import fs from "fs";
import path from "path";

const PORTFOLIO_DIR = path.join(process.cwd(), "public/images/portfolio");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export function getPortfolioImages(): { src: string; alt: string }[] {
  if (!fs.existsSync(PORTFOLIO_DIR)) return [];

  return fs
    .readdirSync(PORTFOLIO_DIR)
    .filter((file) => EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      const name = path.basename(file, path.extname(file));
      const alt = name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        src: `/images/portfolio/${file}`,
        alt,
      };
    });
}
