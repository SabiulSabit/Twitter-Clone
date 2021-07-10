import { API } from "./config";

// create new tweet
export const createTweet = (text,userID, token) => {
     console.log(text,userID, token)
  
    return fetch(`${API}/tweet/post/${userID}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(text),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        return err;
      });
  };
