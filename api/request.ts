

export const requests = {
   userCreate: "/user/sign_up",
   getUserCreate: "/user/find/nickname",
   userUpdate: (userId: string | number) => `/user/manage/id/${userId}`,
   placeCreate: "/place",
   logout: (userId: number, userType: string) =>
      `/user/withdraw/user_id/${userId}/user_type/${userType}`,
}

export default requests;


