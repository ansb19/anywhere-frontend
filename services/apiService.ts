import axiosInstance from '@/api/axiosInstance';
import { requests } from '@/api/request';
import axios from 'axios';

const API_BASE_URL = process.env.BACKEND_SERVER // 백엔드 API의 기본 URL을 입력하세요.

export interface User {
    account_email: string; // 계정 이메일
    nickname: string; // 닉네임
    phone_number: string; // 전화번호
    register_place_count: number; // 등록된 장소 개수
    created_at?: Date; // 생성 시간 (옵션, 생성 시 자동 설정 가능)
    penalty_count: number; // 벌점 개수
    penalty_state: boolean; // 벌점 상태
  }


export const createUser = async (
  
): Promise<{ success: boolean; data: {message:string, data:User} }> => {
  try {
    const response = await axiosInstance.post<{ success: boolean; data: {message:string, data:User} }>(
      requests.userCreate,
      {
        account_email: 'test@example.com',
        nickname: 'testuser',
        phone_number: '010-0000-0000',
        register_place_count: 1,
        penalty_count: 0,
        penalty_state: false,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user name:', error);
    throw error;
  }
};
