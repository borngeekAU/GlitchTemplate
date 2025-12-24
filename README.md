# Media Kit Template

## Glitch/Analog Aesthetic Landing Page & Content Infrastructure

A complete, customizable media kit template for creators building a glitch/analog aesthetic brand.

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/media-kit-template.git
cd media-kit-template
```

### 2. Configure Your Brand

**Option A: Edit config.json and run setup**
```json
{
  "brand": {
    "name": "YOUR_BRAND_NAME",
    "tagline": "YOUR TAGLINE"
  },
  "social": {
    "handle": "@your_handle"
  },
  "contact": {
    "email": "you@example.com"
  }
}
```

Then run:
```bash
./setup.sh
```

**Option B: Manual Find & Replace**
Replace these placeholders in all files:
- `BRAND_NAME` → Your brand name
- `@your_handle` → Your social media handle
- `contact@example.com` → Your email

### 3. Deploy
Follow the guides in `deployment_guides/` for your hosting environment.

---

## PACKAGE STRUCTURE

```
media-kit-template/
│
├── website/                    # LANDING PAGE FILES
│   ├── index.html             # Main HTML file
│   ├── css/
│   │   ├── main.css           # Core styles
│   │   └── glitch.css         # Glitch effect styles
│   ├── js/
│   │   ├── main.js            # Core functionality
│   │   └── glitch.js          # Glitch effect scripts
│   ├── images/                # Image assets (add your own)
│   └── fonts/                 # Custom fonts (if needed)
│
├── creative_assets/            # CONTENT STORAGE
│   ├── video_renders/         # Video files
│   ├── audio_elements/        # Sound files
│   ├── text_content/          # Captions & copy
│   └── graphics/              # Images & graphics
│
├── planning_documents/         # STRATEGY & PLANNING
│   ├── content_outline.txt    # Content calendar & ideas
│   └── platform_strategy.txt  # Platform-specific guides
│
├── legal/                      # LEGAL & LICENSING
│   └── LICENSE_README.txt     # Usage rights & contact
│
├── deployment_guides/          # TECHNICAL DOCUMENTATION
│   ├── 01_VIRTUALMIN_DEPLOYMENT.md
│   ├── 02_CONTENT_ROLLOUT_GUIDE.md
│   └── 03_FILE_UPLOAD_INSTRUCTIONS.md
│
└── README.md                   # This file
```

---

## WEBSITE FEATURES

The landing page includes:

- **Glitch Text Effects** - Animated text with chromatic aberration
- **Scanline Overlay** - CRT/VHS aesthetic
- **Static Noise** - Subtle animated noise texture
- **VHS Tracking Lines** - Periodic tracking effect
- **Terminal Animation** - Typewriter-style intro sequence
- **Responsive Design** - Works on all devices
- **Interactive Elements** - Hover effects and notifications

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

## DEPLOYMENT REQUIREMENTS

### Server
- Debian 10, 11, or 12
- Virtualmin GPL or Pro
- Apache or Nginx
- SSL certificate (Let's Encrypt recommended)

### Domain
- Registered domain name
- DNS access

### No Backend Required
This is a static website - no database or server-side processing needed.

---

## CUSTOMIZATION

### Update Contact Information
Edit `website/index.html`:
- Line ~180: Email link
- Line ~200: Social media handles

### Update Platform Links
Edit `website/index.html`:
- Lines ~140-175: Platform link URLs

### Change Colors
Edit `website/css/main.css`:
- Lines 5-20: CSS custom properties (variables)

### Add Content
Place files in appropriate `creative_assets/` subdirectories following the README files in each folder.

---

## SUPPORT & CONTACT

For questions about this package:
- Review the deployment guides first
- Check Virtualmin documentation: https://www.virtualmin.com/documentation/

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 2.1 | Dec 2025 | Complete package with deployment guides |
| 2.0 | - | Initial structure |

---

## LICENSE

See `legal/LICENSE_README.txt` for content usage terms.

The website code (HTML, CSS, JS) is provided for use with this project.

---

**BRAND_NAME // RECOVERED DATA ARCHIVE**

*The archive is open.*
