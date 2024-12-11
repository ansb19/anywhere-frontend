

import axios from 'axios';


const backend_url: string = process.env.EXPO_PUBLIC_BACKEND_LOCAL; //BACKEND_SERVER 서버에 올릴시
// const backend_url: string = process.env.EXPO_PUBLIC_BACKEND_SERVER; //BACKEND_SERVER 서버에 올릴시

const axiosInstance = axios.create({
  baseURL: backend_url, // 공통 API URL 설정
  timeout: 5000, // 요청 타임아웃 시간 설정 (밀리초)
  withCredentials : true,
});
 


export default axiosInstance;
