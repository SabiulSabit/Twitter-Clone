import React, {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../Navbar/NavbarShow";

//get api 
import { isAuthenticate  } from "../../api/auth";
import { createTweet  } from "../../api/tweet";

const CreateTweet = () => {
 
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);
  let [tweetId, setTweetId] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  //get user info
  const { user, token } = isAuthenticate();

  const onSubmit = (data) => {
 
    createTweet(data, user._id, token).then( (data)=> {
      if(data.error){
        setError(1);
        setSuccess(0);
      }else{
        setSuccess(1);
        setError(0);
        setTweetId(data.data._id)
        setValue("text", "", { shouldValidate: false });
      }
    })
  };

  const showTweetForm = () => (
    <Container>
      <Row>
        <Col md={8} className="offset-md-2">
          <h3 className="text-center">Whats on Your Mind?</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>
              Write Your Tweet Here:{" "}
              <span className="text-danger">
                {errors.text && "This Field is Required"}
              </span>
            </p>
            <textarea
              rows={15}
              style={{ minWidth: "100%" }}
              placeholder="Describe yourself here..."
              {...register("text", { required: true, maxLength: 5000 })}
            ></textarea>
            <button
              className="btn btn-outline-danger float-right mt-3"
              type="submit"
            >
              Tweet
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );

  let showSuccess = () => {
    
    if(success===1){
      return <p className="text-success">Tweet Publish Successfully! <Link to={`/tweet/details/${tweetId}`}>View</Link></p>
    }else{
      return "";
    }
  }

  let showError = () => {
    if(error===1){
      return <p className="text-danger">Somting went Wrong! Please Try Again.</p>
    }
    else{
      return "";
    }
  }
   
  

  return (
    <>
      <Navbar></Navbar>
      {showSuccess()}
      {showError()}
      {showTweetForm()}
    </>
  );
};

export default CreateTweet;
