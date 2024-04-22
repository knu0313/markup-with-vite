import { resolve } from 'path';
import copy from 'rollup-plugin-copy';
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';

export default {
  root: 'src',
  assetsDir: 'src',
  build: {
    outDir: '../dist/',
    // emptyOutDir: true,
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            { src: 'src/img', dest: 'dist/' } // 에셋 파일을 복사할 소스 및 대상 경로
          ],
          verbose: true // 복사 작업을 로그에 표시할지 여부
        })
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
      context: {
        title: 'Hello, world!',
      },
      partialDirectory: resolve(__dirname, 'src/_partials'), //partials 경로 설정
    }),
  ],
};