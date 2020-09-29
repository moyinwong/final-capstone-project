import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import { loginFacebook } from "../redux/auth/thunk";

import React from "react";

function CustomFacebookLogin({ previousLocation }) {
  const dispatch = useDispatch();

  const fBOnCLick = () => {
    return null;
  };

  const fBCallback = (userInfo) => {
    if (userInfo.accessToken) {
      dispatch(loginFacebook(userInfo.accessToken, previousLocation));
    }
    return null;
  };
  return (
    <FacebookLogin
      style={{}}
      appId={process.env.REACT_APP_FACEBOOK_APP_ID || ""}
      autoLoad={false}
      fields="name,email,picture"
      onClick={fBOnCLick}
      callback={fBCallback}
      render={(renderProps) => (
        <button onClick={renderProps.onClick}>
          <img
            id="facebook-icon"
            src={require("../pages/icons/0000016_facebook-like-button-plugin.png")}
          />
        </button>
      )}
    />
  );
}

export default CustomFacebookLogin;
