import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import swal from 'sweetalert';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Axios from 'axios';
import { withRouter, Redirect, useHistory } from 'react-router-dom';



const theme = createTheme({
    typography: {
        fontFamily: 'NanumSquareRound'
    }
})
const useStyles = makeStyles((theme) => ({
    form: {
        width: '50%',
        marginTop: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(18),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'ariel'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    heading: {
        marginTop: 50,
        marginBottom: 50
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
  }));



  const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(false) 
    const history = useHistory();
    const isAuthed = !(window.sessionStorage.getItem('token') == null);

    const onSubmit = (e) => {
      e.preventDefault()
  
      const user = {
        email: email,
        password: password
      }
  
      Axios.post('http://localhost:8000/dormitory/auth/login/', user)
        .then(res => {
          if (res.data.key) {
            localStorage.clear()
            // 사용하려면 App.js에서 /로 라우팅해야 한다
            // window.location.replace(`/SelectDorm`);
            // window.location.href = "/SelectDorm";
            localStorage.setItem('token', res.data.key)
          } else {
            setEmail('')
            setPassword('')
            localStorage.clear()
            setErrors(true)
          }
        })
        .catch(err => {
          console.clear()
          alert('아이디 또는 비밀번호가 일치하지 않습니다')
          setEmail('')
          setPassword('')
        })
    }
  
    if (isAuthed) {
      return (
        <Redirect
          to={{
            pathname: '/'
          }}
        />
      );
    }
  

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth='md'>
            <CssBaseline />
            <div className={classes.paper} >
                <Typography className={classes.heading} variant="h3">
                    RC · 생활관 관리 운영 시스템
                </Typography>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        id="outlined-basic"
                        margin="normal" 
                        required
                        fullWidth
                        value={email}
                        type='email'
                        label="email"
                        name="email"

                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                        />
                    <TextField 
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        id="password" 
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
{/*                 <Link to="/SelectDorm">
 */}                    <Button
                        type = "submit"
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => onsubmit()}
                        onClick={() => {history.push("/SelectDorm")}} 
                        >
                        Log in
                    </Button>
{/*                 </Link>
 */}                </form> 
                </div>    
        </Container>
        </ThemeProvider>
    )
}
export default withRouter(Login)