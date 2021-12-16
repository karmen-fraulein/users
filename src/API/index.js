import axios from "axios";

axios.defaults.baseURL =
  "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const getUsersList = (page, size) => {
  return axios.get(`/user/${page}/${size}`);
};

const getUserFriends = (userID, page, size) => {
  return axios.get(`/user/${userID}/friends/${page}/${size}`);
};

const getUser = (userID) => {
  return axios.get(`/user/${userID}`);
};

export const API = {getUsersList, getUserFriends, getUser};
