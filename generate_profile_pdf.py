#!/usr/bin/env python3
"""
generate_profile_pdf.py
Generates a VS Code Dark+-themed developer profile PDF from TredirSewpaul_Profile.md.
Engine: xhtml2pdf + reportlab â€” pure Python, no GTK required on Windows.
"""

import os
import io
import base64
import re
import math

import markdown
import qrcode
from PIL import Image, ImageDraw, ImageFont
from xhtml2pdf import pisa

# â”€â”€ Paths â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MD_FILE  = os.path.join(BASE_DIR, "TredirSewpaul_Profile.md")
PDF_FILE = os.path.join(BASE_DIR, "TredirSewpaul_Profile.pdf")
QR_LINK  = "https://www.iamtredir.com"

# â”€â”€ Contact data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
CONTACTS = [
    ("email",     "tredirs@gmail.com",              "mailto:tredirs@gmail.com"),
    ("phone",     "067-408-2819",                    None),
    ("portfolio", "www.iamtredir.com",               "https://www.iamtredir.com"),
    ("linkedin",  "linkedin.com/in/tredir-sewpaul",  "https://www.linkedin.com/in/tredir-sewpaul"),
    ("github",    "github.com/DrVanHelsing",         "https://github.com/DrVanHelsing"),
]

# â”€â”€ QR code â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def make_qr_b64(url: str) -> str:
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=6,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#0070c1", back_color="#ffffff")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode()

# â”€â”€ Contact block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def build_contact_block() -> str:
    rows = []
    for key, val, link in CONTACTS:
        v = f'<a href="{link}">{val}</a>' if link else val
        rows.append(
            f'<tr>'
            f'<td class="ck">{key}</td>'
            f'<td class="cs">=&gt;</td>'
            f'<td class="cv">{v}</td>'
            f'</tr>'
        )
    return '<table class="ctbl">' + "".join(rows) + "</table>"

# â”€â”€ Markdown to HTML â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
# -- Diagram rendering (Pillow) ------------------------------------------------

def _hex_rgb(c):
    c = c.lstrip('#')
    return tuple(int(c[i:i+2], 16) for i in (0, 2, 4))

def _try_font(size):
    for path in [
        r'C:\Windows\Fonts\consola.ttf',
        r'C:\Windows\Fonts\cour.ttf',
        r'C:\Windows\Fonts\arial.ttf',
    ]:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            pass
    return ImageFont.load_default()

def _arrowhead(draw, ax, ay, angle, size, color):
    p1 = (ax - size * math.cos(angle - 0.38), ay - size * math.sin(angle - 0.38))
    p2 = (ax - size * math.cos(angle + 0.38), ay - size * math.sin(angle + 0.38))
    draw.polygon(
        [(int(ax), int(ay)), (int(p1[0]), int(p1[1])), (int(p2[0]), int(p2[1]))],
        fill=color,
    )

def _draw_arrow(draw, x1, y1, x2, y2, color, lw=2, bidir=False):
    draw.line([(x1, y1), (x2, y2)], fill=color, width=lw)
    fwd = math.atan2(y2 - y1, x2 - x1)
    _arrowhead(draw, x2, y2, fwd, 9, color)
    if bidir:
        _arrowhead(draw, x1, y1, fwd + math.pi, 9, color)

def _text_block(draw, cx, cy, text, font, color, line_h):
    lines = text.split('\n')
    total = len(lines) * line_h
    for i, line in enumerate(lines):
        bb = draw.textbbox((0, 0), line, font=font)
        tw = bb[2] - bb[0]
        draw.text((cx - tw // 2, cy - total // 2 + i * line_h), line, fill=color, font=font)

def render_diagram_png(spec):
    """Render a diagram spec to a base64-encoded PNG (6x supersampled for sharpness)."""
    S = 6
    W, H = spec['width'], spec['height']
    img = Image.new('RGB', (W * S, H * S), _hex_rgb('#ffffff'))
    d   = ImageDraw.Draw(img)
    fn  = _try_font(8 * S)
    fns = _try_font(7 * S)
    lh  = 12 * S

    def sc(v): return v * S

    for g in spec.get('groups', []):
        gx, gy, gw, gh = sc(g['x']), sc(g['y']), sc(g['w']), sc(g['h'])
        d.rectangle([gx, gy, gx + gw, gy + gh],
                    fill=_hex_rgb(g.get('fill', '#eef4fb')),
                    outline=_hex_rgb(g.get('border', '#267f99')), width=S)
        bb = d.textbbox((0, 0), g['label'], font=fns)
        tw = bb[2] - bb[0]
        d.text((gx + (gw - tw) // 2, gy + sc(4)),
               g['label'], fill=_hex_rgb('#267f99'), font=fns)

    nmap = {}
    for n in spec['nodes']:
        nx, ny, nw, nh = sc(n['x']), sc(n['y']), sc(n['w']), sc(n['h'])
        cx, cy = nx + nw // 2, ny + nh // 2
        nmap[n['id']] = (nx, ny, nw, nh, cx, cy)
        d.rectangle([nx, ny, nx + nw, ny + nh],
                    fill=_hex_rgb(n.get('fill', '#f8fbff')),
                    outline=_hex_rgb(n.get('border', '#0070c1')), width=S)
        _text_block(d, cx, cy, n['label'], fn, _hex_rgb('#1e1e1e'), lh)

    for e in spec.get('edges', []):
        x1, y1, w1, h1, cx1, cy1 = nmap[e['from']]
        x2, y2, w2, h2, cx2, cy2 = nmap[e['to']]
        if abs(cx2 - cx1) >= abs(cy2 - cy1):
            if cx2 > cx1:  px1, py1, px2, py2 = x1 + w1, cy1, x2,      cy2
            else:           px1, py1, px2, py2 = x1,      cy1, x2 + w2, cy2
        else:
            if cy2 > cy1:  px1, py1, px2, py2 = cx1, y1 + h1, cx2, y2
            else:           px1, py1, px2, py2 = cx1, y1,      cx2, y2 + h2
        ec = _hex_rgb(e.get('color', '#795e26'))
        _draw_arrow(d, px1, py1, px2, py2, ec, lw=S + 1, bidir=e.get('bidir', False))
        lbl = e.get('label', '')
        if lbl:
            mx, my = (px1 + px2) // 2, (py1 + py2) // 2
            bb = d.textbbox((0, 0), lbl, font=fns)
            tw, th = bb[2] - bb[0], bb[3] - bb[1]
            pad = sc(3)
            d.rectangle([mx - tw // 2 - pad, my - th // 2 - pad,
                         mx + tw // 2 + pad, my + th // 2 + pad],
                        fill=_hex_rgb('#ffffff'))
            d.text((mx - tw // 2, my - th // 2), lbl,
                   fill=_hex_rgb('#008000'), font=fns)

    img = img.resize((W, H), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    return base64.b64encode(buf.getvalue()).decode()


DIAGRAM_CALLCENTREAI = {
    'width': 900, 'height': 414,
    'groups': [
        {'label': 'Clients',          'x': 18,  'y': 36, 'w': 252, 'h': 360,
         'fill': '#eef4fb', 'border': '#267f99'},
        {'label': 'Backend (.NET 8)', 'x': 291, 'y': 36, 'w': 594, 'h': 360,
         'fill': '#edfbee', 'border': '#267f99'},
    ],
    'nodes': [
        {'id': 'maui',    'label': 'MAUI App',          'x': 39,  'y':  99, 'w': 208, 'h': 72},
        {'id': 'react',   'label': 'React Dashboard',   'x': 39,  'y': 279, 'w': 208, 'h': 72},
        {'id': 'api',     'label': 'API Orchestrator\n(.NET 8)',
                          'x': 320, 'y': 153, 'w': 220, 'h': 99,
                          'fill': '#e6f0fa', 'border': '#0070c1'},
        {'id': 'sql',     'label': 'SQL DB\n(EF Core)',  'x': 576, 'y':  63, 'w': 198, 'h': 81},
        {'id': 'azure',   'label': 'Azure\nCognitive',  'x': 576, 'y': 195, 'w': 198, 'h': 81},
        {'id': 'signalr', 'label': 'SignalR Hubs',       'x': 576, 'y': 315, 'w': 198, 'h': 68},
    ],
    'edges': [
        {'from': 'maui',  'to': 'api',     'label': 'SignalR + REST', 'bidir': True},
        {'from': 'react', 'to': 'api',     'label': 'SignalR + REST', 'bidir': True},
        {'from': 'api',   'to': 'sql',     'label': 'EF Core',        'bidir': True},
        {'from': 'api',   'to': 'azure',   'label': 'Cognitive Svcs'},
        {'from': 'api',   'to': 'signalr', 'label': 'Hub events'},
    ],
}

DIAGRAM_STUDENTLINK = {
    'width': 900, 'height': 441,
    'groups': [],
    'nodes': [
        {'id': 'react', 'label': 'React Frontend\n(Port 3000)',
                        'x': 18, 'y': 158, 'w': 234, 'h': 90},
        {'id': 'api',   'label': 'ASP.NET Core\nWeb API\n(Port 7068)',
                        'x': 333, 'y': 126, 'w': 234, 'h': 135,
                        'fill': '#e6f0fa', 'border': '#0070c1'},
        {'id': 'azure', 'label': 'Azure Services\n\u2014 OpenAI\n\u2014 Doc Intelligence\n\u2014 SQL Server\n\u2014 Blob Storage',
                        'x': 657, 'y': 81, 'w': 225, 'h': 234,
                        'fill': '#eef4fb', 'border': '#267f99'},
        {'id': 'maui',  'label': '.NET MAUI App\n(Mobile/Desktop)',
                        'x': 333, 'y': 324, 'w': 234, 'h': 90},
    ],
    'edges': [
        {'from': 'react', 'to': 'api',   'label': 'HTTPS', 'bidir': True},
        {'from': 'api',   'to': 'azure', 'label': 'HTTPS', 'bidir': True},
        {'from': 'maui',  'to': 'api',   'label': 'HTTPS', 'bidir': True},
    ],
}

DIAGRAM_FINANCEBUDDY = {
    'width': 900, 'height': 360,
    'groups': [
        {'label': 'Client',            'x': 18,  'y': 36, 'w': 198, 'h': 288,
         'fill': '#eef4fb', 'border': '#267f99'},
        {'label': 'Backend (.NET 8)',  'x': 234, 'y': 36, 'w': 198, 'h': 288,
         'fill': '#edfbee', 'border': '#267f99'},
        {'label': 'Azure Services',   'x': 450, 'y': 36, 'w': 432, 'h': 288,
         'fill': '#fef9ee', 'border': '#ca8a00'},
    ],
    'nodes': [
        {'id': 'maui',    'label': '.NET MAUI 9\nFinanceBuddy',
                          'x': 36,  'y': 90, 'w': 162, 'h': 72},
        {'id': 'api',     'label': 'ASP.NET Core 8\nApiOrchestrator',
                          'x': 252, 'y': 90, 'w': 162, 'h': 72,
                          'fill': '#e6f0fa', 'border': '#0070c1'},
        {'id': 'db',      'label': 'SQL Server\n(EF Core)',
                          'x': 252, 'y': 216, 'w': 162, 'h': 72},
        {'id': 'openai',  'label': 'Azure OpenAI\n(GPT-4)',
                          'x': 468, 'y': 63,  'w': 180, 'h': 72},
        {'id': 'speech',  'label': 'Azure Speech\n(Voice Input)',
                          'x': 468, 'y': 162, 'w': 180, 'h': 72},
        {'id': 'transl',  'label': 'Azure Translator\n(Multi-language)',
                          'x': 468, 'y': 261, 'w': 180, 'h': 72},
    ],
    'edges': [
        {'from': 'maui',   'to': 'api',    'label': 'REST/HTTPS', 'bidir': True},
        {'from': 'api',    'to': 'db',     'label': 'EF Core',     'bidir': True},
        {'from': 'api',    'to': 'openai', 'label': 'SDK'},
        {'from': 'api',    'to': 'speech', 'label': 'SDK'},
        {'from': 'api',    'to': 'transl', 'label': 'SDK'},
    ],
}

DIAGRAM_UWCPORTAL = {
    'width': 900, 'height': 360,
    'groups': [
        {'label': 'Frontend (React 19)',  'x': 18,  'y': 36, 'w': 270, 'h': 288,
         'fill': '#eef4fb', 'border': '#267f99'},
        {'label': 'Backend (Firebase)',   'x': 306, 'y': 36, 'w': 576, 'h': 288,
         'fill': '#edfbee', 'border': '#267f99'},
    ],
    'nodes': [
        {'id': 'react',   'label': 'React 19 SPA\n(Vite · Vercel)',
                          'x': 36,  'y': 90, 'w': 234, 'h': 72},
        {'id': 'roles',   'label': '6 Role Views\n(Student/Supervisor/\nCoord/Admin/Ext/Exam)',
                          'x': 36,  'y': 216, 'w': 234, 'h': 72},
        {'id': 'auth',    'label': 'Firebase Auth\n(Email/Password)',
                          'x': 324, 'y': 63,  'w': 198, 'h': 72},
        {'id': 'db',      'label': 'Cloud Firestore\n(NoSQL · Realtime)',
                          'x': 324, 'y': 189, 'w': 198, 'h': 72},
        {'id': 'email',   'label': 'EmailJS\n(11 triggers)',
                          'x': 558, 'y': 63,  'w': 198, 'h': 72},
        {'id': 'vercel',  'label': 'Vercel\nAnalytics + Deploy',
                          'x': 558, 'y': 189, 'w': 198, 'h': 72},
    ],
    'edges': [
        {'from': 'react',  'to': 'auth',   'label': 'sign in/out', 'bidir': True},
        {'from': 'react',  'to': 'db',     'label': 'realtime',    'bidir': True},
        {'from': 'react',  'to': 'email',  'label': 'triggers'},
        {'from': 'react',  'to': 'vercel', 'label': 'deploy'},
        {'from': 'roles',  'to': 'react',  'label': 'routes',      'bidir': True},
    ],
}


def replace_arch_diagrams(body: str) -> str:
    """Replace ASCII architecture <pre><code> blocks with rendered PNG images."""
    def _img_tag(spec):
        b64 = render_diagram_png(spec)
        return (
            f'<div class="diagram-wrap">'
            f'<img src="data:image/png;base64,{b64}" class="diagram-img"/>'
            f'</div>'
        )

    pattern = re.compile(
        r'(<p><strong>Architecture:</strong></p>\s*)<pre><code>(.*?)</code></pre>',
        re.DOTALL,
    )

    def replacer(m):
        content = m.group(2)
        if any(k in content for k in ('SignalR', 'MAUI App', 'API Orchestrator')):
            return m.group(1) + _img_tag(DIAGRAM_CALLCENTREAI)
        if any(k in content for k in ('React Frontend', 'ASP.NET Core', 'Port 3000')):
            return m.group(1) + _img_tag(DIAGRAM_STUDENTLINK)
        if any(k in content for k in ('MoneyMentor', 'FinanceBuddy', 'ApiOrchestrator')):
            return m.group(1) + _img_tag(DIAGRAM_FINANCEBUDDY)
        if any(k in content for k in ('Firebase', 'Firestore', 'UWC Portal')):
            return m.group(1) + _img_tag(DIAGRAM_UWCPORTAL)
        return m.group(0)

    return pattern.sub(replacer, body)


def process_markdown(path: str) -> str:
    with open(path, "r", encoding="utf-8") as f:
        raw = f.read()

    body = markdown.markdown(raw, extensions=["extra", "tables", "fenced_code"])

    # 1. Replace first <table> (the contact table) with the styled key => value block
    body = re.sub(
        r"<table>.*?</table>",
        build_contact_block(),
        body,
        count=1,
        flags=re.DOTALL,
    )

    # 2. Add "// " code-comment prefix to all section headings (h2)
    body = re.sub(
        r"<h2>(.*?)</h2>",
        r'<h2><span class="cmt-pfx">// </span>\1</h2>',
        body,
    )

    # 3. Style the subtitle line (first <p><strong> after <h1>) as parameter blue
    body = re.sub(
        r'(<h1>.*?</h1>\s*)<p><strong>(.*?)</strong></p>',
        r'\1<p class="subtitle"><strong>\2</strong></p>',
        body,
        count=1,
        flags=re.DOTALL,
    )

    # 4. Inject QR code block in place of the portfolio scan paragraph
    qr_b64 = make_qr_b64(QR_LINK)
    qr_block = (
        f'<div class="qr-wrap">'
        f'<img src="data:image/png;base64,{qr_b64}" class="qr-img" alt="Portfolio QR Code"/>'
        f'<p class="qr-url"><a href="{QR_LINK}">{QR_LINK}</a></p>'
        f'</div>'
    )
    body = re.sub(
        r"<p>Scan the QR code.*?</p>",
        (
            f'<p>Scan the QR code or visit '
            f'<a href="{QR_LINK}">{QR_LINK}</a> '
            f'to explore the full portfolio.</p>\n{qr_block}'
        ),
        body,
        count=1,
        flags=re.DOTALL,
    )

    # 5. Replace ASCII architecture diagrams with rendered PNG images
    body = replace_arch_diagrams(body)

    return body

# â”€â”€ CSS â€” VS Code Dark+ IDE theme â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
CSS = """
@page {
    size: A4;
    margin: 12mm 14mm 14mm 14mm;
}

* {
    box-sizing: border-box;
}

body {
    font-family: 'Courier New', Courier, monospace;
    font-size: 8.5pt;
    line-height: 1.65;
    color: #1e1e1e;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
}

/* â”€â”€ Name â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
h1 {
    font-size: 22pt;
    font-weight: bold;
    color: #1e1e1e;
    margin: 0 0 4pt 0;
    padding-bottom: 5pt;
    border-bottom: 2pt solid #0070c1;
}

/* â”€â”€ Subtitle (descriptor line below name) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
p.subtitle strong {
    color: #001080;
    font-size: 9.5pt;
    font-weight: normal;
}

/* â”€â”€ Section headings â€” styled as IDE code comments â”€â”€â”€â”€â”€â”€ */
h2 {
    font-size: 9.5pt;
    font-weight: bold;
    color: #008000;
    background-color: #f3f3f3;
    border-left: 3pt solid #008000;
    padding: 4pt 8pt;
    margin: 16pt 0 5pt 0;
    page-break-after: avoid;
}

.cmt-pfx {
    color: #008000;
}

/* â”€â”€ Job/project title â€” styled as function identifier â”€â”€â”€ */
h3 {
    font-size: 9.5pt;
    font-weight: bold;
    color: #795e26;
    margin: 11pt 0 1pt 0;
    page-break-after: avoid;
}

/* â”€â”€ Employer/institution â€” styled as type/class name â”€â”€â”€â”€ */
h4 {
    font-size: 8.5pt;
    color: #267f99;
    font-weight: normal;
    margin: 0 0 4pt 0;
}

p {
    margin: 2pt 0 5pt 0;
    color: #1e1e1e;
}

a {
    color: #0070c1;
    text-decoration: none;
}

/* italic â€” styled as VS Code parameter/variable blue */
em {
    color: #001080;
    font-style: normal;
}

/* bold â€” styled as VS Code identifier yellow */
strong {
    color: #795e26;
    font-weight: bold;
}

hr {
    border: none;
    border-top: 1pt solid #e5e5e5;
    margin: 8pt 0;
}

/* â”€â”€ Lists â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
ul {
    margin: 3pt 0 6pt 0;
    padding-left: 14pt;
    list-style-type: square;
    color: #1e1e1e;
}

ol {
    margin: 3pt 0 6pt 0;
    padding-left: 14pt;
    color: #1e1e1e;
}

li {
    margin-bottom: 2pt;
    line-height: 1.55;
    color: #1e1e1e;
}

/* â”€â”€ Contact table (key => value layout) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
table.ctbl {
    width: auto;
    border-collapse: collapse;
    margin: 4pt 0 10pt 0;
    font-size: 8.5pt;
}

table.ctbl td {
    padding: 2pt 5pt;
    border: none;
    background: transparent;
    vertical-align: middle;
}

.ck {
    color: #001080;
    font-weight: bold;
    width: 58pt;
}

.cs {
    color: #0000ff;
    width: 18pt;
    text-align: center;
}

.cv {
    color: #a31515;
}

.cv a {
    color: #0070c1;
}

/* â”€â”€ General tables (awards etc.) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 5pt 0 10pt 0;
    font-size: 8.5pt;
}

th {
    background-color: #f3f3f3;
    color: #0070c1;
    font-weight: bold;
    padding: 4pt 8pt;
    text-align: left;
    border: 1pt solid #cecece;
}

td {
    padding: 3pt 8pt;
    border: 1pt solid #e5e5e5;
    color: #1e1e1e;
    background-color: #ffffff;
    vertical-align: top;
}

/* â”€â”€ Code blocks â€” IDE style with accent left border â”€â”€â”€â”€â”€â”€ */
pre {
    background-color: #f5f5f5;
    border: 1pt solid #e5e5e5;
    border-left: 3pt solid #0070c1;
    padding: 7pt 10pt;
    font-size: 7.5pt;
    font-family: 'Courier New', Courier, monospace;
    color: #001080;
    margin: 5pt 0 8pt 0;
    page-break-inside: avoid;
}

code {
    font-family: 'Courier New', Courier, monospace;
    font-size: 8pt;
    color: #a31515;
    background-color: #f3f3f3;
    padding: 0 3pt;
}

pre code {
    background: transparent;
    color: #001080;
    padding: 0;
}

/* â”€â”€ Blockquote â€” info panel style â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
blockquote {
    border-left: 3pt solid #0070c1;
    margin: 5pt 0;
    padding: 4pt 10pt;
    color: #008000;
    background-color: #f3f3f3;
}

/* â”€â”€ QR code block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
.qr-wrap {
    text-align: center;
    width: 108pt;
    padding: 8pt;
    background-color: #f3f3f3;
    border: 1pt solid #e5e5e5;
    margin: 8pt auto;
}

.qr-img {
    width: 84pt;
    height: 84pt;
}

.qr-url {
    font-size: 7pt;
    color: #0070c1;
    margin: 3pt 0 0 0;
    word-break: break-all;
}

/* -- Architecture diagram images ------------------------------------------ */
.diagram-wrap {
    margin: 6pt 0 10pt 0;
    page-break-inside: avoid;
}

.diagram-img {
    width: 490pt;
}
"""

# â”€â”€ Build full HTML document â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def build_html(body: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<style>
{CSS}
</style>
</head>
<body>
{body}
</body>
</html>"""

# â”€â”€ Convert HTML to PDF â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def html_to_pdf(html: str, out_path: str):
    with open(out_path, "wb") as f:
        result = pisa.CreatePDF(io.StringIO(html), dest=f, encoding="utf-8")
    if result.err:
        print(f"[!] xhtml2pdf reported {result.err} error(s) â€” check output.")
    else:
        print(f"[+] PDF written: {out_path}")

# â”€â”€ Entry point â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
def main():
    print("[*] Processing markdown ...")
    body = process_markdown(MD_FILE)

    print("[*] Building HTML document ...")
    full_html = build_html(body)

    dbg = PDF_FILE.replace(".pdf", "_debug.html")
    with open(dbg, "w", encoding="utf-8") as f:
        f.write(full_html)
    print(f"[*] Debug HTML: {dbg}")

    print("[*] Converting to PDF ...")
    html_to_pdf(full_html, PDF_FILE)
    print(f"[>] Done: {PDF_FILE}")


if __name__ == "__main__":
    main()
