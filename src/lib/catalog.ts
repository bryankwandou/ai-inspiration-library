export type CategoryId =
  | "ide-game-fable-claude"
  | "3d-character-replica"
  | "landing-page-fable"
  | "ai-trading"
  | "ai-course";

export type ClipKind = "video" | "image";

export type Resource = {
  label: string;
  href: string;
};

export type Clip = {
  id: string;
  category: CategoryId;
  folder: string;
  filename: string;
  kind: ClipKind;
  title: string;
  subtitle: string;
  author: string;
  handle: string;
  tweetId: string;
  tweetUrl: string;
  duration: number;
  resolution: string;
  extra?: boolean;
  description: string;
  takeaways: string[];
  resources?: Resource[];
};

export type Category = {
  id: CategoryId;
  folder: string;
  label: string;
  kicker: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "ide-game-fable-claude",
    folder: "01-ide-game-fable-claude",
    label: "Ide game Fable",
    kicker: "01",
    blurb: "One-shot game worlds dari Fable 5.2, GPT-6 Astra, Unreal, dan Three.js.",
  },
  {
    id: "3d-character-replica",
    folder: "02-3d-character-replica",
    label: "Karakter & replica 3D",
    kicker: "02",
    blurb: "Butterfly mekanik, voxel Fortnite, pulau, dan pirate cove di browser.",
  },
  {
    id: "landing-page-fable",
    folder: "03-landing-page-fable",
    label: "Landing page",
    kicker: "03",
    blurb: "Tutorial desain 3D Codex, Claude Mythos, dan 30 library komponen gratis.",
  },
  {
    id: "ai-trading",
    folder: "04-ai-trading",
    label: "AI trading",
    kicker: "04",
    blurb: "Delapan repo untuk agent, backtest, eksekusi, dan market making.",
  },
  {
    id: "ai-course",
    folder: "05-ai-course",
    label: "AI course",
    kicker: "05",
    blurb: "Computer vision real-time dan tutorial penuh bikin video kartun dengan AI.",
  },
];

export const CLIPS: Clip[] = [
  {
    id: "seftsaint-unreal-astra",
    category: "ide-game-fable-claude",
    folder: "01-ide-game-fable-claude",
    filename: "seftsaint-gpt6-astra-unreal-blender.mp4",
    kind: "video",
    title: "Astra + Unreal + Blender",
    subtitle: "Konsep Godot dipindah ke Unreal",
    author: "eta",
    handle: "seftsaint",
    tweetId: "2101395711015497764",
    tweetUrl: "https://x.com/seftsaint/status/2101395711015497764",
    duration: 26,
    resolution: "1280×720",
    description:
      "Pindah konsep dari Godot ke Unreal setelah ganti MacBook. Pohon dan lighting diubah; hasilnya world walking dengan minimap. GPT-6 Astra dipakai bersama Unreal dan Blender.",
    takeaways: [
      "Pipeline: konsep di engine ringan dulu, baru pindah ke Unreal.",
      "Lighting dan vegetasi paling kelihatan saat switching engine.",
      "Token burn besar saat migrate aset — rencanakan budget Pro.",
    ],
  },
  {
    id: "chetanankola-train-glowup",
    category: "ide-game-fable-claude",
    folder: "01-ide-game-fable-claude",
    filename: "chetanankola-threejs-train-world-glowup.mp4",
    kind: "video",
    title: "Three.js train world",
    subtitle: "Anime journey, bukan fotorealisme",
    author: "Chetan Ankola",
    handle: "chetanankola",
    tweetId: "2101533321381695752",
    tweetUrl: "https://x.com/chetanankola/status/2101533321381695752",
    duration: 39,
    resolution: "1194×1080",
    description:
      "World kereta Three.js bergaya anime: foliage lebih kaya, kontras, palet baru, dan siklus waktu. Dibangun dengan Opus; fotorealisme ditinggalkan.",
    takeaways: [
      "Stylized anime sering lebih kuat dari PBR photoreal di web.",
      "Waktu hari + awan + foliage = mood journey.",
      "Satu loop kamera yang halus lebih meyakinkan dari banyak fitur.",
    ],
  },
  {
    id: "chetanankola-train-original",
    category: "ide-game-fable-claude",
    folder: "01-ide-game-fable-claude",
    filename: "chetanankola-threejs-train-world-original.mp4",
    kind: "video",
    title: "Train world — versi awal",
    subtitle: "Postingan Three.js sebelumnya",
    author: "Chetan Ankola",
    handle: "chetanankola",
    tweetId: "2101177675964711410",
    tweetUrl: "https://x.com/chetanankola/status/2101177675964711410",
    duration: 43,
    resolution: "1246×1080",
    extra: true,
    description:
      "Versi awal pengalaman kereta anime Three.js sebelum glow-up. Berguna untuk membandingkan iterasi visual.",
    takeaways: [
      "Simpan rekaman versi awal — iterasi jadi pelajaran.",
      "Kontras dan canopy foliage adalah delta terbesar.",
    ],
  },
  {
    id: "chetaslua-fable-oneshot",
    category: "ide-game-fable-claude",
    folder: "01-ide-game-fable-claude",
    filename: "chetaslua-fable-52-oneshot-js.mp4",
    kind: "video",
    title: "Fable 5.2 one-shot JS",
    subtitle: "Game murni JavaScript",
    author: "Chetaslua",
    handle: "chetaslua",
    tweetId: "2101376238703333883",
    tweetUrl: "https://x.com/chetaslua/status/2101376238703333883",
    duration: 26,
    resolution: "1984×1080",
    description:
      "Fable 5.2 menghasilkan video dan game dalam satu shot, murni JavaScript. Ini salah satu demo Fable yang paling ramai dibahas.",
    takeaways: [
      "One-shot bagus untuk vertical slice, bukan desain sistem.",
      "Minta ubah satu mekanik untuk tes apakah arsitektur tahan.",
      "Frontend fidelity Fable 5.x sudah mendekati produksi.",
    ],
  },
  {
    id: "chetaslua-fable-video-game",
    category: "ide-game-fable-claude",
    folder: "01-ide-game-fable-claude",
    filename: "chetaslua-fable-52-video-and-game.mp4",
    kind: "video",
    title: "Fable 5.2 video + game",
    subtitle: "Routed dari Fable 5.1",
    author: "Chetaslua",
    handle: "chetaslua",
    tweetId: "2101071418507366895",
    tweetUrl: "https://x.com/chetaslua/status/2101071418507366895",
    duration: 30,
    resolution: "1920×1080",
    description:
      "Fable 5.2 membuat video dan gamenya sekaligus, di-route dari Fable 5.1. Referensi prompt & output cinematic game.",
    takeaways: [
      "Minta model bikin trailer dan playable dalam satu sesi.",
      "Cinematic camera + gameplay loop harus di-spec terpisah.",
    ],
  },
  {
    id: "moisasadr-gunbound-prompt",
    category: "ide-game-fable-claude",
    folder: "01-ide-game-fable-claude",
    filename: "moisasadr-gunbound-prompt.png",
    kind: "image",
    title: "Prompt arah Gunbound",
    subtitle: "Screenshot ide Chet",
    author: "StolenAngel",
    handle: "MoisasADR",
    tweetId: "2101078133080563781",
    tweetUrl: "https://x.com/MoisasADR/status/2101078133080563781",
    duration: 0,
    resolution: "PNG",
    description:
      "Bukan video — screenshot percakapan: Chet minta semacam game Gunbound. Simpan sebagai arah ide (artileri turn-based, wind, terrain).",
    takeaways: [
      "Referensi game lama (Gunbound) lebih jelas dari deskripsi abstrak.",
      "Turn-based + fisika + terrain = brief yang bisa di-one-shot.",
    ],
  },
  {
    id: "realfedeuru-fable-vs-astra",
    category: "ide-game-fable-claude",
    folder: "01-ide-game-fable-claude",
    filename: "realfedeuru-fable-52-vs-gpt6-astra.mp4",
    kind: "video",
    title: "Fable 5.2 vs GPT-6 Astra",
    subtitle: "Side-by-side output",
    author: "Fede (URU)",
    handle: "RealFedeURU",
    tweetId: "2101424562856501468",
    tweetUrl: "https://x.com/RealFedeURU/status/2101424562856501468",
    duration: 46,
    resolution: "1080×1214",
    description:
      "Perbandingan langsung Fable 5.2 dan GPT-6 Astra pada brief game yang sama. Berguna untuk memilih model per jenis visual.",
    takeaways: [
      "Bandingkan model pada prompt identik, bukan demo cherry-pick.",
      "Perhatikan kamera, lighting, dan kepadatan scene.",
    ],
  },
  {
    id: "thtbee-mechanical-butterfly",
    category: "3d-character-replica",
    folder: "02-3d-character-replica",
    filename: "thtbee-gemini4-mechanical-butterfly.mp4",
    kind: "video",
    title: "Mechanical butterfly",
    subtitle: "Gemini 4 Pro · Three.js",
    author: "Bee",
    handle: "thtbee_",
    tweetId: "2101304547876700627",
    tweetUrl: "https://x.com/thtbee_/status/2101304547876700627",
    duration: 28,
    resolution: "1920×1080",
    description:
      "Gemini 4 Pro diminta membuat kupu-kupu mekanik indah di Three.js. Output: replica 3D dengan material metalik dan animasi sayap.",
    takeaways: [
      "Brief 'beautiful mechanical X in three.js' sudah cukup spesifik.",
      "Material + rig sayap + orbit camera = formula replica.",
      "Simpan file Three.js yang di-generate untuk dibongkar.",
    ],
  },
  {
    id: "notjazii-voxel-fortnite",
    category: "3d-character-replica",
    folder: "02-3d-character-replica",
    filename: "notjazii-fable-voxel-fortnite.mp4",
    kind: "video",
    title: "Voxel Fortnite clone",
    subtitle: "Fable 5.2 · Three.js · ~12 jam",
    author: "Jazii",
    handle: "notjazii",
    tweetId: "2101334135507910663",
    tweetUrl: "https://x.com/notjazii/status/2101334135507910663",
    duration: 67,
    resolution: "1920×1080",
    description:
      "Fable 5.2 membangun clone Fortnite bergaya voxel yang playable, murni Three.js, sekitar 12 jam dan ~2 juta token. Game oleh Taylor Bereiter.",
    takeaways: [
      "Voxel menekan beban aset dan tetap kebaca sebagai genre.",
      "12 jam + 2M token = skala sesi yang realistis untuk slice.",
      "Bayangkan pipeline yang sama di Unreal setelah prototype JS.",
    ],
  },
  {
    id: "taylorbereiter-voxnite",
    category: "3d-character-replica",
    folder: "02-3d-character-replica",
    filename: "taylorbereiter-voxnite-explainer.mp4",
    kind: "video",
    title: "Voxnite explainer",
    subtitle: "Model bikin video penjelas sendiri",
    author: "Sestina",
    handle: "TaylorBereiter",
    tweetId: "2101328500074639623",
    tweetUrl: "https://x.com/TaylorBereiter/status/2101328500074639623",
    duration: 59,
    resolution: "1280×720",
    extra: true,
    description:
      "Voxnite — Fable 5.1 meroute ke model yang lalu membuat explainer videonya sendiri. Artifact Claude (desktop).",
    takeaways: [
      "Minta model men-generate explainer dari prototipenya sendiri.",
      "Artifact Claude cocok untuk slice desktop-only.",
    ],
    resources: [
      {
        label: "Play Voxnite (Claude artifact)",
        href: "https://claude.ai/artifact/9mGKuM7NiH69rZouD8QHdh",
      },
    ],
  },
  {
    id: "vib3coded-pirate-cove",
    category: "3d-character-replica",
    folder: "02-3d-character-replica",
    filename: "vib3coded-astra-pirate-cove.mp4",
    kind: "video",
    title: "Pirate cove",
    subtitle: "Satu file HTML · Astra",
    author: "Vib3Coded",
    handle: "vib3coded",
    tweetId: "2101441161390964964",
    tweetUrl: "https://x.com/vib3coded/status/2101441161390964964",
    duration: 30,
    resolution: "1920×1080",
    description:
      "Astra membangun pirate cove dalam satu file HTML: Three.js, model prosedural, shader gelombang, air cutaway, kapal, hiu, meriam, dan musik Web Audio.",
    takeaways: [
      "Satu file HTML memaksa model menyusun scene lengkap.",
      "Shader air + Web Audio membuat diorama terasa hidup.",
      "Cutaway water adalah trik presentasi yang kuat.",
    ],
  },
  {
    id: "vib3coded-tidehaven",
    category: "3d-character-replica",
    folder: "02-3d-character-replica",
    filename: "vib3coded-astra-tidehaven-island.mp4",
    kind: "video",
    title: "Tidehaven island",
    subtitle: "Diorama interaktif GPT-6 Astra",
    author: "Vib3Coded",
    handle: "vib3coded",
    tweetId: "2100752564832616652",
    tweetUrl: "https://x.com/vib3coded/status/2100752564832616652",
    duration: 32,
    resolution: "2560×1440",
    extra: true,
    description:
      "Tidehaven: kabin atap tembaga, dermaga, laguna, pari, kayak, kamera bawah air. Pasang surut, angin, dan waktu hari bisa diubah.",
    takeaways: [
      "Parameter tide / wind / time-of-day = playground, bukan clip.",
      "Underwater camera + caustics untuk depth.",
    ],
  },
  {
    id: "viktoroddy-codex-3d-tutorial",
    category: "landing-page-fable",
    folder: "03-landing-page-fable",
    filename: "viktoroddy-gpt6-astra-codex-3d-tutorial-1080p.mp4",
    kind: "video",
    title: "Tutorial Codex × GPT-6 Astra",
    subtitle: "Panduan lengkap desain 3D",
    author: "Viktor Oddy",
    handle: "viktoroddy",
    tweetId: "2101275801660662058",
    tweetUrl: "https://x.com/viktoroddy/status/2101275801660662058",
    duration: 577,
    resolution: "1662×1080",
    description:
      "Tutorial ~9,5 menit: GPT-6 Astra sebagai model desain 3D, alur kerja Codex untuk web dan karya kreatif. Ini file 1080p (bukan 360p dari feed).",
    takeaways: [
      "Pakai Codex + Astra khusus untuk brief spasial / 3D web.",
      "Simpan prompt master, jangan improvisasi tiap sesi.",
      "Token mahal — pecah brief jadi langkah kecil.",
    ],
    resources: [
      { label: "Motionsites · Axle Journey", href: "https://motionsites.ai/?prompt=axle-journey" },
    ],
  },
  {
    id: "viktoroddy-motionsites",
    category: "landing-page-fable",
    folder: "03-landing-page-fable",
    filename: "viktoroddy-motionsites-preview.mp4",
    kind: "video",
    title: "Motionsites preview",
    subtitle: "600+ prompt website",
    author: "Viktor Oddy",
    handle: "viktoroddy",
    tweetId: "2101275968069648707",
    tweetUrl: "https://x.com/viktoroddy/status/2101275968069648707",
    duration: 7,
    resolution: "1920×1412",
    extra: true,
    description: "Clip pendek vault prompt Motionsites yang menyertai tutorial Codex.",
    takeaways: ["Vault prompt siap pakai mempercepat iterasi landing."],
    resources: [
      { label: "Motionsites", href: "https://motionsites.ai/?prompt=axle-journey" },
    ],
  },
  {
    id: "nereasolenne-claude-mythos",
    category: "landing-page-fable",
    folder: "03-landing-page-fable",
    filename: "nereasolenne-claude-mythos-landing-tutorial-1080p.mp4",
    kind: "video",
    title: "Claude Mythos landing",
    subtitle: "Tutorial 12 menit, gratis",
    author: "nerea",
    handle: "nereasolenne",
    tweetId: "2101265048824074535",
    tweetUrl: "https://x.com/nereasolenne/status/2101265048824074535",
    duration: 714,
    resolution: "1662×1080",
    description:
      "Tutorial ~12 menit: memakai Claude Mythos untuk membangun website animasi setingkat yang memenangkan award. Diunduh 1080p.",
    takeaways: [
      "Tonton proses lengkap, bukan cuma hasil akhir.",
      "Animasi scrollytelling butuh timeline yang eksplisit di prompt.",
      "12 menit cukup untuk meniru alur, bukan untuk hafal tool.",
    ],
  },
  {
    id: "himanshubuildss-template-list",
    category: "landing-page-fable",
    folder: "03-landing-page-fable",
    filename: "himanshubuildss-30-component-libraries.mp4",
    kind: "video",
    title: "30 library & prompt gratis",
    subtitle: "Komponen, gallery, master prompt",
    author: "Himanshu Hingorani",
    handle: "himanshubuildss",
    tweetId: "2101255618313302146",
    tweetUrl: "https://x.com/himanshubuildss/status/2101255618313302146",
    duration: 14,
    resolution: "1766×1080",
    description:
      "Thread 30 resource: vault prompt, komponen React/Tailwind, gallery UI, loader, icon 3D. Daftar lengkap ada di panel resource.",
    takeaways: [
      "Satu vault prompt + shadcn + motion library = stack landing.",
      "Gallery nyata (Refero, Minimal Gallery) untuk referensi, bukan generate buta.",
    ],
    resources: [
      { label: "Scrolltide", href: "https://www.scrolltide.co/" },
      { label: "Aceternity UI", href: "https://ui.aceternity.com/" },
      { label: "Magic UI", href: "https://magicui.design/" },
      { label: "Motion Primitives", href: "https://motion-primitives.com/" },
      { label: "shadcn/ui", href: "https://ui.shadcn.com/" },
      { label: "Uiverse", href: "https://uiverse.io/" },
      { label: "3Dicons", href: "https://3dicons.co/" },
      { label: "Anime.js", href: "https://animejs.com/" },
    ],
  },
  {
    id: "teddyinmedia-ai-trading",
    category: "ai-trading",
    folder: "04-ai-trading",
    filename: "teddyinmedia-8-github-ai-trading-stack.mp4",
    kind: "video",
    title: "8 repo AI trading stack",
    subtitle: "Agent, backtest, eksekusi",
    author: "TeddyCEO",
    handle: "TeddyinMedia",
    tweetId: "2101311604797145483",
    tweetUrl: "https://x.com/TeddyinMedia/status/2101311604797145483",
    duration: 25,
    resolution: "1440×1784",
    description:
      "Bukan 'AI prediksi candle'. Delapan repo: multi-agent, bot crypto, exchange API, research/live, market making, agent onchain, RL, dan framework backtest. Riset lokal, tanpa dana nyata dulu.",
    takeaways: [
      "Stack: data → strategy → backtest → risk → execution → agent.",
      "Jangan kasih agent akses wallet sebelum paham eksekusi.",
      "Backtest yang jujur lebih penting dari demo agent.",
    ],
    resources: [
      { label: "AI Hedge Fund", href: "https://github.com/virattt/ai-hedge-fund" },
      { label: "Freqtrade", href: "https://github.com/freqtrade/freqtrade" },
      { label: "CCXT", href: "https://github.com/ccxt/ccxt" },
      { label: "NautilusTrader", href: "https://github.com/nautechsystems/nautilus_trader" },
      { label: "Hummingbot", href: "https://github.com/hummingbot/hummingbot" },
      { label: "Eliza", href: "https://github.com/elizaOS/eliza" },
      { label: "FinRL", href: "https://github.com/AI4Finance-Foundation/FinRL" },
      { label: "Jesse", href: "https://github.com/jesse-ai/jesse" },
    ],
  },
  {
    id: "alacritic-relateanything",
    category: "ai-course",
    folder: "05-ai-course",
    filename: "alacritic-relateanything-computer-vision.mp4",
    kind: "video",
    title: "RelateAnything",
    subtitle: "Relasi objek open-vocabulary",
    author: "Praveen Kumar Verma",
    handle: "Alacritic_Super",
    tweetId: "2101254759122669846",
    tweetUrl: "https://x.com/Alacritic_Super/status/2101254759122669846",
    duration: 30,
    resolution: "1280×720",
    description:
      "Model 53M parameter, ~20ms/frame, 19.000+ kata relasi. Membaca holding / wearing / sitting-on dari piksel dan bounding box, tanpa retraining.",
    takeaways: [
      "Relasi spasial masih titik lemah — uji sendiri.",
      "Cocok untuk robotika dan video streaming real-time.",
      "Jangan andalkan nama objek; model ini melihat geometri.",
    ],
    resources: [
      { label: "GitHub RelateAnything", href: "https://github.com/Maelic/RelateAnything" },
    ],
  },
  {
    id: "he1s-sammy-cartoon-tutorial",
    category: "ai-course",
    folder: "05-ai-course",
    filename: "he1s-sammy-cartoon-videos-with-ai-full-tutorial-720p.mp4",
    kind: "video",
    title: "Cartoon videos with AI",
    subtitle: "Tutorial penuh ~67 menit",
    author: "S",
    handle: "He1s_Sammy",
    tweetId: "2101316233547161831",
    tweetUrl: "https://x.com/He1s_Sammy/status/2101316233547161831",
    duration: 4013,
    resolution: "1280×720",
    description:
      "Tutorial lengkap cara membuat video kartun dengan AI (~67 menit). Diunduh 720p — kualitas tertinggi yang tersedia di X.",
    takeaways: [
      "Tutorial panjang: tonton dengan kecepatan 1.25×, pause di tool setup.",
      "Catat stack (image, video, suara) di catatan sendiri.",
      "Progress tontonan tersimpan di browser ini.",
    ],
  },
];

export function clipSrc(clip: Clip): string {
  return `/library/${clip.folder}/${clip.filename}`;
}

export function clipThumb(clip: Clip): string {
  return `/library/thumbs/${clip.id}.jpg`;
}

export function clipAvatar(clip: Clip): string {
  return `/library/avatars/${clip.handle}.jpg`;
}

export function getClip(id: string): Clip | undefined {
  return CLIPS.find((c) => c.id === id);
}

export function clipsIn(category: CategoryId | "all"): Clip[] {
  if (category === "all") return CLIPS;
  return CLIPS.filter((c) => c.category === category);
}

export function getCategory(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export const TEMPLATE_LIBS: Resource[] = [
  { label: "Scrolltide", href: "https://www.scrolltide.co/" },
  { label: "Aceternity UI", href: "https://ui.aceternity.com/" },
  { label: "Magic UI", href: "https://magicui.design/" },
  { label: "Motion Primitives", href: "https://motion-primitives.com/" },
  { label: "OpenMotion", href: "https://openmotion.so/" },
  { label: "Kinetics", href: "https://www.kinetics.motion/" },
  { label: "21st.dev", href: "https://21st.dev/" },
  { label: "DESIGNmd", href: "https://designmd.dev/" },
  { label: "VibePrompt", href: "https://vibeprompt.design/" },
  { label: "Refero Styles", href: "https://refero.design/" },
  { label: "Kage", href: "https://kage.design/" },
  { label: "shadcn/ui", href: "https://ui.shadcn.com/" },
  { label: "Uiverse", href: "https://uiverse.io/" },
  { label: "UIAble", href: "https://uiable.com/" },
  { label: "mapcn", href: "https://mapcn.dev/" },
  { label: "Component Gallery", href: "https://component.gallery/" },
  { label: "Minimal Gallery", href: "https://minimal.gallery/" },
  { label: "AppShot Gallery", href: "https://appshot.gallery/" },
  { label: "Navbar Gallery", href: "https://navbar.gallery/" },
  { label: "Footer Design", href: "https://www.footer.design/" },
  { label: "CTA Gallery", href: "https://www.cta.gallery/" },
  { label: "404s", href: "https://www.404s.design/" },
  { label: "Liquid Glass", href: "https://liquid-glass.design/" },
  { label: "MicroKit UI", href: "https://www.microkit.ui/" },
  { label: "CSS Text Effects", href: "https://css-text-effects.vercel.app/" },
  { label: "Circle Loaders", href: "https://css-loaders.com/" },
  { label: "Gradient Buttons", href: "https://gradientbuttons.colorion.co/" },
  { label: "Kitbitz", href: "https://www.kitbitz.com/" },
  { label: "3Dicons", href: "https://3dicons.co/" },
  { label: "Anime.js", href: "https://animejs.com/" },
];
