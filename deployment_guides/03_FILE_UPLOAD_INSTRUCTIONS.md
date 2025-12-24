# RUKSPIN ARCHIVE V2.1 - FILE UPLOAD INSTRUCTIONS

## How to Upload This Package to Your Debian/Virtualmin Server

This guide provides multiple methods for uploading the Rukspin Archive package to your server.

---

## PACKAGE CONTENTS

When you extract `rukspin_archive_v2.1.tar.gz`, you'll find:

```
rukspin_archive_v2.1/
├── creative_assets/
│   ├── video_renders/
│   ├── audio_elements/
│   ├── text_content/
│   └── graphics/
├── planning_documents/
│   ├── content_outline.txt
│   └── platform_strategy.txt
├── legal/
│   └── LICENSE_README.txt
├── website/
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
├── deployment_guides/
│   ├── 01_VIRTUALMIN_DEPLOYMENT.md
│   ├── 02_CONTENT_ROLLOUT_GUIDE.md
│   └── 03_FILE_UPLOAD_INSTRUCTIONS.md
└── README.md
```

---

## METHOD 1: SFTP CLIENT (Recommended for Beginners)

### Step 1: Download an SFTP Client

Choose one of these free options:
- **FileZilla** (Windows/Mac/Linux): https://filezilla-project.org/
- **WinSCP** (Windows): https://winscp.net/
- **Cyberduck** (Mac/Windows): https://cyberduck.io/

### Step 2: Connect to Your Server

Open your SFTP client and enter:

| Field | Value |
|-------|-------|
| Host | Your server IP or domain |
| Port | 22 |
| Protocol | SFTP |
| Username | Your Virtualmin username |
| Password | Your Virtualmin password |

### Step 3: Navigate to Correct Directory

In the remote panel, navigate to:
```
/home/[your-username]/
```

### Step 4: Upload the Package

**Option A: Upload entire archive**
1. Upload `rukspin_archive_v2.1.tar.gz` to `/home/[username]/`
2. Extract via SSH (see Method 3)

**Option B: Upload extracted folders**
1. Navigate to `/home/[username]/public_html/`
2. Upload contents of `website/` folder here
3. Upload other folders to `/home/[username]/` for reference

### Step 5: Verify Upload

Check that files appear in the correct locations.

---

## METHOD 2: VIRTUALMIN FILE MANAGER

### Step 1: Access Virtualmin

1. Open browser: `https://your-server:10000`
2. Log in with your credentials
3. Select your virtual server from dropdown

### Step 2: Open File Manager

1. Click **Edit Files** in the left menu
2. Or go to **Webmin** → **Others** → **File Manager**

### Step 3: Navigate and Upload

1. Navigate to `/home/[username]/public_html/`
2. Click **Upload** button
3. Select files from the `website/` folder:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `images/` folder (if any)

### Step 4: Set Permissions

1. Select all uploaded files
2. Click **Info** or **Permissions**
3. Set:
   - Files: 644
   - Directories: 755

---

## METHOD 3: SSH/SCP COMMAND LINE

### Step 1: Upload Archive via SCP

From your local machine:

```bash
# Upload the tar.gz archive
scp rukspin_archive_v2.1.tar.gz username@your-server:/home/username/
```

### Step 2: Connect via SSH

```bash
ssh username@your-server
```

### Step 3: Extract Archive

```bash
# Navigate to home directory
cd ~

# Extract the archive
tar -xzf rukspin_archive_v2.1.tar.gz

# View contents
ls -la rukspin_archive_v2.1/
```

### Step 4: Deploy Website Files

```bash
# Clear existing public_html content (careful!)
rm -rf ~/public_html/*

# Copy website files
cp -r rukspin_archive_v2.1/website/* ~/public_html/

# Verify
ls -la ~/public_html/
```

### Step 5: Set Permissions

```bash
# Set correct ownership
chown -R $USER:$USER ~/public_html/

# Set directory permissions
find ~/public_html -type d -exec chmod 755 {} \;

# Set file permissions
find ~/public_html -type f -exec chmod 644 {} \;
```

### Step 6: Keep Reference Files

```bash
# Keep planning docs and guides accessible
mkdir -p ~/project_files
cp -r rukspin_archive_v2.1/planning_documents ~/project_files/
cp -r rukspin_archive_v2.1/deployment_guides ~/project_files/
cp -r rukspin_archive_v2.1/legal ~/project_files/
cp -r rukspin_archive_v2.1/creative_assets ~/project_files/
cp rukspin_archive_v2.1/README.md ~/project_files/
```

### Step 7: Clean Up

```bash
# Remove the archive and extracted folder
rm rukspin_archive_v2.1.tar.gz
rm -rf rukspin_archive_v2.1/
```

---

## METHOD 4: GIT CLONE (If Hosted on Git)

If you've pushed this project to a Git repository:

```bash
# SSH into server
ssh username@your-server

# Navigate to home
cd ~

# Clone repository
git clone https://github.com/yourusername/rukspin-archive.git

# Deploy website
cp -r rukspin-archive/website/* ~/public_html/

# Set permissions
find ~/public_html -type d -exec chmod 755 {} \;
find ~/public_html -type f -exec chmod 644 {} \;
```

---

## VERIFICATION CHECKLIST

After uploading, verify:

```bash
# Check file structure
ls -la ~/public_html/
# Should show: index.html, css/, js/, images/, fonts/

# Check index.html exists and has content
head ~/public_html/index.html

# Check CSS files
ls -la ~/public_html/css/
# Should show: main.css, glitch.css

# Check JS files
ls -la ~/public_html/js/
# Should show: main.js, glitch.js

# Check permissions
stat ~/public_html/index.html
# Should show: -rw-r--r-- (644)

stat ~/public_html/css/
# Should show: drwxr-xr-x (755)
```

---

## TESTING AFTER UPLOAD

### Local Test (from server)

```bash
# Test if Apache can read the file
curl -I http://localhost/
# Should return: HTTP/1.1 200 OK
```

### Remote Test (from browser)

1. Open `http://your-domain.com`
2. Check that page loads
3. Verify glitch effects are working
4. Check browser console for errors (F12)

### SSL Test (after certificate setup)

1. Open `https://your-domain.com`
2. Verify padlock icon appears
3. Check certificate details

---

## TROUBLESHOOTING

### "Permission Denied" Errors

```bash
# Fix ownership
sudo chown -R username:username ~/public_html/

# Fix permissions
sudo chmod -R 755 ~/public_html/
find ~/public_html -type f -exec chmod 644 {} \;
```

### "File Not Found" Errors

```bash
# Verify file exists
ls -la ~/public_html/index.html

# Check Apache document root
grep DocumentRoot /etc/apache2/sites-available/*
```

### CSS/JS Not Loading

1. Check file paths in index.html are relative
2. Verify files exist in correct locations
3. Check browser console for 404 errors
4. Clear browser cache

### Upload Interrupted

If upload fails midway:
1. Delete partial files
2. Re-upload fresh
3. Use `rsync` for resumable uploads:
   ```bash
   rsync -avz --progress rukspin_archive_v2.1/ username@server:/home/username/rukspin_archive_v2.1/
   ```

---

## QUICK REFERENCE

### Essential Commands

```bash
# Upload via SCP
scp -r local_folder/ user@server:/remote/path/

# Connect via SSH
ssh user@server

# Extract tar.gz
tar -xzf archive.tar.gz

# Copy files
cp -r source/ destination/

# Set permissions
chmod 644 file
chmod 755 directory

# Check disk space
df -h

# Check file sizes
du -sh folder/
```

### Important Paths

| Item | Path |
|------|------|
| Website files | `/home/[username]/public_html/` |
| Error logs | `/home/[username]/logs/error_log` |
| Access logs | `/home/[username]/logs/access_log` |
| Apache config | `/etc/apache2/sites-available/` |

---

**Document Version:** 2.1
**Last Updated:** December 2025
**Author:** RUKSPIN ARCHIVE
