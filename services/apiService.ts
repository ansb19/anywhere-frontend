import axiosInstance from '@/api/axiosInstance';
import { requests } from '@/api/request';
import { User } from '@/types/user';
import axios from 'axios';

 





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

export const getUser = async (): Promise<{ success: boolean; data: { message: string, data: User } }> => {
  try {
    console.log( process.env.EXPO_PUBLIC_BACKEND_LOCAL)
    const response = await axiosInstance.get<{ success: boolean; data: { message: string, data: User } }>(
      requests.userCreate,

    );
    console.log('User data fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateNickname = async (user : User , nickname:string): Promise<{ success: boolean; message: string, data: User }> => {
  try {
    const response = await axiosInstance.put<{ success: boolean; message: string; data: User }>(
        `${requests.userUpdate(user.user_id)}`,
        {nickname : nickname }
    );
    console.log('서버 응답 데이터:', response.data);
    return response.data;
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios 오류 데이터:', error.response?.data);
    } else {
        console.error('기타 오류:', error);
    }
    throw error;
}
};













