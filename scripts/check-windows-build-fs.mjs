/**
 * Next.js webpack uses readlink on node_modules paths; on Windows + exFAT that throws
 * EISDIR for files like next/dist/pages/_app.js (github.com/vercel/next.js/discussions/77912).
 */
import path from "path";
import { execSync } from "child_process";

if (process.platform !== "win32") {
  process.exit(0);
}

const cwd = process.cwd();
const driveLetter = path.parse(cwd).root.replace(/[\\/:]/g, "").charAt(0);
if (!driveLetter) {
  process.exit(0);
}

let fsType = null;
try {
  fsType = execSync(
    `powershell -NoProfile -Command "(Get-Volume -DriveLetter '${driveLetter}').FileSystemType"`,
    { encoding: "utf8" }
  )
    .trim()
    .toLowerCase();
} catch {
  process.exit(0);
}

if (fsType === "exfat") {
  console.error(`
[build] Drive ${driveLetter}: is exFAT. Next.js "npm run build" on Windows fails with:
  EISDIR: illegal operation on a directory, readlink ... _app.js

Fix (pick one):
  • Convert ${driveLetter}: to NTFS (back up first). Admin CMD:  convert ${driveLetter}: /FS:NTFS
  • Or clone this repo to a folder on an NTFS drive (often C:) and build there.
  • Or run production builds in CI (e.g. GitHub Actions) and keep editing on E:.

Details: https://github.com/vercel/next.js/discussions/77912
`);
  process.exit(1);
}

process.exit(0);
