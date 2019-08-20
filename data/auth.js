import axios from "../data/api";

export const userIsLoggedIn = () => {
  const token = window.localStorage.getItem("token");
  return token && token !== "";
};

export const logInUser = token => {
  window.localStorage.setItem("token", token);
};

export const getAuthToken = () => {
  return window.localStorage.getItem("token") || "";
};

export const getUserInfo = async () => {
  try {
    const result = await axios.post(
      "/users/me",
      {},
      {
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }
    ).data;

    return result;
  } catch (ex) {
    console.log(ex);
    return false;
  }
};
