

export const requests = {
   userCreate: "/user/sign_up",
   getUserCreate: "/user/find/nickname",
   userUpdate: (userId: string | number) => `/user/manage/id/${userId}`,
   placeCreate: "/place",
   logout :"/user/withdraw"
}

export default requests;


