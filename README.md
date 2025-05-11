# ChirpZ.AI Landing Page

A modern, responsive landing page for ChirpZ.AI - an AI-powered model governance reporting solution for insurance SaaS companies.

## Features

- Modern Next.js architecture with React and TypeScript
- Dark/light theme support with automatic system preference detection
- Responsive design for all device sizes
- Smooth animations and transitions using Framer Motion
- GitHub Pages deployment configuration
- Custom domain support

## Development

First, clone the repository:

```bash
git clone https://github.com/yourusername/chirpz.git
cd chirpz
```

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is configured for automatic deployment to GitHub Pages. When you push to the `main` branch, the GitHub Actions workflow will automatically build and deploy the site.

### Setting up GitHub Pages with a custom domain

1. Go to your repository settings on GitHub
2. Navigate to the "Pages" section
3. Under "Custom domain," enter: `chirpz.ai`
4. Save the changes

The repository already includes a `CNAME` file in the `public` directory that will be used for the custom domain configuration.

### DNS Configuration

To point your domain to GitHub Pages, you'll need to configure your DNS settings with your domain provider:

1. Add an `A` record pointing to the GitHub Pages IP addresses:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

2. Add a `CNAME` record:
   - Name: `www`
   - Value: `yourusername.github.io`

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- [Lucide React](https://lucide.dev/) - Icons

## License

MIT
