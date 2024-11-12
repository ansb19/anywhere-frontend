# Expo 프로젝트를 위한 Node.js 이미지 사용
FROM node:18

# 작업 디렉터리를 /app으로 설정
WORKDIR /app

# Expo 프로젝트의 package.json과 package-lock.json 파일을 복사
COPY package*.json ./

# 프로젝트의 의존성 설치
RUN npm install -g expo-cli
RUN npm install

# 프로젝트 파일을 모두 복사
COPY . .

# Expo 앱이 실행될 포트를 노출
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
# Expo 프로젝트를 시작하는 명령
CMD ["expo", "start", "--tunnel"]
