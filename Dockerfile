# Expo 프로젝트를 위한 Node.js 이미지 사용
FROM node:latest

# 작업 디렉터리를 /app으로 설정
WORKDIR /usr/src/app

# Expo 프로젝트의 package.json과 package-lock.json 파일을 복사
COPY package*.json ./

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
RUN apt-get update && apt-get install -y qemu-user-static
#We need to install this inorder to start a tunnel on the docker conatiner
RUN yarn add @expo/ngrok
RUN npm install

# 프로젝트 파일을 모두 복사
COPY . .

 
# Expo 앱이 실행될 포트를 노출
EXPOSE 19000 19001 19002

# Expo 프로젝트를 시작하는 명령
CMD ["npx","expo", "start","--tunnel"]


# RUN npx expo start --tunnel

# RUN npx expo install expo-constants

# RUN expo build:web
 
# RUN apt-get update && apt-get install -y nginx

# RUN mv /usr/src/app/web-build /var/www/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# CMD ["expo", "start", "--no-dev", "--minify"]
