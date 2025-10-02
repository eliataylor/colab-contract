#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read current build number from file, or start at 1
const buildNumberFile = path.join(__dirname, '..', '.build-number');
let buildNumber = 1;

if (fs.existsSync(buildNumberFile)) {
  try {
    const content = fs.readFileSync(buildNumberFile, 'utf8').trim();
    buildNumber = parseInt(content, 10) + 1;
  } catch (error) {
    console.warn('Could not read build number file, starting from 1');
  }
}

// Write new build number
fs.writeFileSync(buildNumberFile, buildNumber.toString());

// Generate timestamp
const timestamp = new Date().toISOString();

// Create build info object
const buildInfo = {
  buildNumber,
  timestamp,
  version: process.env.npm_package_version || '0.0.0'
};

// Write build info to a JSON file that Vite can read
const buildInfoFile = path.join(__dirname, '..', 'src', 'build-info.json');
fs.writeFileSync(buildInfoFile, JSON.stringify(buildInfo, null, 2));

console.log(`Build number: ${buildNumber}`);
console.log(`Build timestamp: ${timestamp}`);
console.log(`Build info written to: ${buildInfoFile}`);

// Export for use in other scripts
export default buildInfo;
