# KubeJS — Documentation

This is a [VitePress](https://vitepress.dev/) documentation site, configured for deployment to [GitHub Pages](https://pages.github.com/).

## Quick Start

### 1. Create a new GitHub repo

Create a new repository on GitHub named `kubejs` (or whatever you'd like).

### 2. Clone and push this template

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Nostalgic-am/kubejs.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Build and deployment**, set Source to **GitHub Actions**

That's it! The included workflow will build and deploy automatically on every push to `main`.

### 4. Update the config

Open `docs/.vitepress/config.mts` and replace:
- `YOUR_USERNAME` with your GitHub username
- `kubejs` with your actual repo name (in `base`, `editLink`, and `socialLinks`)

## Local Development

```bash
npm install
npm run docs:dev
```

The site will be available at `http://localhost:5173/kubejs/`.

## Build

```bash
npm run docs:build
npm run docs:preview
```

## Project Structure

```
├── .github/workflows/deploy.yml   # GitHub Actions deployment
├── docs/
│   ├── .vitepress/
│   │   └── config.mts             # VitePress configuration
│   ├── index.md                   # Home page (hero layout)
│   ├── getting-started.md         # Getting Started guide
│   ├── configuration.md           # Configuration reference
│   └── example.md                 # Full example page
├── package.json
└── .gitignore
```

## Customization

- **Theme**: VitePress uses the default theme. See [VitePress docs](https://vitepress.dev/reference/default-theme-config) for customization options.
- **Sidebar**: Edit the `sidebar` array in `config.mts` to add/remove pages.
- **Styling**: Add a `docs/.vitepress/theme/custom.css` file for custom styles.
