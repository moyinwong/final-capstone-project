import React, { useEffect } from "react";
import { useFormState } from "react-use-form-state";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogleThunk, loginFacebook } from "../redux/auth/thunk";
import { IRootState } from "../redux/store";
import { Alert } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import ReactFacebookLogin, {
  ReactFacebookLoginInfo,
} from "react-facebook-login";

const LoginPage: React.FC = (state: {
  children?: React.ReactNode;
  location?: {
    state?: {
      url: {
        pathname: string;
      };
    };
  };
}) => {
  const [formState, { text, password }] = useFormState();
  const dispatch = useDispatch();
  const errMessage = useSelector((state: IRootState) => state.auth.message);

  //console.log(state);

  let previousLocation: string = "/";

  if (state && state.location && state.location.state === undefined) {
    previousLocation = "/";
  } else if (
    state &&
    state.location &&
    state.location.state &&
    state.location.state.url.pathname
  ) {
    previousLocation = state.location.state.url.pathname;
  }
  // if (state.location.state.url.pathname)
  //

  console.log(previousLocation);

  const fBOnCLick = () => {
    return null;
  };

  const fBCallback = (
    userInfo: ReactFacebookLoginInfo & { accessToken: string }
  ) => {
    if (userInfo.accessToken) {
      dispatch(loginFacebook(userInfo.accessToken, previousLocation));
    }
    return null;
  };
  //handle submit
  function submitHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    dispatch(
      login(formState.values.email, formState.values.password, previousLocation)
    );
  }

  const responseGoogle = (response: any) => {
    if (response.accessToken) {
      dispatch(loginGoogleThunk(response.accessToken, previousLocation));
    }
  };

  useEffect(() => {
    document.getElementById("website-header")!.style.display = "none";
  }, []);

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

      <Form.Group>
        <div className="fb-button">
          <ReactFacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
            autoLoad={false}
            fields="name,email,picture"
            onClick={fBOnCLick}
            callback={fBCallback}
          />
        </div>
      </Form.Group>
    </div>
  );
};

export default LoginPage;
