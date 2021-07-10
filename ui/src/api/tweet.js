import { API } from "./config";

// create new tweet
export const createTweet = (text,userID, token) => {
    // console.log(text,userID, token)
  
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


  //delete tweet
  export const deleteTweet = (postID,userID, token) => {
  //  console.log(postID,userID, token)
 
   return fetch(`${API}/tweet/delete/${postID}/${userID}`, {
     method: "DELETE",
     headers: {
       Accept: "application/json",
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
  


 //get single tweet info
 export const getTweet = (postID, token) => {
 
   return fetch(`${API}/tweet/details/${postID}`, {
     method: "GET",
     headers: {
       Accept: "application/json",
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