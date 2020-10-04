import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import { loginFacebook } from "../redux/auth/thunk";

import React from "react";
import "./CustomFacebookLogin.scss";

function CustomFacebookLogin(props) {
  const dispatch = useDispatch();

  const previousLocation = props.previousLocation;
  const fBOnCLick = () => {
    return null;
  };

  // const responseFacebook = (response) => {
  //   console.log(response);
  // };

  const fBCallback = (userInfo) => {
    if (userInfo.accessToken) {
      console.log(previousLocation);
      dispatch(loginFacebook(userInfo.accessToken, previousLocation));
    }
    return null;
  };

  return (
    <>
      {console.log(process.env.REACT_APP_FACEBOOK_APP_ID || "")}
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
        autoLoad={false}
        fields="name,email,picture"
        onClick={fBOnCLick}
        callback={fBCallback}
        render={(renderProps) => (
          // <button onClick={renderProps.onClick} callback={renderProps.callback}>
          <img
            id="facebook-icon"
            src={require("../pages/icons/0000016_facebook-like-button-plugin.png")}
            onClick={renderProps.onClick}
            callback={renderProps.fBCallback}
            alt="facebook icon"
          />
          //</button>
        )}
      />
    </>
  );
}

export default CustomFacebookLogin;
