
# Проектная работа Mesto
&ensp;Реализация учебного проекта от [Яндекс Практикум](https://practicum.yandex.ru/). Включает функционал по ведению профиля пользователя, публикации карточек интересных мест с фотографиями, предоставляет возможность ставить *like* карточкам других пользователей.  

&ensp;Выполнена на основе технологий:
* JavaScript;
* HTML/CSS;
* API/JSON/Promise;
* Webpack;
* Babel;
* GitHub Pages;
## Ссылки на проект
* [Git репозиторий проекта](https://github.com/DmitriyRuf/mesto-project-ff.git) 
* [Страница проекта](https://dmitriyruf.github.io/mesto-project-ff) 
## Что нужно для работы и сборки проекта
* Среда разработки - Visual Studio Code;
* Файлы конфигураций для сборки: *package.json*, *babel.config.js*, *postcss.config.js*, *webpack.config.js*;
* Сценарии сборки: __*build*__ - основная сборка, __*dev*__ - сборка и запуск *webpack-dev-server*, __*deploy*__ - публикация на *GIT Hub Pages*, __*predeploy*__ - запуск сценария *build* перед сценарием *deploy*;
* Выполнить инструкции:
```console
 npm init --yes
 npm set registry https://registry.npmjs.org/
 npm i webpack --save-dev
 npm i webpack-cli --save-dev
 npm i webpack-dev-server --save-dev
 npm i @babel/core --save-dev
 npm i @babel/preset-env --save-dev
 npm i core-js --save
 npm i babel-loader --save-dev
 npm i html-webpack-plugin --save-dev
 npm i clean-webpack-plugin --save-dev
 npm i css-loader --save-dev
 npm i mini-css-extract-plugin --save-dev
 npm i postcss-loader --save-dev
 npm i autoprefixer --save-dev
 npm i cssnano --save-dev
 npm i gh-pages --save-dev
```