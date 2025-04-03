import axios from 'axios';

export const userDeleteRollback = async () => {
  const accessToken = localStorage.getItem('accessTokenForRollback');
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}api/users/me/deleted`,
      { accessToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (response.status === 200) {
      localStorage.removeItem('accessTokenForRollback');
      return true;
    } else {
      console.log('탈퇴 복구 api 에러', response);
      return false;
    }
  } catch (error) {
    throw new Error('Error', error);
  }
};

export default userDeleteRollback;
