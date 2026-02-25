# 🛡️ Hide Distracting Items (Temu Killer)

A privacy-preserving Chrome extension that lets you permanently hide annoying ads, pop-ups, and distracting elements on any website with a single click. Inspired by Apple Safari's "Hide Distracting Items" feature.

**No servers. No tracking. No network requests. 100% local.**

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue?logo=googlechrome)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **One-Click Hiding** | Hover to highlight, click to hide any element |
| **Smart Ad Detection** | Automatically detects and removes entire ad containers |
| **Dual Highlighting** | Blue outline shows hovered element, red dashed outline shows container to be removed |
| **Per-Site Persistence** | Hidden elements stay hidden on future visits |
| **Two Themes** | Clean default theme or tactical "Temu Killer" sniper theme |
| **Undo Support** | Easily restore accidentally hidden elements |
| **Privacy First** | All data stored locally, zero network requests |

---

## 🚀 Quick Start Installation

### Step 1: Download the Extension

```bash
git clone https://github.com/yourusername/anti-temu.git
```

Or download and extract the ZIP file.

### Step 2: Load in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `Anti Temu` folder containing `manifest.json`
5. The extension icon will appear in your toolbar

### Step 3: Pin the Extension (Recommended)

1. Click the puzzle piece icon in Chrome toolbar
2. Find "Hide Distracting Items"
3. Click the pin icon to keep it visible

---

## 📖 How to Use

### Default Theme
1. Click the extension icon
2. Click **"Select elements to hide"**
3. Hover over any element to highlight it (blue = element, red = container)
4. Click to hide the entire ad container
5. Element is permanently hidden on this page

### Temu Killer Theme
1. Click the extension icon
2. Select **"Tactical Sniper"** from the theme dropdown
3. Click **"Engage Target"**
4. Hover to acquire targets with crosshair cursor
5. Click to eliminate ad containers
6. Click **"Disengage"** when done

### Managing Hidden Elements

| Action | Description |
|--------|-------------|
| **Undo / Pardon** | Restore the last hidden element |
| **Show All / Free All** | Restore all hidden elements on current site |
| **View hidden elements** | Expand list to see/manage individual items |

---

## 📁 Project Structure

```
Anti Temu/
├── manifest.json           # Extension configuration
├── README.md               # This file
├── background/
│   └── service-worker.js   # Storage & message handling
├── content/
│   ├── auto-hide.js        # Auto-applies hiding rules on page load
│   ├── auto-hide.css       # Hiding animation styles
│   └── picker.js           # Element selection UI (default theme)
├── popup/
│   ├── popup.html          # Extension popup UI
│   ├── popup.css           # Popup styles (both themes)
│   └── popup.js            # Popup logic & theme switching
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## 🔧 Core Components

### Manifest ([manifest.json](manifest.json))

```json
{
  "manifest_version": 3,
  "name": "Hide Distracting Items",
  "version": "1.0.0",
  "permissions": ["storage", "activeTab", "scripting"],
  "host_permissions": ["<all_urls>"],
  "background": {
    "service_worker": "background/service-worker.js"
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content/auto-hide.js"],
    "css": ["content/auto-hide.css"],
    "run_at": "document_start"
  }]
}
```

### Service Worker ([background/service-worker.js](background/service-worker.js))

Handles all data persistence and message routing:

```javascript
// Message handlers for all extension actions
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'getHiddenSelectors':  // Fetch saved rules for a domain
    case 'hideElement':          // Save a new hiding rule
    case 'unhideElement':        // Remove a specific rule
    case 'clearDomain':          // Clear all rules for a domain
    case 'getStats':             // Get counts for popup display
    case 'undoLast':             // Restore last hidden element
  }
});
```

### Auto-Hide System ([content/auto-hide.js](content/auto-hide.js))

Runs at `document_start` to apply hiding rules before elements render:

```javascript
// Aggressive CSS hiding - leaves no trace
const css = selectors.map(sel => `${sel} { 
  display: none !important; 
  visibility: hidden !important;
  height: 0 !important;
  width: 0 !important;
  opacity: 0 !important;
  pointer-events: none !important;
}`).join('\n');
```

Key features:
- Injects CSS before DOM renders (no flash of hidden content)
- Watches for dynamically loaded elements via MutationObserver
- Multiple CSS properties ensure complete hiding

### Element Picker ([content/picker.js](content/picker.js))

The interactive selection interface:

```javascript
// Dual overlay system for clear visual feedback
const HIGHLIGHT_COLOR = 'rgba(0, 122, 255, 0.12)';      // Blue - hovered element
const CONTAINER_OUTLINE_COLOR = 'rgba(255, 59, 48, 0.7)'; // Red - container to remove

// Smart container detection
function findAdContainer(element) {
  // Walks up DOM tree to find outermost ad wrapper
  // Uses heuristics: class names, size ratios, ad-like attributes
}

function scoreAdLike(element) {
  // Scores elements based on ad indicators:
  // - Class/ID containing: ad, sponsor, promo, banner, etc.
  // - Data attributes for tracking
  // - Iframe sources
  // - Size and position characteristics
}
```

### Popup UI ([popup/popup.js](popup/popup.js))

Theme-aware popup controller:

```javascript
// Theme switching with state management
function applyTheme(theme, isActive = false) {
  if (theme === 'gunslinger') {
    selectBtn.innerHTML = isActive ? 'Disengage' : 'Engage Target';
    document.querySelector('header h1').innerHTML = 'Temu Killer';
  } else {
    selectBtn.innerHTML = isActive ? 'Stop selecting' : 'Select elements to hide';
  }
}
```

---

## 💾 Storage Schema

All data is stored in `chrome.storage.local`:

```javascript
{
  "hiddenElements": {
    "example.com": {
      "global": [],           // Site-wide rules (future feature)
      "paths": {
        "/": [                // Rules for homepage
          {
            "selector": "div.ad-container",
            "description": "Ad banner",
            "timestamp": 1706400000000,
            "pageUrl": "https://example.com/"
          }
        ],
        "/products": [...]    // Rules for /products page
      }
    }
  },
  "undoStack": {
    "example.com": [...]      // Recently hidden for undo support
  },
  "pickerTheme": "default"    // or "gunslinger"
}
```

---

## 🎨 Themes

### Default Theme
- Clean, minimal Apple-inspired design
- Blue/white color scheme
- Smooth blur/fade animations

### Tactical Sniper ("Temu Killer")
- Military-inspired dark theme
- Red accent colors
- "Engage Target" / "Disengage" terminology
- "Pardon" / "Free All" for undo actions

---

## 🔒 Privacy & Security

| Aspect | Implementation |
|--------|----------------|
| **Data Storage** | All rules stored locally via `chrome.storage.local` |
| **Network Requests** | Zero - extension makes no external calls |
| **Permissions** | Minimal: `storage`, `activeTab`, `scripting` |
| **Tracking** | None - no analytics, no telemetry |

---

## ⚠️ Known Limitations

1. **Cannot hide on Chrome internal pages** (`chrome://`, `chrome-extension://`)
2. **Some iframes** may have cross-origin restrictions
3. **Dynamically generated selectors** may not persist if site changes structure
4. **Extension must be reloaded** after code changes during development

---

## 🛠️ Development

### Making Changes

1. Edit the source files
2. Go to `chrome://extensions`
3. Click the refresh icon on the extension card
4. Reload the test page

### Testing Ad Detection

The picker includes debug logging. Open DevTools console to see:
- Element scoring calculations
- Container detection decisions
- Selector generation

### Adding New Themes

1. Add theme option in [popup/popup.html](popup/popup.html)
2. Add CSS rules in [popup/popup.css](popup/popup.css) with `.theme-yourtheme` class
3. Update `applyTheme()` function in [popup/popup.js](popup/popup.js)
4. Optionally create `picker-yourtheme.js` for custom picker behavior

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Extension not working | Reload extension at `chrome://extensions` |
| Elements reappearing | Check if site uses dynamic IDs (may need more specific selector) |
| Can't select element | Element may be in an iframe with restrictions |
| Popup shows wrong state | Close and reopen popup |
| Theme not applying | Refresh the page after changing theme |

---

## 📝 API Reference

### Message Actions

Send messages via `chrome.runtime.sendMessage()`:

| Action | Parameters | Returns |
|--------|------------|---------|
| `getHiddenSelectors` | `domain`, `pagePath` | `string[]` - CSS selectors |
| `hideElement` | `domain`, `selector`, `description`, `pagePath` | `{ success: boolean }` |
| `unhideElement` | `domain`, `selector`, `pagePath` | `{ success: boolean }` |
| `clearDomain` | `domain` | `{ success: boolean }` |
| `getStats` | `domain`, `pagePath` | `{ domainCount, totalSelectors, canUndo, items }` |
| `undoLast` | `domain` | `{ success: boolean }` |

---

## 📜 License

MIT License - feel free to use, modify, and distribute.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Made with ❤️ to fight annoying ads**
