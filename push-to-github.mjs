/**
 * push-to-github.mjs
 * Pushes this project to GitHub using isomorphic-git (no Git installation needed).
 * Usage: node push-to-github.mjs <github-username> <personal-access-token>
 */

import git from 'isomorphic-git';
import http from '@isomorphic-git/http-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = __dirname;

const [,, username, token] = process.argv;

if (!username || !token) {
  console.error('\n❌  Usage: node push-to-github.mjs <github-username> <personal-access-token>\n');
  console.error('   Example: node push-to-github.mjs nikhiltiwari1818-source ghp_xxxxxxxxxxxx\n');
  process.exit(1);
}

const REMOTE_URL = 'https://github.com/nikhiltiwari1818-source/gym-demo-website.git';

// Files/dirs to ignore (same as .gitignore)
const IGNORE = new Set([
  'node_modules', '.next', '.git', 'out', 'build', 'coverage',
  '.env', '.env.local', '.env.production', '.env.development',
  'push-to-github.mjs', '*.pem', 'npm-debug.log', 'yarn-debug.log',
  'yarn-error.log', '.DS_Store', '.vercel', '.pnp', '*.tsbuildinfo',
  'next-env.d.ts',
]);

function shouldIgnore(filepath) {
  const parts = filepath.split('/');
  for (const part of parts) {
    if (IGNORE.has(part)) return true;
    if (part.startsWith('.env')) return true;
    if (part.endsWith('.pem')) return true;
    if (part.endsWith('.log')) return true;
    if (part.endsWith('.tsbuildinfo')) return true;
  }
  return false;
}

async function getAllFiles(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    if (shouldIgnore(relPath)) continue;
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(path.join(dir, entry.name), relPath));
    } else {
      files.push(relPath);
    }
  }
  return files;
}

async function main() {
  console.log('\n🚀  Gym Holic → GitHub Push Script');
  console.log('====================================\n');

  // 1. Init repo if not already
  try {
    await git.resolveRef({ fs, dir, ref: 'HEAD' });
    console.log('✅  Git repo already initialized.');
  } catch {
    console.log('📁  Initializing git repository...');
    await git.init({ fs, dir, defaultBranch: 'main' });
    console.log('✅  Git repo initialized.');
  }

  // 2. Stage all files
  console.log('\n📦  Staging files...');
  const files = await getAllFiles(dir);
  console.log(`   Found ${files.length} files to stage.`);
  
  for (const filepath of files) {
    await git.add({ fs, dir, filepath });
  }
  console.log('✅  All files staged.');

  // 3. Commit
  console.log('\n✍️   Creating commit...');
  let sha;
  try {
    sha = await git.commit({
      fs,
      dir,
      message: 'Initial commit: Gym Holic premium fitness website',
      author: {
        name: username,
        email: `${username}@users.noreply.github.com`,
      },
    });
    console.log(`✅  Commit created: ${sha.slice(0, 7)}`);
  } catch (e) {
    if (e.message.includes('nothing to commit') || e.message.includes('no changes')) {
      console.log('ℹ️   Nothing new to commit.');
    } else {
      throw e;
    }
  }

  // 4. Add remote
  console.log('\n🔗  Setting remote origin...');
  try {
    await git.addRemote({ fs, dir, remote: 'origin', url: REMOTE_URL });
    console.log('✅  Remote origin set.');
  } catch (e) {
    if (e.message.includes('already exists')) {
      await git.deleteRemote({ fs, dir, remote: 'origin' });
      await git.addRemote({ fs, dir, remote: 'origin', url: REMOTE_URL });
      console.log('✅  Remote origin updated.');
    } else throw e;
  }

  // 5. Push
  console.log('\n📤  Pushing to GitHub...');
  console.log(`    → ${REMOTE_URL}\n`);

  const result = await git.push({
    fs,
    http,
    dir,
    remote: 'origin',
    ref: 'main',
    force: true,
    onAuth: () => ({ username, password: token }),
    onProgress: (event) => {
      if (event.phase) {
        process.stdout.write(`\r   ${event.phase}: ${event.loaded || 0}/${event.total || '?'}`);
      }
    },
    onMessage: (msg) => process.stdout.write(msg),
  });

  console.log('\n\n🎉  SUCCESS! Project pushed to GitHub!');
  console.log(`\n🔗  View your repo: https://github.com/nikhiltiwari1818-source/gym-demo-website\n`);
}

main().catch((err) => {
  console.error('\n\n❌  Push failed:', err.message);
  if (err.message.includes('401') || err.message.includes('403') || err.message.includes('auth')) {
    console.error('\n💡  Authentication failed. Make sure your Personal Access Token:');
    console.error('    • Is correct (no extra spaces)');
    console.error('    • Has "Contents: Read & Write" permission for the repo');
    console.error('    • Has not expired\n');
  }
  if (err.message.includes('404')) {
    console.error('\n💡  Repo not found. Make sure the repo exists on GitHub and the URL is correct.\n');
  }
  process.exit(1);
});
