// import React, { useEffect } from "react";
// import { useFormState } from "react-use-form-state";
// import { Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { login, loginGoogleThunk, loginFacebook } from "../redux/auth/thunk";
// import { IRootState } from "../redux/store";
// import { Alert } from "react-bootstrap";
// import GoogleLogin from "react-google-login";
// import ReactFacebookLogin, {
//   ReactFacebookLoginInfo,
// } from "react-facebook-login";

// const LoginPage: React.FC = (state: {
//   children?: React.ReactNode;
//   location?: {
//     state?: {
//       pathname: string;
//     };
//   };
// }) => {
//   const [formState, { text, password }] = useFormState();
//   const dispatch = useDispatch();
//   const errMessage = useSelector((state: IRootState) => state.auth.message);

//   //console.log(state);

//   let previousLocation: string = "/";

//   if (state && state.location && state.location.state === undefined) {
//     previousLocation = "/";
//   } else if (
//     state &&
//     state.location &&
//     state.location.state &&
//     state.location.state.pathname
//   ) {
//     previousLocation = state.location.state.pathname;
//   }

//   const fBOnCLick = () => {
//     return null;
//   };

//   const fBCallback = (
//     userInfo: ReactFacebookLoginInfo & { accessToken: string }
//   ) => {
//     if (userInfo.accessToken) {
//       dispatch(loginFacebook(userInfo.accessToken, previousLocation));
//     }
//     return null;
//   };
//   //handle submit
//   function submitHandler(event: React.MouseEvent<HTMLElement, MouseEvent>) {
//     dispatch(
//       login(formState.values.email, formState.values.password, previousLocation)
//     );
//   }

//   const responseGoogle = (response: any) => {
//     if (response.accessToken) {
//       dispatch(loginGoogleThunk(response.accessToken, previousLocation));
//     }
//   };

//   useEffect(() => {
//     document.getElementById("website-header")!.style.display = "none";
//   }, []);

//   return (
//     <div>
//       <Form.Group controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control {...text("email")} required placeholder="Email" />
//         <Form.Text className="text-muted"></Form.Text>
//       </Form.Group>
//       <Form.Group controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           {...password("password")}
//           required
//           minLength={8}
//           placeholder="Password"
//         />
//       </Form.Group>
//       {errMessage ? <Alert variant="danger">{errMessage}</Alert> : ""}
//       <Button variant="primary" type="submit" onClick={submitHandler}>
//         Submit
//       </Button>

//       <GoogleLogin
//         clientId={`${process.env.REACT_APP_GOOGLE_APP_ID}`}
//         buttonText="Login"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//         cookiePolicy={"single_host_origin"}
//       />

//       <Form.Group>
//         <div className="fb-button">
//           <ReactFacebookLogin
//             appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
//             autoLoad={false}
//             fields="name,email,picture"
//             onClick={fBOnCLick}
//             callback={fBCallback}
//           />
//         </div>
//       </Form.Group>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState, ChangeEvent } from "react";
//import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { login, loginGoogleThunk, loginFacebook } from "../redux/auth/thunk";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { Alert, Form } from "react-bootstrap";
import GoogleLogin from "react-google-login";
import ReactFacebookLogin, {
  ReactFacebookLoginInfo,
} from "react-facebook-login";
import "./LoginPage.scss";
import FacebookLogin from "../components/CustomFacebookLogin";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage(state: {
  children?: React.ReactNode;
  location?: {
    state?: {
      pathname: string;
    };
  };
}) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errMessage = useSelector((state: IRootState) => state.auth.message);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const dispatch = useDispatch();

  let previousLocation: string = "/";

  if (state && state.location && state.location.state === undefined) {
    previousLocation = "/";
  } else if (
    state &&
    state.location &&
    state.location.state &&
    state.location.state.pathname
  ) {
    previousLocation = state.location.state.pathname;
  }

  let handleEmailChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setIsError(false);
    setEmail(event.target.value);
  };

  let handlePassWordChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setIsEmpty(false);
    setPassword(event.target.value);
  };

  //handle submit
  let submitHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setIsError(true);
      return;
    } else if (password.length === 0) {
      setIsEmpty(true);
      return;
    } else {
      dispatch(login(email, password, previousLocation));
    }
  };

  const responseGoogle = (response: any) => {
    if (response.accessToken) {
      dispatch(loginGoogleThunk(response.accessToken, previousLocation));
    }
  };

  const fBOnCLick = () => {
    return null;
  };

  const fBCallback = (
    userInfo: ReactFacebookLoginInfo & { accessToken: string }
  ) => {
    console.log(userInfo.accessToken);
    if (userInfo.accessToken) {
      dispatch(loginFacebook(userInfo.accessToken, previousLocation));
    }
    return null;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          登入帳戶
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={isError}
            helperText={isError ? "無效電郵格式" : ""}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="電郵地址"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            error={isEmpty}
            helperText={isEmpty ? "請輸入密碼" : ""}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="密碼"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassWordChange}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            登入
          </Button>

          <div>或以以下帳號登入</div>

          <div id="social-login-button-container">
            <GoogleLogin
              style={{ width: "40px", height: "40px" }}
              clientId={`${process.env.REACT_APP_GOOGLE_APP_ID}`}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    src={require("../pages/icons/1004px-Google__G__Logo.svg.png")}
                  />
                </button>
              )}
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />

            {/* <Form.Group>
              <div className="fb-button">
                {
                  <ReactFacebookLogin
                    buttonStyle={{ width: "230px" }}
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={fBOnCLick}
                    callback={fBCallback}
                  />
                }
              </div>
            </Form.Group> */}

            <FacebookLogin previousLocation />
          </div>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {errMessage ? <Alert variant="danger">{errMessage}</Alert> : ""}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
