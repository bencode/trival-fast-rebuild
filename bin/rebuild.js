#!/usr/bin/env node

const pathUtil = require('path');
const fs = require('fs-extra');
const os = require('os');
const exec = require('child_process').execSync;

const platform = os.platform();


const deps = {
  gifsicle: 'gifsicle',
  mozjpeg: 'cjpeg',
  'optipng-bin': 'optipng',
  'pngquant-bin': 'pngquant',
  'jpegtran-bin': 'jpegtran',
  'cwebp-bin': 'cwebp'
};


const targetDir = pathUtil.join(process.cwd(), 'node_modules');

const start = new Date().getTime();

for (const name in deps) {
  const file = deps[name]
  const from = pathUtil.join(__dirname, `../res/${platform}/${file}`);
  const pkg = pathUtil.join(targetDir, name);
  if (fs.existsSync(pkg)) {
    const to = pathUtil.join(pkg, 'vendor', file);
    fs.ensureDirSync(pathUtil.dirname(to));
    fs.copySync(from, to);
  }
}


exec('npm rebuild', { stdio: [0, 1, 2] });

const cost = new Date().getTime() - start;
console.log(`cost: ${parseInt(cost / 1000, 10)}s`);
