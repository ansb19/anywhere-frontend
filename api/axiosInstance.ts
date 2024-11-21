
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_SERVER, // 공통 API URL 설정
  timeout: 5000, // 요청 타임아웃 시간 설정 (밀리초)
  withCredentials : true,
});



export default axiosInstance;
