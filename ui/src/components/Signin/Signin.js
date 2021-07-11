import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { signin, authenticate, isAuthenticate  } from "../../api/auth";

import Navbar from '../Navbar/NavbarShow'

const Signin = () => {
  let [error, setError] = useState(0);
  let [loading, setLoading] = useState(false);
  let [redirect, setRedirect] = useState(false);

 // const {user} = isAuthenticate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  let onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    signin({ email, password }).then((data) => {
      if (data.error) {
        setError(data.error);
        setRedirect(false);
        setLoading(false);
      } else {
        authenticate(data, () => {
          setError(0);
          setValue("email", "", { shouldValidate: false });
          setValue("password", "", { shouldValidate: false });
          setLoading(false);
          setRedirect(true);
        });
      }
    });
  };

  const singUPForm = () => (
    <Container className="center">
      <Row>
        <Col md={8} className="offset-md-2">
        <h3 className="text-center">Signin</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email" className="text-muted">
                <strong>Email{" "}</strong>
                <span className="err">
                  {errors.email && "This Fields is Required"}
                </span>
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-muted">
                <strong>Password{" "}</strong> 
                <span className="err">
                  {errors.password && "This Fields is Required"}
                </span>
              </label>
              <input
                type="password"
                id="password"
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

  const showError = () => {
    console.log(error);
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const redirectUser = () => {
    if (redirect) {
          return <Redirect to="/user/profile" />;
    }

    if(isAuthenticate()){
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      <Navbar></Navbar>
      {showLoading()}
      {redirectUser()}
      {showError()}
      {singUPForm()}
    </>
  );
};

export default Signin;