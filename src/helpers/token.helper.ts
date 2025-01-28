import Cookies from "js-cookie";

export const decorAccessToken = () => {
  const token = 
    Cookies.get('DECOR_ACCESS_TOKEN');
    return token
}