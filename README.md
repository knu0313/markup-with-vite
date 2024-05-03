# markup-with-vite


## npm scripts (npm run ***)
- dev           : vite 로컬 개발 서버 실행
- build:clean   : 기존 빌드 파일 삭제(./dist/ 삭제)
- build:vite    : vite 빌드
- build:format  : 빌드 파일 prettier 실행
- build         : build:clean -> build:vite -> build:format 순차 실행

## 구조
- dist    : 빌드 파일 (git 예외처리)
- public  : 정적 파일들 (ex. 이미지, 폰트 등)
  - src와 같은 레벨이라고 생각하고 경로 지정(ex. public/img/logo.svg -> /img/logo.svg)
- src     : 개발 소스
  - index.html     : 첫 화면, 인덱스 페이지
  - _partials      : handlebars partials 작성 하는 구역 (.hbs로 작성!!)
  - css, js, pages : 현재 구조로 사용하길 권장(변경가능)
- .gitignore       : git 예외처리
- .prettierignore  : prettier 예외처리
- .prettierrc      : prettier 설정
- vite.config.js   : vite 설정

## 주의사항
- src 폴더내에 확장자가 .html, .js, .css 파일들이 자동적으로 input 엔트리에 포함
- css
  - 빌드시 .css 파일 기준으로 파일이 생성
  - .css 파일 내에서는 SCSS가 동작 안하므로 현재 예제 처럼 .scss 파일을 .css파일에 import해서 .scss 파일내에서 작성
  - html에 css import 방법은 src/_partials/layout/head.hbs 참고
