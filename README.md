# Vue-Examples

###Docker installs -> https://hub.docker.com/_/node/

docker pull node:10

docker run -it --name VueExamples -e HOST=0.0.0.0 -p 8778:8080 -v /Users/desenvolvedor/Documents/GitHub/Vue-Examples/:/var/www/Vue-Examples node:10 bash

###Install Vue-Cli - https://cli.vuejs.org/

npm i -g vue-cli

npm i -g @vue/cli

npm i -g @vue/cli-init

###Init a project with webpack template

vue init webpack social

###Running a project

./name_project

npm run dev

###Install bootstrap-vue -> https://bootstrap-vue.js.org/docs

npm i vue bootstrap-vue bootstrap

###Install Axios -> https://github.com/axios/axios

npm install axios --save

###Install Vuex -> https://vuex.vuejs.org/

npm install vuex --save

###Install Slug -> https://www.npmjs.com/package/slug

npm install slug --save
