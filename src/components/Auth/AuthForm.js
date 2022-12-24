// import { useState, useRef } from 'react';

// import classes from './AuthForm.module.css';

// const AuthForm = () => {
//   const emailInputRef = useRef();
//   const passwordInputRef= useRef();
//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading]=useState(false)

//   const switchAuthModeHandler = () => {
//     setIsLogin((prevState) => !prevState);
//   };
//   const submitHandler =(event) =>{
//     event.preventDefault();
//     const enterdEmail = emailInputRef.current.value;
//     const enterdPassword = passwordInputRef.current.value;
//     // optinal:add validation
//     setIsLoading(true);
//     let url;
//     if(isLogin) {
//       url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3bRHiJj9MDtKyAtFMzxfWuFftjdJSGW0"

//     } else{
//       url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3bRHiJj9MDtKyAtFMzxfWuFftjdJSGW0"    
//      }
     
//      fetch(url,{
//         method:'POST',
//         body: JSON.stringify({
//           email: enterdEmail,
//           password: enterdPassword,
//           returnSecureToken: true
//         }),
//         headers:{
//           'Content-Type': 'application/json'
//         }


//       })
//       .then((res)=>{ 
//         setIsLoading(false);
//         if(res.ok){
//           // ...
//           return res.json();
 

          
//         }else {
//           return res.json().then((data)=>{
//             // show an error modal
//             let errorMessage ="Authantication failed";
//             // if(data && data.error && data.error.message){
//             //   errorMessage = data.error.message;
//             // }
//             // alert(errorMessage);
            
//             // when the authantication is err or when user are alredy logoin

//             throw new Error(errorMessage);// as a message we have to throw
            
//           })
//         }
        
//       }).then(data =>{
//         console.log(data); //for the succesfull request
//       }).catch(err=>{
//         alert(err.message);
         
//       })

//     }


//  return (
//     <section className={classes.auth}>
//       <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
//       <form onSubmit={submitHandler}>
//         <div className={classes.control}>
//           <label htmlFor='email'>Your Email</label>
//           <input type='email' id='email' required  ref={emailInputRef}/>
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='password'>Your Password</label>
//           <input type='password' id='password' required ref={passwordInputRef}/>
//         </div>
//         <div className={classes.actions}>
//           {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
//           {isLoading && <p>Sending request.........</p>}
//           <button
//             type='button'
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//           >
//             {isLogin ? 'Create new account' : 'Login with existing account'}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default AuthForm;





import { useState, useRef , useContext} from 'react';
import AuthContext from '../store/auth-context';
import {useHistory} from 'react-router-dom'
import classes from './AuthForm.module.css';

const AuthForm = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading]=useState(false)
  
  const history = useHistory();
  const authCtx = useContext(AuthContext);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };







//user input - postHTTP request for new account
  const emailInputRef = useRef();
  const passwordInputRef= useRef();




// if {isLogin}(
//   request for only pass.
// )else{ 
//   signUp (create newAccount)
// }
  



  const submitHandler =(event) =>{
    event.preventDefault();
    const enterdEmail = emailInputRef.current.value;
    const enterdPassword = passwordInputRef.current.value;



    // add validation


    setIsLoading(true);
    let url;
    if(isLogin) {
      url ="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3bRHiJj9MDtKyAtFMzxfWuFftjdJSGW0"

    } else{
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3bRHiJj9MDtKyAtFMzxfWuFftjdJSGW0"    
     }
     

    //  fetch(url(API){sending request object})
    // return response (promise)
     fetch(url,{
        method:'POST',
        body: JSON.stringify({
          email: enterdEmail,
          password: enterdPassword,
          returnSecureToken: true
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then((res)=>{ 
        setIsLoading(false);
        if(res.ok){
          return res.json();
        }else {
          return res.json().then((data)=>{
            // show an error modal
            let errorMessage ="Authantication failed";
            throw new Error(errorMessage);// as a message we have to throw
          })
        }
        
        // this is for success case 
      }).then(data =>{ //token get from fire base
        const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
       authCtx.login(data.idToken,expirationTime.toISOString());
       history.replace('/');
      // history hook for redirect (user can not go back button )

      //  when promise is rejected 
      }).catch(err=>{  //when no error  (successful request case )
        alert(err.message);//when error 
         
      })

    }


 return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {/* !(not) isLoding && show button isLogin:createAccounts  */}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request.........</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

