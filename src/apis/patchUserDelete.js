import { privateAPI } from "./user";

export const patchUserDelete = async () => {
  try {
    const response = await privateAPI.patch("/api/users/delete");
    if (response.status === 200) return true;
    else {
      console.log("탈퇴 api 호출 에러", response);
      return false;
    }
  } catch (error) {
    throw new Error("Error", error);
  }
};

export default patchUserDelete;
