import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const history = useHistory();//history object for redirect
  const newPasswordInputRef = useRef();
  
  const authCtx   = useContext(AuthContext);//access token which is return 
  const submitHandler = event =>{
   event.preventDefault();// event.priventDefault useing for to avoid Byedefault nature of submithandler

    const eneredNewPassword = newPasswordInputRef.current.value;
   
    // add validation
    //fetch(1st= send the request).(2nd=succese and error case(when error will come ))
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC3bRHiJj9MDtKyAtFMzxfWuFftjdJSGW0',// fetch function is use to send request to server(1st argument="1 link = post request,update,send,delete,get, 2link= main project",2nd argument={for send the request}name of method/stringifiy data )
    {
      method:'POST',
      body: JSON.stringify({
        idToken:authCtx.token,//id token i stored here 
        password:eneredNewPassword,
        returnSecureToken:false
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      // assumption: Always succeeds!

       history.replace('/') //redirection by using history hooks 
       
    })




  }
  // this is for change the password by sending the request
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
