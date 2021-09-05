import { makeStyles } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import logo from 'admin/assets/img/bi_img01.png';
import { LoginContext } from 'admin/contexts/LoginContext';

const useStyles = makeStyles({
  container: {
    paddingTop: '100px',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logoBox: {
    marginTop: '200px',
  },
  logo: {
    width: '300px',
    height: '300px',
    objectFit: 'contain',
  },
  idBox: {
    marginBottom: '4px',
  },
  pwdBox: {
    marginBottom: '4px',
  },
  id: {
    boxSizing: 'border-box',
    width: '300px',
    height: '40px',
    fontSize: '1.1rem',
  },
  pwd: {
    boxSizing: 'border-box',
    width: '300px',
    height: '40px',
    fontSize: '1.1rem',
  },
  loginButtonBox: {
    marginTop: '20px',
  },
  loginButton: {
    boxSizing: 'border-box',
    width: '300px',
    height: '40px',
    fontSize: '1.1rem',
    backgroundColor: '#0D82CB',
    color: 'white',
    borderStyle: 'none',
    borderRadius: '3px',
  },
  error: {
    color: 'red',
    fontSize: '0.7rem',
  },
});

const Login = () => {
  const classes = useStyles();
  // const { setIsLogin } = useContext(LoginContext);
  // const [id, setID] = useState('');
  // const [pwd, setPWD] = useState('');
  const [error, setError] = useState(false);

  // const handleClick = () => {
  //   if (id === 'admin' && pwd === 'admin') {
  //     window.localStorage.setItem('isLogin', true);
  //     setIsLogin(true);
  //   } else setError(true);
  // };

  // const handleChange = (event) => {
  //   const {
  //     target: { name, value },
  //   } = event;
  //   if (name === 'id') setID(value);
  //   else if (name === 'pwd') setPWD(value);
  // };

  const handleLoginClick = () => {
    window.location.href = `${process.env.REACT_APP_CHECKIN_API_URL}/user/login`;
  };

  return (
    <div className={classes.container}>
      <div className={classes.logoBox}>
        <img src={logo} alt="logo" className={classes.logo} />
      </div>
      {/* <div className={classes.idBox}>
        <input
          className={classes.id}
          value={id}
          onChange={handleChange}
          name="id"
          placeholder="아이디를 입력해주세요."
        />
      </div>
      <div className={classes.pwdBox}>
        <input
          className={classes.pwd}
          type="password"
          value={pwd}
          onChange={handleChange}
          name="pwd"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>
      <div className={classes.loginButtonBox}>
        <button className={classes.loginButton} onClick={handleClick}>
          로그인
        </button>
      </div> */}
      <div className={classes.loginButtonBox}>
        <button className={classes.loginButton} onClick={handleLoginClick}>
          42 로그인
        </button>
      </div>
      {error && <div className={classes.error}>아이디 또는 비밀번호를 확인하세요.</div>}
    </div>
  );
};

export default Login;
