
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_SERVER, // 공통 API URL 설정
  timeout: 5000, // 요청 타임아웃 시간 설정 (밀리초)
  headers: {
    'Content-Type': 'application/json', // 기본 요청 헤더
  },
  withCredentials : true,
});



export default axiosInstance;
