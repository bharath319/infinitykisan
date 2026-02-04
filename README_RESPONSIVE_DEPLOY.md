# Responsive Testing & Deployment Checklist — Infinity Kisan

This short checklist helps you verify responsive behavior across devices and deploy the app reliably.

## Quick local setup

- Install dependencies and start dev server:

```powershell
cd c:\Users\bhara\Downloads\infinitykisan-main
npm install
npm start
```

- Verify environment variables (important for Gemini API):

  - Create a `.env` in the project root with:
    ```text
    REACT_APP_GEMINI_API_KEY=your_api_key_here
    ```
  - Confirm the key can list available models:
    ```powershell
    node list_all_models.js
    ```

## Responsive testing checklist

1. Basic viewports
   - Desktop: >= 1200px
   - Laptop/tablet: 768–1199px
   - Mobile portrait: 360–420px
   - Mobile landscape: 640–800px
   Test by resizing browser or using DevTools Device Toolbar.

2. Typography & spacing
   - Verify font sizes and spacing scale smoothly across breakpoints.
   - Confirm no text overflow or truncated buttons.

3. Navigation and layout
   - Navbar and BottomNav show/hide correctly at small widths.
   - Forms, inputs and buttons remain usable and readable.

4. Images & media
   - Uploaded images scale (no overflow) and thumbnails are readable.
   - PDF export contains thumbnails and full-size images (download and open).

5. Touch & accessibility
   - Use a mobile device or emulator: tap targets are at least ~44px high.
   - Ensure interactive elements are reachable via keyboard (Tab) and labelled.

6. Network/Offline behavior
   - Turn off network and verify offline notices appear where expected.
   - Ensure app degrades gracefully when Gemini API key is missing.

7. Functional smoke tests
   - Upload images + select crop + analyze (Disease Detection) — verify successful response.
   - Use Chatbot with/without API key to validate both online and offline flows.

## Performance/Quality checks

- Lighthouse audit (Desktop and Mobile) — ensure acceptable scores for Performance, Accessibility, Best Practices.
- Check bundle size: `npm run build` then inspect `build/static/js` sizes.

## Build & deploy (quick guides)

1. Build for production

```powershell
npm run build
# The production-ready files will be in `build/`
```

2. Deploy options

- Netlify (recommended simple flow)
  - Connect your GitHub repo or drag the `build/` folder to Netlify.
  - Set build command: `npm run build`, publish directory: `build`.

- Vercel
  - `vercel` will auto-detect create-react-app. Connect repo and deploy.

- GitHub Pages
  - Add a `homepage` in `package.json` and use `gh-pages` to publish `build/`.

3. Environment variables in production

- Add `REACT_APP_GEMINI_API_KEY` in your host's environment/config settings (Netlify/Vercel/Other). Do not check keys into git.

## Post-deploy checks

- Open the deployed URL on multiple devices (or use BrowserStack) and run the Responsive checklist above.
- Test PDF download and API-dependent flows in production.
- Monitor logs for API errors (rate limits, invalid model names) and handle them by inspecting the model list.

## Troubleshooting tips

- If you see "Loading chunk ... failed" after deploy: clear the CDN cache or ensure all assets are deployed consistently (no stale service worker caching).
- If Gemini returns model not found: run `node list_all_models.js` with your production key to see allowed models and update the code to use a supported model.
- For large PDF sizes: consider resizing images before embedding or use lower-quality thumbnails.

---

If you want, I can:
- Add a GitHub Actions workflow to build and deploy automatically to Netlify or Vercel.
- Add a lightweight responsive QA script (using Puppeteer) to automatically test the key viewports.
