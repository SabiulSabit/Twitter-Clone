import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Navbar from '../Navbar/NavbarShow'

//api method
import {signup} from '../../api/auth.js'
import { isAuthenticate  } from "../../api/auth";


const Signup = () => {

  //state
  let [error, setError] = useState(0);
  let [success, setSuccess] = useState(0);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  
  //on submit handeler
  let onSubmit = (data) => {
    const { name, email, password } = data;
    signup({ name, email, password }).then((data) => {
     // console.log(data.error, data.err);
      if (data.error) {
        setError(data.error);
        setSuccess(0);
      } else {
        setSuccess(1);
        setError(0);
        setValue("name", "", { shouldValidate: false });
        setValue("email", "", { shouldValidate: false });
        setValue("password", "", { shouldValidate: false });
      }
    });
  };

  //sing up form
  const singUPForm = () => (
    <Container className="center">
      <Row>
        <Col md={8} className="offset-md-2">
          <h3 className="text-center">Signup</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name" className="text-muted">
                <strong>Name </strong>
                <span className="err">
                  {errors.name && "This Field is Required"}
                </span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="form-control"
                {...register("name", { required: true, maxLength: 32 })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-muted">
                <strong>Email </strong>
                <span className="err">
                  {errors.email && "This Field is Required"}
                </span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className="form-control"
                {...register("email", { required: true })}
              />
            </div>
          
            <div className="form-group">
              <label htmlFor="password" className="text-muted">
                <strong>Password </strong>
                <span className="err">
                  {errors.password && "This Fields is Required"}
                </span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                className="form-control"
                {...register("password", { required: true })}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
 
  //show error msg
  const showError = () => {
    //console.log(error);
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  //show success msg
  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Account Create Successfully. Please <Link to="/signin">Signin</Link>
      </div>
    );
  };
  
    //redirect user
    const redirectUser = () => {

      if(isAuthenticate()){
        return <Redirect to="/" />;
      }
    };
    
  return (
  <>
    <Navbar></Navbar>
      {showSuccess()}
      {showError()}
      {singUPForm()}
      {redirectUser()}
    </>
  );
};

export default Signup;
