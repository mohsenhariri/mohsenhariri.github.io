# A [Simple] Blog!

Now, it has a name: [**`Desiderata Kashkul`**](https://mohsenhariri.github.io/)!

## Roadmap:

- [x] Read Next.js docs and create a template
- [x] Render markdown
  - [x] Need a parser
  - [x] Images
    - [x] Within md
    - [x] HTML tags
- [x] Render math formulas
  - [x] It seems that `KaTeX` is a good choice! **P.S.: Indeed, it is!**
- [x] Render code blocks
- [x] CSS 😟
- [x] Dark mode
  - [ ] Handled with `useEffect` and `localStorage`, but am not satisfied with it!
- [ ] Complexity slider
- [ ] Develop something for home page
- [x] Assets optimization

## Improvements:

- [ ] CV
  - [x] iframe
  - [ ] NextJS integration
- [ ] Author -> Author list
- [ ] Add toc to posts
- [ ] Better date, [this?](https://date-fns.org/)
- [ ] Tags
- [ ] Isn't it better to convert images to base64 and store them in md files? 🤔
- [X] Add static directory for `_posts`'s assets. **P.S.**: this is deprecated in NextJS, instead I used [this approach](#Assets-Optimization).

Things to read:

- [Metadata](https://nextjs.org/docs/canary/app/api-reference/functions/generate-metadata)
- [Static Server](https://nextjs.org/docs/canary/app/building-your-application/deploying/static-exports)

## Assets Optimization

1. **Image Organization**:

   - Blog post images are stored in `_posts/_assets`.
   - VSCode settings ensure markdown images are copied to the correct `_assets/` folder:

   ```json
   {
     "markdown.copyFiles.destination": {
       "/_posts/**/*": "_assets/${documentBaseName}/"
     }
   }
   ```

2. **Optimization Script**:

   - The optimization script (`scripts/copyAndOptimizeImages.js`) is used to:
     - Copy all images from `_posts/_assets` to `public/posts`.
     - Convert supported image formats (`png`, `jpg`, etc.) to optimized `webp` format using [Sharp](https://sharp.pixelplumbing.com/).
     - No modifications are made to SVGs and GIFs.

3. **Image Path Updates**:

   - A custom `rehype` plugin (`rehypeImageSrcReplace`) adjusts the `src` attributes of `<img>` tags in markdown files:
     - Replaces `_assets/` paths with `/posts/`.
     - Updates image extensions from `png` or `jpg` to `webp`.