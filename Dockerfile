# Expo 프로젝트를 위한 Node.js 이미지 사용
FROM node:latest

# 작업 디렉터리를 /app으로 설정
WORKDIR /usr/src/app

# Expo 프로젝트의 package.json과 package-lock.json 파일을 복사
COPY package*.json ./

# 비대화형 모드 설정
ENV EXPO_NO_INTERACTIVE=1

# Install
RUN npm install
# Install Expo CLI
RUN npm install -g expo-cli

# 프로젝트 파일을 모두 복사
COPY . .

# Expo 앱이 실행될 포트를 노출
EXPOSE 19000 19001 19002 19006 8081

# Expo 프로젝트를 시작하는 명령
CMD ["sh", "-c", "yes | npm run web"]
