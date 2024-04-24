import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path, { resolve } from 'path';

// 특정 폴더내에 html 파일 input entries 만들기
const getHtmlEntries = dir => {
  const htmlEntries = {};
  fs.readdirSync(dir).forEach(item => {
    console.log(item, dir);
    const itemPath = path.join(dir, item);

    if(fs.statSync(itemPath).isFile()) {
      if(path.extname(item) == '.html' || path.extname(item) == '.js' ) {
        htmlEntries[itemPath.replace('src/','')] = itemPath;
      }
    } else {
      Object.assign(htmlEntries, getHtmlEntries(itemPath));
    }
  });

  return htmlEntries;
};
console.log(getHtmlEntries('src'));

export default {
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist/',
    assetsDir: '.',
    cssMinify: false,
    rollupOptions: {
      input: { ...getHtmlEntries('src') },
      output: {
        assetFileNames: (entry) => {
          console.log(entry);
          return entry.name;
        },
        entryFileNames: (entry) => {
          if(path.extname(entry.name) == '.html') {
            return path.basename(entry.name);
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