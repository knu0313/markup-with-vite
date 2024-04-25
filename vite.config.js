import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path, { resolve } from 'path';

// 특정 폴더내에 html 및 js 파일 input entries 만들기
const getHtmlJsEntries = dir => {
  const htmlEntries = {};
  fs.readdirSync(dir).forEach(item => {
    const itemPath = path.join(dir, item);

    if(fs.statSync(itemPath).isFile()) {
      if(path.extname(item) == '.html' || path.extname(item) == '.js' ) {
        htmlEntries[itemPath] = resolve(__dirname, itemPath);
      }
    } else {
      Object.assign(htmlEntries, getHtmlJsEntries(itemPath));
    }
  });

  return htmlEntries;
};
console.log(getHtmlJsEntries('src'));

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
      input: getHtmlJsEntries('src'),
      output: {
        assetFileNames: (entry) => {
          if(path.extname(entry.name) == '.css') {
            // CSS build결과물 경로
            return 'css/' + entry.name;
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
          partialDirectory: resolve(__dirname, 'src/_partials'), //partials 경로 설정
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