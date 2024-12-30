import axiosInstance from "@/api/axiosInstance";
import requests from "@/api/request";
import { Place } from "@/types/place";
import axios from "axios";

export const createPlace = async (
  place: Place
): Promise<{ success: boolean; message: string; data: Place }> => {
  try {
    const response = await axiosInstance.post(requests.placeCreate, place, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("데이터 전송 실패:", error.response?.data);
    } else {
      console.error("기타 오류:", error);
    }
    throw error;
  }
};
