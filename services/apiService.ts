import axiosInstance from '@/api/axiosInstance';
import { requests } from '@/api/request';
import { BACKEND_SERVER } from '@env';
 


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
): Promise<{ success: boolean; message: string; data: User }> => {
  try {
    
    const response = await axiosInstance.post<{ success: boolean; message: string; data: User }>(
      requests.userCreate,
      {
        account_email: 'test12@example.com',
        nickname: 'asw123',
        phone_number: '010-0000-0000',
        register_place_count: 1,
        penalty_count: 0,
        penalty_state: false,
      }
    );
    console.log(response.status, response.data)
    return response.data;
  } catch (error) {
    console.error('Error updating user name:', error);
    throw error;
  }
};

export const getUser = async (): Promise<{ success: boolean; data: {message:string, data:User} }> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; data: {message:string, data:User} }>(
      requests.userCreate,
    
    );
    console.log('User data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const test = async () => {
  try {
    const response = await axiosInstance.get(requests.test);
    console.log('testtttt', response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching test data:', error);
    throw error;
  }
};