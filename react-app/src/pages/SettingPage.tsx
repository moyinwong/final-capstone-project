import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
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
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { Alert, Image, Modal } from "react-bootstrap";
import './SettingPage.scss';
import { getUser, logout } from '../redux/auth/actions';
import { IRootState } from '../redux/store';
import { CircularProgress } from '@material-ui/core';

//sleep function
const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

interface IUser {
    email: string;
    name: string;
    id: number;
    isTutor: boolean | null;
    image: string;
}

//material-UI related styling
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

//main component
const SettingPage = () => {
    const classes = useStyles();
    const [firstName, setFirstName] =  useState("");
    const [lastName, setLastName] =  useState("");
    const [email, setEmail] =  useState("");
    const [password, setPassword] =  useState("");
    const [profilePicture, setProfilePicture] = useState('');
    const [image, setImage] =  useState<File | null>(null);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isFirstNameEmpty, setIsFirstNameEmpty] = useState(false);
    const [isLastNameEmpty, setIsLastNameEmpty] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const userId = useSelector((state: IRootState) => state.auth.id);
    const userEmail = useSelector((state: IRootState) => state.auth.email);
    const token = useSelector((state: IRootState) => state.auth.token);
    const dispatch = useDispatch();

    //react bootstrap
    const[show, setShow] = useState(false)
    const[stripeURL, setStripeURL] = useState('')
    const[isSubmitting, setIsSubmitting] = useState(false)

    const handleClose = () => setShow(false);

    //get user info 
    let getUserInfo = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/info`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        if (res.status != 200) {
            alert('something is wrong')
            return;
        }
        const json = await res.json();
        let user:IUser = json.user;
        
        let fullName = user.name.split(' ')
        
        //fill in user info into input field
        setFirstName(fullName[1])
        setLastName(fullName[0])
        setProfilePicture(user.image)
        setEmail(user.email)
    }


    useEffect(() => {
        getUserInfo()
    }, [])

    //fill in user info into input field when useState occur
    useEffect(() => {
        let firstNameField = document.getElementById('firstName') as HTMLInputElement
        if (firstNameField) {
            firstNameField.value = firstName
        }
        let lastNameField = document.getElementById('lastName') as HTMLInputElement
        if (lastNameField) {
            lastNameField.value = lastName
        }
        let emailField = document.getElementById('email') as HTMLInputElement
        if (emailField) {
            emailField.value = email
        }
    }, [firstName, lastName, email])
    
    //changeHandler for individual field
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
  
    //access file input
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

      //validation logic for individual field
      if (firstName.length === 0) {
          setIsFirstNameEmpty(true);
          return;
      } else if (lastName.length === 0) {
          setIsLastNameEmpty(true);
          return;
      } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
          setIsError(true);
          return;
      } else if (password.length > 0 && 
        !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)) {
            setIsEmpty(true);
            return;
      } else {
          let fullName = (`${lastName} ${firstName}`)
          let formData = new FormData();
          formData.append('email', email);
          formData.append('name', fullName);
  
          if (image) {
              formData.append('image', image);
          }
          if (password) {
            formData.append('password', password);
          }
  
          const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/edit-profile/${userId}`, {
              method: 'PUT',
              body: formData
          });
          const result = await res.json()
  
          if (res.status === 200) {
              setErrMessage('Successfully edited your profile! Please login again')
              await sleep(2000);
              localStorage.removeItem("token");
              dispatch(logout());
              dispatch(push('/login'));
          } else {
              setErrMessage(result.message);
          }
      }
    };

    let handleStripe = async () => {
        setIsSubmitting(true)
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/payment/create-stripe-connect-account/${userEmail}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (res.status != 200) {
            alert('something is wrong')
            return;
        }

        const result = await res.json()
        const stripeUrl = result.url;
        setStripeURL(stripeUrl);
        setShow(true);
        setIsSubmitting(false);
    }
    
    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}> */}
          {/* <LockOutlinedIcon /> */}
        {/* </Avatar> */}

        <Typography component="h1" variant="h5">
          更改你的帳戶資料
        </Typography>

        <div>
            {profilePicture.match(/http/) ? <Image id="edit-user-image" src={profilePicture}></Image> : <Image id="edit-user-image" src={`http://localhost:8080/img/${profilePicture}`}/>}
        </div>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                defaultValue={firstName}
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
                defaultValue={`${lastName}`}
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
                defaultValue={email}
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
                label="更加密碼"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlePassWordChange}
              />
            </Grid>

            <Grid item xs={12}>
                更改你的個人頭像
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
            更改
          </Button>


        </form>

        <Button
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleStripe}
            disabled={isSubmitting ? true : false}
          >
            成為導師
          </Button>
      </div>

      {errMessage && <Alert variant="success">{errMessage}</Alert>}
      <Box mt={5}>
        <Copyright />
      </Box>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>前往Stripe填寫Stripe用戶資料</Modal.Title>
        </Modal.Header>

        <Modal.Body><a onClick={() => setShow(false)} href={stripeURL} target="_blank">{stripeURL}</a></Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    )
}

export default SettingPage
