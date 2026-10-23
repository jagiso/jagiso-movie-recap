# JAGISO ፊልሞች Recap — Movie Recap Library

A responsive static website for **JAGISO ፊልሞች Recap**, styled in cinematic black and gold. It includes responsive navigation, movie search, genre filters, starter movie cards, a detail modal, optional YouTube embeds, and links to the channel.

## Files

- `index.html` — page structure and starter movie cards
- `styles.css` — responsive styling and visual design
- `script.js` — search, genre filters, detail modal, and YouTube embedding
- `assets/logo.svg` — editable vector logo

## Preview locally

1. Download and unzip the project.
2. Open `index.html` in a modern browser.
3. For the most realistic local preview, use Visual Studio Code with the **Live Server** extension and choose **Open with Live Server**.

The site does not require a build step or package installation.

## Add your real YouTube recap videos

Open `script.js`. Each movie has a `videoId` field. Replace its empty value with the **11-character YouTube video ID**.

Example: if your video URL is `https://www.youtube.com/watch?v=AbCdEf12345`, use:

```js
videoId: "AbCdEf12345"
```

Keep the quotes. When visitors open that movie card, the recap video will appear in an embedded player. Use only videos you have permission to publish/embed, and respect YouTube's policies.

You can also edit each `description`, `year`, and `genre` in `script.js`. To add a new movie, duplicate a `.movie-card` block in `index.html`, update its `data-title`, `data-genre`, and `data-year`, add a matching entry in `movieDetails` in `script.js`, and adjust the poster class/art as desired. For a quick first launch, you can also rename the six starter examples and edit their details.

## Free publishing with GitHub Pages

1. Create or sign in to a GitHub account at https://github.com.
2. Create a new **public** repository, for example `jagiso-movie-recap`.
3. Upload the contents of this folder to the repository root. Ensure `index.html`, `styles.css`, and `script.js` are at the root, with `assets/logo.svg` inside `assets/`.
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select branch **main** and folder **/(root)**, then save.
7. Wait for the Pages deployment to finish. GitHub will show your public site URL in the Pages settings, usually `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

Every time you upload edits to the `main` branch, GitHub Pages can publish the changes. A custom domain is optional and usually costs money; the default GitHub Pages URL is free.

## Alternative free hosting: Netlify Drop

You can also use https://app.netlify.com/drop and drag the unzipped project folder into the drop area. Follow Netlify's prompts to publish. Free-tier details and interface names can change over time.

## Before sharing the website

- Replace starter titles/details with the exact movies and recap videos on your channel.
- Add your real video IDs so the embedded players work.
- Test on mobile and desktop.
- Make sure any images, posters, logos, and descriptions you add are yours or appropriately licensed. The poster artwork in this starter template is CSS-generated design art, not official movie posters.
- This site links to YouTube and does not host movie files.
