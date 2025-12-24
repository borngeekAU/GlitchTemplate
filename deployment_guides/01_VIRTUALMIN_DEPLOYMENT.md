# RUKSPIN ARCHIVE V2.1 - VIRTUALMIN DEPLOYMENT GUIDE

## Complete Technical Instructions for Debian Server Deployment

This guide provides step-by-step instructions for deploying the Rukspin Archive / GLITCH_STITCH landing page on a Debian server using Virtualmin as the administration console.

---

## TABLE OF CONTENTS

1. [Prerequisites](#1-prerequisites)
2. [Virtualmin Setup Verification](#2-virtualmin-setup-verification)
3. [Creating a Virtual Server](#3-creating-a-virtual-server)
4. [Uploading Project Files](#4-uploading-project-files)
5. [Configuring the Web Server](#5-configuring-the-web-server)
6. [SSL Certificate Setup](#6-ssl-certificate-setup)
7. [DNS Configuration](#7-dns-configuration)
8. [Testing the Deployment](#8-testing-the-deployment)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. PREREQUISITES

Before beginning deployment, ensure you have:

### Server Requirements
- Debian 10 (Buster), 11 (Bullseye), or 12 (Bookworm)
- Minimum 1GB RAM (2GB recommended)
- Minimum 10GB disk space
- Root or sudo access
- Static IP address

### Software Requirements
- Virtualmin GPL or Pro installed and configured
- Apache or Nginx web server (Apache recommended for Virtualmin)
- PHP (optional, not required for this static site)

### Domain Requirements
- A registered domain name
- Access to DNS management (either through registrar or Virtualmin)

### Files Required
- `rukspin_archive_v2.1.tar.gz` (the complete project archive)

---

## 2. VIRTUALMIN SETUP VERIFICATION

### Access Virtualmin
1. Open your browser and navigate to:
   ```
   https://your-server-ip:10000
   ```
   or
   ```
   https://your-domain.com:10000
   ```

2. Log in with your root credentials or Virtualmin admin account

### Verify Installation
1. In Virtualmin, go to **System Information**
2. Confirm the following services are running:
   - Apache/Nginx: **Running**
   - BIND DNS Server: **Running** (if managing DNS locally)
   - Postfix Mail Server: **Running** (optional)

### Check Available Features
1. Go to **System Settings** → **Features and Plugins**
2. Ensure these are enabled:
   - Apache website
   - SSL website
   - Log file rotation
   - AWStats reporting (optional)

---

## 3. CREATING A VIRTUAL SERVER

### Step 3.1: Create New Virtual Server
1. In Virtualmin, click **Create Virtual Server** (top-left dropdown)
2. Fill in the following:

   | Field | Value |
   |-------|-------|
   | Domain name | `yourdomain.com` (or subdomain like `archive.yourdomain.com`) |
   | Description | Rukspin Archive V2.1 - GLITCH_STITCH |
   | Administration password | [Create strong password] |
   | Administration username | [Auto-generated or custom] |

3. Under **Enabled Features**, ensure these are checked:
   - ✅ Apache website
   - ✅ Apache SSL website
   - ✅ Log file rotation
   - ✅ AWStats reporting (optional)

4. Click **Create Server**

### Step 3.2: Note the Document Root
After creation, note the document root path. Typically:
```
/home/[username]/public_html/
```

Example:
```
/home/rukspin/public_html/
```

---

## 4. UPLOADING PROJECT FILES

### Method A: Using Virtualmin File Manager (Recommended for Beginners)

1. In Virtualmin, select your virtual server from the dropdown
2. Go to **Edit Files** (under the domain menu)
3. Navigate to `public_html/`
4. Delete any default files (index.html, etc.)
5. Click **Upload** and select the extracted website files:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `images/` folder (if any)
   - `fonts/` folder (if any)

### Method B: Using SFTP/SCP (Recommended for Efficiency)

1. Connect via SFTP using credentials:
   ```
   Host: your-server-ip
   Port: 22
   Username: [virtual server username]
   Password: [administration password]
   ```

2. Navigate to `/home/[username]/public_html/`

3. Upload the website folder contents:
   ```bash
   # From your local machine
   scp -r website/* username@your-server:/home/username/public_html/
   ```

### Method C: Using SSH and wget/tar

1. SSH into your server:
   ```bash
   ssh username@your-server-ip
   ```

2. Navigate to public_html:
   ```bash
   cd ~/public_html
   ```

3. If you've uploaded the tar.gz archive:
   ```bash
   tar -xzf rukspin_archive_v2.1.tar.gz
   mv rukspin_archive_v2.1/website/* .
   rm -rf rukspin_archive_v2.1.tar.gz rukspin_archive_v2.1/
   ```

### Verify File Structure
After upload, your `public_html/` should contain:
```
public_html/
├── index.html
├── css/
│   ├── main.css
│   └── glitch.css
├── js/
│   ├── main.js
│   └── glitch.js
├── images/
│   └── (your images)
└── fonts/
    └── (if any local fonts)
```

### Set Correct Permissions
```bash
# Set directory permissions
find ~/public_html -type d -exec chmod 755 {} \;

# Set file permissions
find ~/public_html -type f -exec chmod 644 {} \;
```

Or via Virtualmin:
1. Go to **Edit Files**
2. Select all files/folders
3. Click **Info** → Set permissions to 644 (files) and 755 (directories)

---

## 5. CONFIGURING THE WEB SERVER

### Apache Configuration (Default)

Virtualmin automatically creates Apache configuration. To customize:

1. Go to **Services** → **Configure Website**
2. Or go to **Web Configuration** → **Edit Directives**

### Recommended .htaccess Configuration

Create or edit `/home/[username]/public_html/.htaccess`:

```apache
# Enable Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
    AddOutputFilterByType DEFLATE application/javascript application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType text/html "access plus 1 day"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Prevent Directory Listing
Options -Indexes

# Custom Error Pages (optional)
ErrorDocument 404 /index.html
```

### Enable Required Apache Modules

Via SSH (as root):
```bash
a2enmod deflate
a2enmod expires
a2enmod headers
a2enmod rewrite
systemctl restart apache2
```

Or via Virtualmin:
1. Go to **Webmin** → **Servers** → **Apache Webserver**
2. Click **Global Configuration** → **Configure Apache Modules**
3. Enable: deflate, expires, headers, rewrite
4. Click **Apply Changes**

---

## 6. SSL CERTIFICATE SETUP

### Option A: Let's Encrypt (Free - Recommended)

1. In Virtualmin, select your virtual server
2. Go to **Server Configuration** → **SSL Certificate**
3. Click **Let's Encrypt** tab
4. Ensure domain names are correct
5. Click **Request Certificate**
6. Once issued, go to **SSL Certificate** → **Current Certificate**
7. Click **Copy to Webmin** and **Copy to Postfix** if prompted

### Option B: Manual SSL Certificate

If you have a certificate from another provider:

1. Go to **Server Configuration** → **SSL Certificate**
2. Click **Update Certificate and Key**
3. Paste your:
   - Certificate (PEM format)
   - Private Key
   - CA Certificate (intermediate)
4. Click **Install Now**

### Force HTTPS Redirect

Add to `.htaccess`:
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

Or via Virtualmin:
1. Go to **Server Configuration** → **Website Options**
2. Set **Redirect all requests to SSL site** to **Yes**
3. Click **Save**

---

## 7. DNS CONFIGURATION

### If Using Virtualmin's BIND DNS

1. Go to **Server Configuration** → **DNS Records**
2. Verify these records exist:

   | Type | Name | Value |
   |------|------|-------|
   | A | @ | [Your Server IP] |
   | A | www | [Your Server IP] |
   | AAAA | @ | [IPv6 if available] |

3. Click **Apply Zone**

### If Using External DNS (Cloudflare, etc.)

Configure at your DNS provider:

```
Type: A
Name: @ (or subdomain)
Value: [Your Server IP]
TTL: Auto or 3600

Type: A
Name: www
Value: [Your Server IP]
TTL: Auto or 3600
```

### DNS Propagation

- DNS changes can take 1-48 hours to propagate globally
- Check propagation: https://www.whatsmydns.net/

---

## 8. TESTING THE DEPLOYMENT

### Basic Tests

1. **HTTP Access Test**
   ```bash
   curl -I http://yourdomain.com
   ```
   Expected: 301 redirect to HTTPS (if configured)

2. **HTTPS Access Test**
   ```bash
   curl -I https://yourdomain.com
   ```
   Expected: 200 OK

3. **Browser Test**
   - Open `https://yourdomain.com` in browser
   - Verify all visual elements load
   - Check browser console for errors (F12)
   - Test on mobile device

### Performance Tests

1. **Google PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Enter your URL and analyze

2. **GTmetrix**
   - https://gtmetrix.com/
   - Test load time and optimization

### SSL Verification

1. **SSL Labs Test**
   - https://www.ssllabs.com/ssltest/
   - Enter your domain
   - Aim for A or A+ rating

---

## 9. TROUBLESHOOTING

### Common Issues

#### Site Not Loading
```bash
# Check Apache status
systemctl status apache2

# Check Apache error log
tail -f /var/log/apache2/error.log

# Check virtual host error log
tail -f /home/[username]/logs/error_log
```

#### Permission Denied Errors
```bash
# Fix ownership
chown -R [username]:[username] /home/[username]/public_html/

# Fix permissions
chmod 755 /home/[username]/public_html/
find /home/[username]/public_html/ -type f -exec chmod 644 {} \;
find /home/[username]/public_html/ -type d -exec chmod 755 {} \;
```

#### SSL Certificate Issues
```bash
# Test SSL
openssl s_client -connect yourdomain.com:443

# Renew Let's Encrypt manually
certbot renew --dry-run
```

#### CSS/JS Not Loading
- Check file paths in index.html (should be relative: `css/main.css`)
- Verify files exist in correct locations
- Check browser console for 404 errors
- Clear browser cache

#### Glitch Effects Not Working
- Ensure JavaScript is enabled in browser
- Check console for JS errors
- Verify all JS files uploaded correctly

### Getting Help

- Virtualmin Forums: https://www.virtualmin.com/forums/
- Virtualmin Documentation: https://www.virtualmin.com/documentation/
- Debian Wiki: https://wiki.debian.org/

---

## QUICK REFERENCE COMMANDS

```bash
# Restart Apache
systemctl restart apache2

# Restart Virtualmin
systemctl restart webmin

# Check disk space
df -h

# Check memory
free -m

# View Apache access log
tail -f /home/[username]/logs/access_log

# Test Apache configuration
apachectl configtest
```

---

**Document Version:** 2.1
**Last Updated:** December 2025
**Author:** RUKSPIN ARCHIVE
