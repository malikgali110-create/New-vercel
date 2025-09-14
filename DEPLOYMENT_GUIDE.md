# EMC Store - Deployment Guide for public_html

This guide will help you deploy your Next.js EMC Store application to a shared hosting environment using the public_html directory.

## Prerequisites

- Access to cPanel or FTP for your hosting provider
- Node.js application support on your hosting (or static export capability)
- Domain/subdomain configured to point to public_html

## Deployment Options

### Option 1: Static Export (Recommended for Shared Hosting)

#### Step 1: Configure for Static Export

1. Update `next.config.js` to enable static export:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

#### Step 2: Build and Export

```bash
npm run build
npm run export
```

#### Step 3: Upload Files

1. Navigate to the `out` folder created after export
2. Upload all contents of the `out` folder to your `public_html` directory
3. Ensure the following structure in public_html:
   ```
   public_html/
   ├── _next/
   ├── images/
   ├── index.html
   ├── 404.html
   └── other pages...
   ```

### Option 2: Node.js Deployment (If Supported)

#### Step 1: Prepare Production Build

```bash
npm run build
```

#### Step 2: Upload Project Files

1. Upload the entire project to your hosting directory
2. Install dependencies on the server:
   ```bash
   npm install --production
   ```

#### Step 3: Configure Server

1. Set up your hosting to run Node.js applications
2. Point the entry file to `server.js` or use `npm start`
3. Configure environment variables if needed

## File Structure After Deployment

```
public_html/
├── _next/
│   ├── static/
│   │   ├── chunks/
│   │   ├── css/
│   │   └── media/
├── images/
├── downloads/
├── index.html
├── 404.html
├── categories/
├── product/
├── create/
├── checkout/
└── other routes...
```

## Important Configuration Files

### .htaccess (For Apache Servers)

Create a `.htaccess` file in your public_html directory:

```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Handle client-side routing
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## Optimization Checklist

- [x] Images optimized with Next.js Image component
- [x] Static assets compressed
- [x] CSS and JS minified
- [x] Gzip compression enabled
- [x] Browser caching configured
- [x] Console logs removed in production
- [x] Bundle size optimized

## Troubleshooting

### Common Issues:

1. **404 Errors on Page Refresh**
   - Ensure `.htaccess` is configured for client-side routing
   - Check if your hosting supports URL rewriting

2. **Images Not Loading**
   - Verify image paths are correct
   - Ensure `images.unoptimized: true` in next.config.js for static export

3. **CSS/JS Not Loading**
   - Check file permissions (should be 644)
   - Verify MIME types are configured correctly

4. **API Routes Not Working**
   - API routes don't work with static export
   - Consider using external APIs or serverless functions

## Performance Monitoring

After deployment, monitor:
- Page load speeds
- Core Web Vitals
- Image optimization effectiveness
- Bundle size impact

## Security Considerations

- Remove any sensitive environment variables
- Ensure proper file permissions
- Configure HTTPS if available
- Set up proper CORS headers if needed

## Support

For deployment issues:
1. Check hosting provider documentation
2. Verify Node.js version compatibility
3. Test locally with `npm run build && npm start`
4. Contact hosting support for server-specific issues

---

**Note**: This guide assumes a standard shared hosting environment. Adjust configurations based on your specific hosting provider's requirements.