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
    //console.log(userID, token)
    let id = Object.values(userID);
   // console.log(id[0])
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