import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Run esbuild
execSync('esbuild index.js --bundle --platform=node --format=cjs --outfile=dist/index.js --sourcemap', { stdio: 'inherit' });

// Create dist/package.json to mark it as CommonJS
writeFileSync('dist/package.json', JSON.stringify({ type: 'commonjs' }, null, 2));

console.log('Build complete!');
