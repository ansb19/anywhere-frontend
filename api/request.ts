

export const requests = {
   userCreate: "/user/sign_up",
   getUserCreate: "/user/find/nickname",
   userUpdate: (userId: string | number) => `/user/id/${userId}`,
   placeCreate: "/place"
}

export default requests;


