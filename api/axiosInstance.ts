
import axios from 'axios';
import { BACKEND_SERVER, BACKEND_LOCAL } from '@env';

//const backend_url: string = BACKEND_SERVER;

const backend_url: string = BACKEND_LOCAL;
const axiosInstance = axios.create({
  baseURL: backend_url, // 공통 API URL 설정
  timeout: 5000, // 요청 타임아웃 시간 설정 (밀리초)
  withCredentials : true,
});



export default axiosInstance;
