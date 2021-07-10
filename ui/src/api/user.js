import { API } from "./config";

// create new tweet
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