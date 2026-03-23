#!/usr/bin/env python3
"""
VS Code Terminal–themed animated GIF email signature — Tredir Sewpaul
760 × 215 px  ·  48 frames  ·  80 ms/frame  ≈  3.84 s loop

Composite-palette quantisation with no dithering → razor-sharp text on dark bg.
"""

from PIL import Image, ImageDraw, ImageFont
import math, os

# ══════════════════════════════════════════════════════════════════
#  CANVAS
# ══════════════════════════════════════════════════════════════════
W, H      = 760, 215
FRAMES    = 36           # 36 × 90ms ≈ 3.24 s — same smooth feel, ~25% smaller
FRAME_MS  = 90
TITLE_H   = 27        # window chrome height
PAD_L     = 14
PAD_R     = 14

# ══════════════════════════════════════════════════════════════════
#  VS CODE DARK+ × PORTFOLIO COLOUR PALETTE
# ══════════════════════════════════════════════════════════════════
BG        = ( 13,  17,  23)    # #0d1117  portfolio --bg-dark
CHROME    = ( 22,  27,  34)    # title bar
BORDER_C  = ( 48,  54,  61)    # card / separator border

DOT_RED   = (255,  95,  87)    # macOS-style traffic lights
DOT_YEL   = (255, 189,  46)
DOT_GRN   = ( 40, 200,  64)

TXT_NORM  = (212, 212, 212)    # VS Code editor text   #d4d4d4
TXT_DIM   = ( 99, 110, 123)    # muted / secondary
TXT_MED   = (150, 160, 170)    # mid-brightness

ACCENT    = ( 88, 166, 255)    # #58a6ff  portfolio --accent
ACCENT_S  = (163, 113, 247)    # #a371f7  portfolio --accent-secondary
GREEN     = ( 63, 185,  80)    # #3fb950  portfolio --success

J_KEY     = (156, 220, 254)    # #9cdcfe  VS Code JSON property key
J_STR     = (206, 145, 120)    # #ce9178  VS Code JSON string value

# ══════════════════════════════════════════════════════════════════
#  FONTS  (Cascadia Code → Consolas → Lucida Console fallback)
# ══════════════════════════════════════════════════════════════════
_UF = os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\Windows\Fonts") + "\\"
_WF = r"C:\Windows\Fonts" + "\\"

_MONO = [
    _WF + "CascadiaCode.ttf",   _WF + "CascadiaMono.ttf",
    _UF + "CascadiaCode.ttf",   _UF + "CascadiaMono.ttf",
    _WF + "consola.ttf",        _WF + "lucon.ttf",
    _WF + "cour.ttf",
]
_BOLD = [
    _WF + "CascadiaCode.ttf",   _WF + "CascadiaMono.ttf",
    _WF + "consolab.ttf",       _WF + "courbd.ttf",
    _WF + "lucon.ttf",
]

def _ttf(cands, size):
    for p in cands:
        if os.path.exists(p):
            try:    return ImageFont.truetype(p, size), p
            except: pass
    return ImageFont.load_default(), "(default)"

fMD,   _md_path = _ttf(_MONO, 12)   # body monospace 12 px
fSM,   _        = _ttf(_MONO, 11)   # small (subtitle / title bar)
fNAME, _nm_path = _ttf(_BOLD, 22)   # name — slightly heavier weight
fTIT,  _        = _ttf(_MONO, 11)   # title bar label

# ══════════════════════════════════════════════════════════════════
#  MATH / COLOUR HELPERS
# ══════════════════════════════════════════════════════════════════
TAU = math.tau

def lerpc(c1, c2, t):
    t = max(0., min(1., t))
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))

def eio(t):
    return (1 - math.cos(math.pi * t)) / 2

def gcolor(t, stops):
    t = max(0., min(1., t))
    n = len(stops) - 1
    s = t * n
    i, f = int(s), s - int(s)
    return lerpc(stops[min(i, n - 1)], stops[min(i + 1, n)], f)

def tw(font, text):
    try:
        bb = font.getbbox(text)
        return bb[2] - bb[0]
    except Exception:
        return len(text) * 7

def th_f(font, sample="Mg"):
    try:
        bb = font.getbbox(sample)
        return bb[3] - bb[1]
    except Exception:
        return 12

# ══════════════════════════════════════════════════════════════════
#  DRAWING PRIMITIVES
# ══════════════════════════════════════════════════════════════════

def draw_segs(draw, x, y, parts):
    """Render [(text, colour), ...] left-to-right. Returns new x."""
    for text, col in parts:
        draw.text((x, y), text, font=fMD, fill=col)
        x += tw(fMD, text)
    return x

def draw_shimmer(draw, x, y, text, font, shim_x, stops):
    """Name text: gradient fill with a moving bright highlight band."""
    cx    = x
    total = tw(font, text)
    for ch in text:
        cw   = tw(font, ch)
        mid  = cx + cw / 2
        base = gcolor((mid - x) / max(total, 1), stops)
        dist = abs(shim_x - mid)
        glow = max(0., 1. - dist / 95) ** 2
        col  = lerpc(base, (255, 255, 255), glow * 0.72)
        draw.text((cx, y), ch, font=font, fill=col)
        cx += cw

def draw_prompt(draw, x, y, pulse=1.0):
    """Render  tredir@uwc:~$  and return x after it."""
    return draw_segs(draw, x, y, [
        ("tredir", lerpc(TXT_DIM, ACCENT,   pulse)),
        ("@",      lerpc(TXT_DIM, TXT_MED,  1.0)),
        ("uwc",    lerpc(TXT_DIM, ACCENT_S, pulse)),
        (":",      lerpc(TXT_DIM, TXT_MED,  1.0)),
        ("~",      lerpc(TXT_DIM, GREEN,    pulse)),
        ("$ ",     lerpc(TXT_DIM, TXT_NORM, pulse)),
    ])

def draw_info_row(draw, y, label, value, label2=None, value2=None):
    """Clean label → value row; optional second pair on the same line."""
    lc = tw(fMD, "Education  ")   # fixed column width aligns all labels
    draw.text((PAD_L, y), label, font=fMD, fill=TXT_DIM)
    vx = PAD_L + lc
    draw.text((vx, y), value, font=fMD, fill=TXT_NORM)
    if label2 and value2:
        x  = vx + tw(fMD, value)
        x += tw(fMD, "   ")
        draw.text((x, y), label2, font=fMD, fill=TXT_DIM)
        x += tw(fMD, label2 + " ")
        draw.text((x, y), value2, font=fMD, fill=TXT_NORM)

# ══════════════════════════════════════════════════════════════════
#  SINGLE FRAME
# ══════════════════════════════════════════════════════════════════

def make_frame(idx):
    t = idx / FRAMES     # 0.0 … 1.0

    pulse  = 0.45 + 0.55 * eio((math.sin(t * TAU * 0.85) + 1) / 2)
    shim_x = PAD_L - 90 + ((t * 1.4) % 1.0) * (tw(fNAME, "Tredir Sewpaul") + 200)
    seg_c  = gcolor(eio((math.sin(t * TAU * 0.9) + 1) / 2), [ACCENT, ACCENT_S])
    anim_x = int(PAD_L + ((t * 1.65) % 1.0) * (W - PAD_L - PAD_R - 60))

    img  = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # ── Card outline ────────────────────────────────────────────────
    draw.rounded_rectangle([0, 0, W - 1, H - 1],
                            radius=9, outline=BORDER_C, width=1)

    # ── Window chrome (title bar) ────────────────────────────────────
    draw.rounded_rectangle([0, 0, W - 1, TITLE_H - 1], radius=9, fill=CHROME)
    draw.rectangle([0, TITLE_H // 2, W - 1, TITLE_H - 1], fill=CHROME)
    draw.line([(0, TITLE_H), (W - 1, TITLE_H)], fill=BORDER_C)

    # Traffic-light dots
    dot_cy = TITLE_H // 2
    for i, col in enumerate([DOT_RED, DOT_YEL, DOT_GRN]):
        dx = 14 + i * 16
        draw.ellipse([dx - 5, dot_cy - 5, dx + 5, dot_cy + 5], fill=col)

    # Centred title text
    title   = "Tredir Sewpaul  —  Contact"
    t_x     = (W - tw(fTIT, title)) // 2
    t_y     = (TITLE_H - th_f(fTIT)) // 2
    draw.text((t_x, t_y), title, font=fTIT, fill=TXT_DIM)

    # ── Content ─────────────────────────────────────────────────────
    y = TITLE_H + 14

    # Name (large, gradient, shimmer sweep)
    draw_shimmer(draw, PAD_L, y, "Tredir Sewpaul", fNAME, shim_x,
                 stops=[ACCENT, ACCENT_S, ACCENT])
    y += 34

    # Tagline
    draw.text((PAD_L, y),
              "AI Engineer  ·  Full-Stack Developer  ·  Cloud Architect",
              font=fSM, fill=TXT_DIM)
    y += 18

    # Animated separator
    sep_y = y
    draw.line([(PAD_L, sep_y), (W - PAD_R, sep_y)], fill=BORDER_C)
    for dx in range(-22, 23):
        fade = max(0., 1. - abs(dx) / 22) ** 1.8
        nx   = anim_x + dx
        if PAD_L <= nx <= W - PAD_R:
            draw.point((nx, sep_y), fill=lerpc(BORDER_C, seg_c, fade))
    y += 14

    # Info rows — clean labeled layout, readable by everyone
    draw_info_row(draw, y, "Role",
                  "AI Engineering Intern  ·  UWC School of Pharmacy")
    y += 18

    draw_info_row(draw, y, "Education",
                  "Samsung Future Innovation Lab  ·  BSc Computer Science")
    y += 18

    draw_info_row(draw, y, "Email",
                  "tredirs@gmail.com (Personal)  ·  tsewpaul@uwc.ac.za (Work)")
    y += 18

    draw_info_row(draw, y, "Web",    "www.iamtredir.com",
                            "GitHub", "github.com/DrVanHelsing")
    y += 18

    draw_info_row(draw, y, "Phone",  "067-408-2819",
                            "LinkedIn", "linkedin.com/in/tredir-sewpaul")

    return img

# ══════════════════════════════════════════════════════════════════
#  MAIN
# ══════════════════════════════════════════════════════════════════

def main():
    print(f"\n  mono font : {_md_path}")
    print(f"  name font : {_nm_path}\n")
    print(f"Generating {FRAMES} frames  ({W}×{H}  ·  {FRAMES * FRAME_MS / 1000:.2f}s loop) …")

    frames = []
    for i in range(FRAMES):
        frames.append(make_frame(i))
        if (i + 1) % 12 == 0 or i == 0:
            print(f"  {i + 1}/{FRAMES}")

    # Build composite to derive the best global palette
    print("Building composite palette …")
    COLS = 4
    ROWS = math.ceil(FRAMES / COLS)
    comp = Image.new("RGB", (W * COLS, H * ROWS), BG)
    for i, f in enumerate(frames):
        comp.paste(f, ((i % COLS) * W, (i // COLS) * H))
    pal_img = comp.quantize(colors=256, method=Image.Quantize.MEDIANCUT)

    # Re-quantise every frame with that palette — NO dithering keeps text crisp
    print("Quantising frames (no dither) …")
    frames_p = [
        f.quantize(palette=pal_img, dither=Image.Dither.NONE)
        for f in frames
    ]

    out = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "email_signature.gif")

    frames_p[0].save(
        out,
        save_all      = True,
        append_images = frames_p[1:],
        loop          = 0,
        duration      = FRAME_MS,
        optimize      = True,
        disposal      = 2,
    )

    print(f"\nSaved  →  {out}")
    print(f"Size   :  {os.path.getsize(out) / 1024:.1f} KB  "
          f"·  {W}×{H} px  ·  {FRAMES} frames  ·  {FRAME_MS} ms/frame")


if __name__ == "__main__":
    main()
