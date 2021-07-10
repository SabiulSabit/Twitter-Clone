import { API } from "./config";

// get own progile
export const getProfile = (userID, token) => {
    // console.log(text,userID, token)
  
    return fetch(`${API}/user/${userID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };

  //get all user profile
  export const getAllProfile = (token) => {

    return fetch(`${API}/users/all/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };


  //get other single user profile
  export const getOtherProfile = ( userID, token) => {

    let id = Object.values(userID);
    return fetch(`${API}/user/other/${id[0]}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };

  //follow user
  export const putFollowUser = ( userID, token) => {
 
    let id = Object.values(userID);

    return fetch(`${API}/user/follow/${id[0]}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };
  