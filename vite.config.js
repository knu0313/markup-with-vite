import copy from 'rollup-plugin-copy';
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path, { resolve } from 'path';

// 특정 폴더내에 html 파일 input entries 만들기
const getHtmlEntries = dir => {
  const htmlEntries = {};
  fs.readdirSync(dir).forEach(item => {
    const itemPath = path.join(dir, item);

    if(fs.statSync(itemPath).isFile()) {
      if(path.extname(item) == '.html') {
        htmlEntries[item] = resolve(__dirname, itemPath);
      }
    } else {
      Object.assign(htmlEntries, getHtmlEntries(itemPath));
    }
  });

  return htmlEntries;
};

export default {
  root: 'src',
  assetsDir: 'src',
  build: {
    outDir: '../dist/',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries('src'),
      plugins: [
        handlebars({
          partialDirectory: resolve(__dirname, 'src/_partials'), //partials 경로 설정
        }),
        copy({
          targets: [
            { src: 'src/img', dest: 'dist/' } // 에셋 파일을 복사할 소스 및 대상 경로
          ],
          verbose: true // 복사 작업을 로그에 표시할지 여부
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