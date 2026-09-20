#!/usr/bin/env python3
"""Download X/Twitter reference videos into /workspace/library with subfolders."""
from __future__ import annotations

import json
import os
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path("/workspace/library")
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
)
REFERER = "https://x.com/"

ITEMS = [
    # --- 01 ide game fable claude ---
    {
        "id": "seftsaint-unreal-astra",
        "folder": "01-ide-game-fable-claude",
        "filename": "seftsaint-gpt6-astra-unreal-blender.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101395397445050368/vid/avc1/1280x720/-T-k4MJ567-JrKS5.mp4?tag=14",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101395397445050368/img/F9db-bOLbAgvo4lo.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2101591445081911296/6hJ8gfrf.jpg",
        "handle": "seftsaint",
    },
    {
        "id": "chetanankola-train-glowup",
        "folder": "01-ide-game-fable-claude",
        "filename": "chetanankola-threejs-train-world-glowup.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101526715474509824/vid/avc1/1194x1080/yyYhWHyPukJlG47S.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101526715474509824/img/bKCBAqW8Uk_oMq56.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2068053560710037504/KnfU07Hv.jpg",
        "handle": "chetanankola",
    },
    {
        "id": "chetanankola-train-original",
        "folder": "01-ide-game-fable-claude",
        "filename": "chetanankola-threejs-train-world-original.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101145816719331328/vid/avc1/1246x1080/R39tp8EZ5Kv75AAt.mp4",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101145816719331328/img/RqndYBF02V1SaxmA.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2068053560710037504/KnfU07Hv.jpg",
        "handle": "chetanankola",
    },
    {
        "id": "chetaslua-fable-oneshot",
        "folder": "01-ide-game-fable-claude",
        "filename": "chetaslua-fable-52-oneshot-js.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101375408155631616/vid/avc1/1984x1080/WMZl5N_hy8knrzV4.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101375408155631616/img/CmIOhA-gaEZ3Qar4.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/1926364057004646400/z3oD9QyB.jpg",
        "handle": "chetaslua",
    },
    {
        "id": "chetaslua-fable-video-game",
        "folder": "01-ide-game-fable-claude",
        "filename": "chetaslua-fable-52-video-and-game.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101071203071041536/vid/avc1/1920x1080/UZngxfJ3sqvBUwCk.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101071203071041536/img/F3AKzptTJ77VpP4j.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/1926364057004646400/z3oD9QyB.jpg",
        "handle": "chetaslua",
    },
    {
        "id": "moisasadr-gunbound-prompt",
        "folder": "01-ide-game-fable-claude",
        "filename": "moisasadr-gunbound-prompt.png",
        "kind": "image",
        "url": "https://pbs.twimg.com/media/HSiHUq8XYAEMHUW.png?name=orig",
        "thumb": "https://pbs.twimg.com/media/HSiHUq8XYAEMHUW.png?name=small",
        "avatar": "https://pbs.twimg.com/profile_images/1999873893541052417/xKiiy3XI.jpg",
        "handle": "MoisasADR",
    },
    {
        "id": "realfedeuru-fable-vs-astra",
        "folder": "01-ide-game-fable-claude",
        "filename": "realfedeuru-fable-52-vs-gpt6-astra.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101361616054894592/vid/avc1/1080x1214/RqXj54T6N8bIe1lO.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101361616054894592/img/Vk0IvFSfTm95hkPx.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/1526193387107409920/aWGAVwEa.jpg",
        "handle": "RealFedeURU",
    },
    # --- 02 3d character replica ---
    {
        "id": "thtbee-mechanical-butterfly",
        "folder": "02-3d-character-replica",
        "filename": "thtbee-gemini4-mechanical-butterfly.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101300059484901378/vid/avc1/1920x1080/HjGCLP9s-Fk1bK9O.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101300059484901378/img/KF9SiVnGFYys9tzW.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2083983655387742208/J6MwCk4b.jpg",
        "handle": "thtbee_",
    },
    {
        "id": "notjazii-voxel-fortnite",
        "folder": "02-3d-character-replica",
        "filename": "notjazii-fable-voxel-fortnite.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101333166661488641/vid/avc1/1920x1080/iBS0EurmbUzjMEBC.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101333166661488641/img/5_jySnS2UBChVtPK.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2099634694421913600/46b7mMot.jpg",
        "handle": "notjazii",
    },
    {
        "id": "taylorbereiter-voxnite",
        "folder": "02-3d-character-replica",
        "filename": "taylorbereiter-voxnite-explainer.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101327791732178944/vid/avc1/1280x720/21kB-YraQFpK61AK.mp4?tag=14",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101327791732178944/img/DWZ6wxPLlDAUv6Yp.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2094810177358921729/ACJsHaxW.jpg",
        "handle": "TaylorBereiter",
    },
    {
        "id": "vib3coded-pirate-cove",
        "folder": "02-3d-character-replica",
        "filename": "vib3coded-astra-pirate-cove.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101441095007670272/vid/avc1/1920x1080/uF38GmkN7TRANBwv.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101441095007670272/img/r1fOHeh9AR9OpITW.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2093006364729659392/0EAnjDsN.jpg",
        "handle": "vib3coded",
    },
    {
        "id": "vib3coded-tidehaven",
        "folder": "02-3d-character-replica",
        "filename": "vib3coded-astra-tidehaven-island.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2100752479285567488/vid/avc1/2560x1440/W2ENCwbgLhKVrOzp.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2100752479285567488/img/65SAKBeMdrhCqhsj.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2093006364729659392/0EAnjDsN.jpg",
        "handle": "vib3coded",
    },
    # --- 03 landing page ---
    {
        "id": "viktoroddy-codex-3d-tutorial",
        "folder": "03-landing-page-fable",
        "filename": "viktoroddy-gpt6-astra-codex-3d-tutorial-1080p.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101275314928467968/vid/avc1/1662x1080/2njjlzLR39yVEyFn.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101275314928467968/img/lN1AnooC_EN9mhEY.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2095368366693466112/1vPxOkT8.jpg",
        "handle": "viktoroddy",
    },
    {
        "id": "viktoroddy-motionsites",
        "folder": "03-landing-page-fable",
        "filename": "viktoroddy-motionsites-preview.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101275923886854144/vid/avc1/1920x1412/TvrR97DthsXxR2K5.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101275923886854144/img/jkNpKzafHsWYMRuB.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2095368366693466112/1vPxOkT8.jpg",
        "handle": "viktoroddy",
    },
    {
        "id": "nereasolenne-claude-mythos",
        "folder": "03-landing-page-fable",
        "filename": "nereasolenne-claude-mythos-landing-tutorial-1080p.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101058026937761793/vid/avc1/1662x1080/MRcxOZxgF4oFwuvo.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101058026937761793/img/xhiziWRfOZ-gQ7z5.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2094330461057073153/EpsIlfKY.jpg",
        "handle": "nereasolenne",
    },
    {
        "id": "himanshubuildss-template-list",
        "folder": "03-landing-page-fable",
        "filename": "himanshubuildss-30-component-libraries.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101255357540769792/vid/avc1/1766x1080/VgqJSPU7OD1tYc_P.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101255357540769792/img/abayBewIW6XZLP_M.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2040486128294436864/JziGJtod.jpg",
        "handle": "himanshubuildss",
    },
    # --- 04 ai trading ---
    {
        "id": "teddyinmedia-ai-trading",
        "folder": "04-ai-trading",
        "filename": "teddyinmedia-8-github-ai-trading-stack.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101310739969454080/vid/avc1/1440x1784/4SfmC5uOBxYSEAb9.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101310739969454080/img/cHWwzYs2uBGKECaf.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2068954562052907008/cpetTKs-.jpg",
        "handle": "TeddyinMedia",
    },
    # --- 05 ai course ---
    {
        "id": "alacritic-relateanything",
        "folder": "05-ai-course",
        "filename": "alacritic-relateanything-computer-vision.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101254149514133504/vid/avc1/1280x720/ZYAhoVkKLsavRTXS.mp4",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101254149514133504/img/oc1VO-bVnksBykSf.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2040335055336480768/wn38v3_i.jpg",
        "handle": "Alacritic_Super",
    },
    {
        "id": "he1s-sammy-cartoon-tutorial",
        "folder": "05-ai-course",
        "filename": "he1s-sammy-cartoon-videos-with-ai-full-tutorial-720p.mp4",
        "kind": "video",
        "url": "https://video.twimg.com/amplify_video/2101313262008602624/vid/avc1/1280x720/CF_LdG8ZoQd8m16r.mp4?tag=29",
        "thumb": "https://pbs.twimg.com/amplify_video_thumb/2101313262008602624/img/E5Ax8JP2XJqOirxG.jpg",
        "avatar": "https://pbs.twimg.com/profile_images/2090810578172305408/g0_Zl0tm.jpg",
        "handle": "He1s_Sammy",
    },
]


def curl_download(url: str, dest: Path, retries: int = 6) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(dest.suffix + ".part")
    cmd = [
        "curl",
        "-L",
        "--fail",
        "--retry",
        str(retries),
        "--retry-all-errors",
        "--retry-delay",
        "2",
        "-C",
        "-",
        "-A",
        UA,
        "-e",
        REFERER,
        "--connect-timeout",
        "20",
        "--max-time",
        "0",
        "-o",
        str(tmp),
        url,
    ]
    for attempt in range(1, retries + 1):
        print(f"GET {dest.name} (try {attempt}) {url[:90]}", flush=True)
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode == 0 and tmp.exists() and tmp.stat().st_size > 0:
            tmp.replace(dest)
            print(f"OK  {dest}  {dest.stat().st_size} bytes", flush=True)
            return
        print(f"FAIL {dest.name} code={r.returncode} err={r.stderr[-400:]}", flush=True)
        time.sleep(min(8, attempt * 2))
    raise RuntimeError(f"download failed: {url} -> {dest}")


def job(item: dict) -> dict:
    folder = ROOT / item["folder"]
    media = folder / item["filename"]
    thumb = ROOT / "thumbs" / f"{item['id']}.jpg"
    avatar = ROOT / "avatars" / f"{item['handle']}.jpg"
    if not media.exists() or media.stat().st_size < 1024:
        curl_download(item["url"], media)
    else:
        print(f"SKIP media {media.name}", flush=True)
    if item.get("thumb") and (not thumb.exists() or thumb.stat().st_size < 200):
        try:
            curl_download(item["thumb"], thumb)
        except Exception as e:
            print(f"thumb fail {item['id']}: {e}", flush=True)
    if item.get("avatar") and (not avatar.exists() or avatar.stat().st_size < 200):
        try:
            curl_download(item["avatar"], avatar)
        except Exception as e:
            print(f"avatar fail {item['handle']}: {e}", flush=True)
    return {
        "id": item["id"],
        "path": str(media.relative_to(ROOT)),
        "bytes": media.stat().st_size if media.exists() else 0,
        "ok": media.exists() and media.stat().st_size > 1024,
    }


def main() -> int:
    ROOT.mkdir(parents=True, exist_ok=True)
    (ROOT / "thumbs").mkdir(exist_ok=True)
    (ROOT / "avatars").mkdir(exist_ok=True)
    for sub in sorted({i["folder"] for i in ITEMS}):
        (ROOT / sub).mkdir(exist_ok=True)

    results = []
    # Long files first so they overlap with shorts
    ordered = sorted(ITEMS, key=lambda i: 0 if "tutorial" in i["id"] else 1)
    with ThreadPoolExecutor(max_workers=4) as ex:
        futs = {ex.submit(job, it): it for it in ordered}
        for fut in as_completed(futs):
            try:
                results.append(fut.result())
            except Exception as e:
                it = futs[fut]
                print(f"ERROR {it['id']}: {e}", flush=True)
                results.append({"id": it["id"], "ok": False, "error": str(e)})

    (ROOT / "download-status.json").write_text(json.dumps(results, indent=2))
    failed = [r for r in results if not r.get("ok")]
    print("DONE", json.dumps({"ok": len(results) - len(failed), "fail": len(failed)}), flush=True)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
