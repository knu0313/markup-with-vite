import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path, { resolve } from 'path';
import helpers from './src/_helpers/index';

// src 내 빌드 파일 엔트리(html, js, css) 만들기

const partialPath = 'src/_partials';  // partials 경로
const helperPath = 'src/_helpers';  // helpers 경로 (엔트리 예외처리)

const getEntries = dir => {
  const htmlEntries = {};

  if(dir.length === dir.replace(partialPath, '').length && dir.length === dir.replace(helperPath, '').length ) {
    fs.readdirSync(dir).forEach(item => {
      const itemPath = path.join(dir, item);
  
      if(fs.statSync(itemPath).isFile()) {
        if(path.extname(item) == '.html' || path.extname(item) == '.js' || path.extname(item) == '.css') {
          htmlEntries[itemPath] = resolve(__dirname, itemPath);
        }
      } else {
        Object.assign(htmlEntries, getEntries(itemPath));
      }
    });
  }

  return htmlEntries;
};

console.log(getEntries('src'));

export default {
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    assetsDir: '.',
    cssMinify: false,
    overwrite: true,
    rollupOptions: {
      minify: false,
      input: getEntries('src'),
      output: {
        assetFileNames: (entry) => {
          if(path.extname(entry.name) == '.css') {
            return entry.name.replace('src/', '');
          }
          return entry.name;
        },
        entryFileNames: (entry) => {
          if(path.extname(entry.name) == '.js') {
            return path.relative("src", entry.name);
          }
          return entry.name;
        },
      },
      plugins: [
        handlebars({
          partialDirectory: resolve(__dirname, partialPath), //partials 경로 설정
          helpers // helpers 등록
        }),
      ]
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer
      ],
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/_partials'), //partials 경로 설정
    }),
  ],
};