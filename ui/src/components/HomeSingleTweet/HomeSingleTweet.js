
import React,{useState} from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";


//api method
import { isAuthenticate } from "../../api/auth";
import { putTweetLike, putTweetUnlike } from "../../api/tweet";

//css
import "./HomeSingleTweet.css";

const HomeSingleTweet = ({tweet}) => {
   
    let [error, setError] = useState(0);
    let [success, setSuccess] = useState(0);
    let [singleTweets, setSingleTweets] = useState(tweet);

    //get user info
    const { user, token } = isAuthenticate();

      //add like to the post
  let like = () => {
    putTweetLike(singleTweets._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(0);
      }else{
        setSingleTweets(data.tweet);
      }
    });
  };

  //unlike from like
  let unlike = () =>{
    putTweetUnlike(singleTweets._id, token).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess(0);
      }else{
        setSingleTweets(data.tweet);
      }
    });
  }


      //show the like button
  let showLikeButton = () => {

    let isLike =  false;

    if(singleTweets.likes){
      for (let i = 0; i < singleTweets.likes.length; i++) {
        if (singleTweets.likes[i] === user._id) {
          isLike = true;
          break;
        }
      }
    }
      
    if(isLike){
      return (
        <FontAwesomeIcon
          className="fa-icon liked"
          onClick={() => unlike()}
          icon={faThumbsUp}
        />
      );
    }else{
      return (
        <FontAwesomeIcon
          className="fa-icon"
          onClick={() => like()}
          icon={faThumbsUp}
        />
      );
    }
   
  };
    
    return (
        <Container>
        <Row>
          <Col md={8} className="offset-md-2">
            <div className="tweetBox">
              <p>
              {singleTweets.text} <span className="ml-5"> - {singleTweets.author.username}</span>
              </p>

              <div className="inline">
              <span>Total Likes: {singleTweets.likes ? singleTweets.likes.length : 0}  </span>
              <span className="float-right">Posted:  {moment(singleTweets.createdAt).fromNow()} Ago</span>
              </div>
              
            <p>{showLikeButton()}</p>
            </div>
          </Col>
        </Row>
      </Container>
    )
}

export default HomeSingleTweet;
