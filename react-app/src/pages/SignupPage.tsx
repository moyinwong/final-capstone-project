import React, { useState, ChangeEvent, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./SignupPage.scss";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { login } from "../redux/auth/thunk";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Clint Chow, Stanley Lau, Kelvin Wong. All rights reserved"}
      <Link color="inherit" href="https://e-ducate.life/">
        Browse Website
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupPage = () => {
  const classes = useStyles();
  const [firstName, setFirstName] =  useState("");
  const [lastName, setLastName] =  useState("");
  const [email, setEmail] =  useState("");
  const [password, setPassword] =  useState("");
  const [image, setImage] =  useState<File | null>(null);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);
  const [isLastNameEmpty, setIsLastNameEmpty] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const dispatch = useDispatch();
  
  let handleFirstNameChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setIsFirstNameEmpty(false);
    setFirstName(event.target.value);
  };

  let handleLastNameChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setIsLastNameEmpty(false);
    setLastName(event.target.value);
  };

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

  const fileSelector = document.getElementById('image');
  if(fileSelector) {
      fileSelector.addEventListener('change', (event: any) => {
        const fileList: File[] = event.target!.files;
        let image = fileList[0];
        setImage(image);
      });
  }

    //handle submit
  let submitHandler = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    if (firstName.length === 0) {
        setIsFirstNameEmpty(true);
        return;
    } else if (lastName.length === 0) {
        setIsLastNameEmpty(true);
        return;
    } else if (!email.match(/^[\w]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        setIsError(true);
        return;
    } else if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
        setIsEmpty(true);
        return;
    } else {
        let fullName = (`${lastName} ${firstName}`)
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', fullName);

        if (image) {
            formData.append('image', image);
        }

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
            method: 'POST',
            body: formData
        });
        const result = await res.json()

        if (res.status === 200) {
            dispatch(login(email, password));
        } else {
            setErrMessage(result.message);
        }
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>

        <Typography component="h1" variant="h5">
          註冊
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={isFirstNameEmpty}
                helperText={isFirstNameEmpty ? "請填寫名字" : ""}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="名"
                autoFocus
                onChange={handleFirstNameChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                error={isLastNameEmpty}
                helperText={isLastNameEmpty ? "請填寫姓氏" : ""}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="姓"
                name="lastName"
                autoComplete="lname"
                onChange={handleLastNameChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={isError}
                helperText={isError ? "無效電郵格式" : ""}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="電郵地址"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={isEmpty}
                helperText={isEmpty ? "密碼長度至少為8個字元，並至少包含1個數字、1個大寫英文字母、1個小寫英文字母" :  ''}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePassWordChange}
              />
            </Grid>

            <Grid item xs={12}>
                上傳你的個人頭像
            </Grid>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="file"
                id="image"
                name="image"
              />
            </Grid>

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            註冊
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2">
                已擁有帳戶? 登入
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>

      {errMessage && <Alert variant="danger">{errMessage}</Alert>}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignupPage;
