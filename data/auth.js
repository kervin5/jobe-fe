export const userIsLoggedIn = () => {
  token = window.sessionStorage.getItem("token");
  return token && token !== "";
};

export const logInUser = token => {
  window.sessionStorage.setItem("token", token);
};
