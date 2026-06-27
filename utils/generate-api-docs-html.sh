#!/usr/bin/env bash
set -euo pipefail

SCRIPT_ROOT=$(cd "$(dirname "$0")"; pwd)

cd "$SCRIPT_ROOT/.."

GITHUB_REPO_URL=$(node -p "require('./package.json').repository.url.replace(/^git\\+/, '').replace(/\\.git$/, '')")
GITHUB_BRANCH=$(git branch --show-current)
GITHUB_SOURCE_BASE="${GITHUB_REPO_URL}/blob/${GITHUB_BRANCH}"

rm -rf docs/website/guides
rm -rf docs/website/api

mkdir -p docs/website/guides
mkdir -p docs/website/api

cp -r docs/en-us/api/. docs/website/api/
cp docs/en-us/*.md docs/website/guides/

if [[ -f docs/website/guides/README.md ]]; then
    mv docs/website/guides/README.md docs/website/guides/index.md
fi

GITHUB_SOURCE_BASE="$GITHUB_SOURCE_BASE" node <<'NODE'
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(process.cwd(), 'docs/website');
const githubSourceBase = process.env.GITHUB_SOURCE_BASE;

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full);
            continue;
        }
        if (entry.isFile() && entry.name === 'README.md') {
            fs.renameSync(full, path.join(dir, 'index.md'));
        }
    }
}

walk(path.join(root, 'api'));

function rewrite(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            rewrite(full);
            continue;
        }
        if (!entry.isFile() || path.extname(entry.name) !== '.md') {
            continue;
        }
        let content = fs.readFileSync(full, 'utf8');
        content = content.replace(/\\[TOC\\]\\n?/g, '');
        content = content.replace(/README\.md/g, 'index.md');
        if (full.includes(`${path.sep}guides${path.sep}`)) {
            content = content.replace(/\]\(\.\/api\//g, '](../api/');
        }
        content = content.replace(
            /\]\(((?:\.\.\/)+src\/[^)]+)\)/g,
            (_full, relPath) => `](${githubSourceBase}/${relPath.replace(/^(\.\.\/)+/, '')})`
        );
        fs.writeFileSync(full, content);
    }
}

rewrite(root);
NODE

rm -f docs/website/.vitepress/html-docs.tgz

cleanup() {
    npm un -D vitepress --package-lock=false --ignore-scripts >/dev/null 2>&1 || true
}

npm i -D vitepress --package-lock=false --ignore-scripts >/dev/null
trap cleanup EXIT

npx vitepress build docs/website
cleanup
trap - EXIT

cd "$SCRIPT_ROOT/../docs/website/.vitepress/dist"

tar -zcf ../html-docs.tgz ./*
