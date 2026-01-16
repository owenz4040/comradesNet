# Domain Migration Guide: colinowen.online → comradeswifi.net

## ✅ Steps to Complete on Render

### 1. Add Custom Domain
1. Go to your Render dashboard: https://dashboard.render.com
2. Select your "comrades" service
3. Go to **Settings** → **Custom Domains**
4. Click **Add Custom Domain**
5. Enter: `comradeswifi.net` (and optionally `www.comradeswifi.net`)
6. Render will provide DNS records

### 2. Update DNS at Your Domain Provider
Go to your domain registrar (where you bought comradeswifi.net) and add these records:

**For root domain (comradeswifi.net):**
- Type: `A` or `ALIAS`
- Name: `@` or leave blank
- Value: Render's IP address (shown in Render dashboard)

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: Your Render app URL (e.g., `comrades-xxxx.onrender.com`)

### 3. Remove Old Domain (Optional but Recommended)
1. In Render dashboard → Custom Domains
2. Remove `colinowen.online` if it's still listed
3. This forces all traffic to the new domain

---

## 🔍 Update Search Engines

### Google Search Console
1. Go to: https://search.google.com/search-console
2. Add new property for `comradeswifi.net`
3. Verify ownership (HTML file or DNS method)
4. Submit new sitemap
5. Use **Change of Address** tool:
   - Select old property (colinowen.online)
   - Tools → Change of Address
   - Select new property (comradeswifi.net)
   - Submit request

### Update Listings
- **Google My Business**: Update website URL
- **Social Media**: Update all links (Facebook, Twitter, Instagram)
- **Any Directories**: Update listings to new domain

---

## 📊 SEO Best Practices

### 1. Keep 301 Redirects Active
The `_redirects` file now redirects:
```
colinowen.online → comradeswifi.net
```
Keep this active for at least 6-12 months.

### 2. Update Internal Links
Search your codebase and update any hardcoded old domain references.

### 3. Monitor Traffic
- Use Google Analytics to track the transition
- Watch for any 404 errors in Search Console

---

## ⏱️ Timeline
- **DNS propagation**: 24-48 hours
- **Search engine updates**: 2-4 weeks
- **Full migration**: 3-6 months

---

## 🆘 Troubleshooting

### Site not loading on new domain?
- Wait 24-48 hours for DNS propagation
- Check DNS settings with: `nslookup comradeswifi.net`
- Verify Render shows domain as "Verified"

### Old domain still ranking?
- Ensure 301 redirects are working
- Submit change of address in Google Search Console
- Update backlinks where possible
- Be patient - can take weeks

### SSL Certificate Issues?
- Render automatically provisions SSL certificates
- May take a few minutes after domain verification
- If issues persist, contact Render support
