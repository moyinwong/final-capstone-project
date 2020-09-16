import React from "react";
import { useFormState } from "react-use-form-state";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogleThunk } from "../redux/auth/thunk";
import { IRootState } from "../redux/store";
import { Alert } from "react-bootstrap";
import GoogleLogin from "react-google-login";

function LoginPage() {
  const [formState, { text, password }] = useFormState();
  const dispatch = useDispatch();
  const errMessage = useSelector((state: IRootState) => state.auth.message);

  //handle submit
  function submitHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    dispatch(login(formState.values.email, formState.values.password));
  }

  const responseGoogle = (response: any) => {
    if (response.accessToken) {
      dispatch(loginGoogleThunk(response.accessToken));
    }
  };

  return (
    <div>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control {...text("email")} required placeholder="Email" />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...password("password")}
          required
          minLength={8}
          placeholder="Password"
        />
      </Form.Group>
      {errMessage ? <Alert variant="danger">{errMessage}</Alert> : ""}
      <Button variant="primary" type="submit" onClick={submitHandler}>
        Submit
      </Button>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_APP_ID}`}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      ,
    </div>
  );
}

export default LoginPage;
