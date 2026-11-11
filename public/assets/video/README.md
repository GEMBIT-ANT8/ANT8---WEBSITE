Drop the Higgsfield hero loop here, then set the paths in src/content.mjs → CONFIG.heroVideo:

  hero.mp4        1920×1080, H.264, no audio, ~4–6 MB   → mp4: "/assets/video/hero.mp4"
  hero.webm       optional VP9 version                  → webm: "/assets/video/hero.webm"
  hero-mobile.mp4 4:5 or 9:16 crop, ~2 MB               → mobileMp4: "/assets/video/hero-mobile.mp4"
  hero-poster.webp still from the last shot, ~150 KB    → poster: "/assets/video/hero-poster.webp"

Run `npm run build` afterwards.
