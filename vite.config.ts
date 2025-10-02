import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// https://vite.dev/config/
export default defineConfig(() => {
  // Load build info if it exists
  let buildInfo = { buildNumber: 0, timestamp: '', version: '0.0.0' };
  try {
    const buildInfoPath = resolve(__dirname, 'src/build-info.json');
    if (existsSync(buildInfoPath)) {
      buildInfo = JSON.parse(readFileSync(buildInfoPath, 'utf8'));
    }
  } catch (error) {
    // Silently handle error in build process
  }

  // Format datetime for display
  const formatDateTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/,/g, '');
    } catch (error) {
      return timestamp;
    }
  };

  const formattedDateTime = formatDateTime(buildInfo.timestamp);

  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html
            .replace(
              /<title>Colab Contract<\/title>/,
              `<title>Colab Contract - Build ${buildInfo.buildNumber} (${formattedDateTime})</title>`
            )
            .replace(
              /<meta name="apple-mobile-web-app-title" content="Colab Contract" \/>/,
              `<meta name="apple-mobile-web-app-title" content="Colab Contract - Build ${buildInfo.buildNumber}" />`
            )
            .replace(
              /<meta name="viewport" content="width=device-width, initial-scale=1.0" \/>/,
              `<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="build-number" content="${buildInfo.buildNumber}" />
    <meta name="build-timestamp" content="${buildInfo.timestamp}" />
    <meta name="build-datetime" content="${formattedDateTime}" />
    <meta name="build-version" content="${buildInfo.version}" />`
            );
        },
      },
    ],
    define: {
      __BUILD_NUMBER__: JSON.stringify(buildInfo.buildNumber),
      __BUILD_TIMESTAMP__: JSON.stringify(buildInfo.timestamp),
      __BUILD_VERSION__: JSON.stringify(buildInfo.version),
    },
    build: {
      sourcemap: true, // Enable source maps for production builds
    },
  }
})
