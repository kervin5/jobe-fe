import axios from "../data/api";

export const userIsLoggedIn = () => {
  token = window.sessionStorage.getItem("token");
  return token && token !== "";
};

export const logInUser = token => {
  window.sessionStorage.setItem("token", token);
};

export const getAuthToken = () => {
  return window.sessionStorage.getItem("token");
};

export const getUserInfo = async () => {
  try {
    const result = await axios.post(
      "/users/me",
      {},
      {
        headers: {
          Authorization: window.sessionStorage.getItem("token")
        }
      }
    ).data;

    return result;
  } catch (ex) {
    console.log(ex);
    return false;
  }
};
