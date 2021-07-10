import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Navbar from "../Navbar/NavbarShow";

const CreateTweet = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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

  return (
    <>
      <Navbar></Navbar>
      {showTweetForm()}
    </>
  );
};

export default CreateTweet;
