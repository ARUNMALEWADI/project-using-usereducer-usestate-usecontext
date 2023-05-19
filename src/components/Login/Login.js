import React, { useState ,useEffect, useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const emailreducer=(state,action)=>{
  if(action.type==="user_input")
  {return { value:action.val,isvalid:action.val.includes('@')};
  }
  if(action.type==="input_blur")
  {
    return {value:state.value,isvalid:state.value.includes('@')};
  }
  return {value:'',isvalid:false};
}
const passwordreducer=(state,action)=>{
  if(action.type==="user_input")
  {return { value:action.val,isvalid:action.val.trim().length>6};
  }
  if(action.type==="input_blur")
  {
    return {value:state.value,isvalid:state.value.trim().length>6};
  }
  return {value:'',isvalid:false};
}

const clgreducer=(state,action)=>{
  if(action.type==="user_input")
  {return { value:action.val,isvalid:action.val.trim().length>0};
  }
  if(action.type==="input_blur")
  {
    return {value:state.value,isvalid:state.value.trim().length>0};
  }
  return {value:'',isvalid:false};
}


const Login = (props) => {

 
 const [formIsValid, setFormIsValid] = useState(false);
 const [emailstate,dispatchEmail]=useReducer(emailreducer,{value:'',isvalid:null});
const [passwordstate,dispatchPassword]=useReducer(passwordreducer,{value:'',isvalid:null});
const [clgstate,dispatchclg]=useReducer(clgreducer,{value:'',isvalid:null});

// const[]=useEffect()


  const emailChangeHandler = (event) => {
  dispatchEmail({type:"user_input" ,val:event.target.value});

  setFormIsValid(emailstate.value.includes('@')&&  passwordstate.isvalid && clgstate.isvalid)
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"input_blur"})
    
};





  const passwordChangeHandler = (event) => {
  dispatchPassword({type:'user_input',val:event.target.value})

  setFormIsValid(emailstate.value.includes('@')&&event.target.value.trim().length>6 && clgstate.isvalid)
  };

 
 
  const validatePasswordHandler = () => {
    dispatchPassword({type:"input_blur"})
   };
 
  
  const clgNameHandler=(event)=>{

    dispatchclg({type:'user_input',val:event.target.value});
setFormIsValid(emailstate.value.includes('@')&&event.target.value.trim().length>0 && passwordstate.isvalid)
  };

  
  
  
 const validateCLgHandler=()=>{
  dispatchclg({type:"input_blur"})
 }


  const submitHandler = (event) => {
    event.preventDefault();

    props.onLogin(emailstate.value, passwordstate.value,clgstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
         
        </div>
        <div  className={`${classes.control} ${
            clgstate.isvalid === false ? classes.invalid : ''
          }`}>
        <label>CollegeName</label>
          <input type='text' id='clg' 
          value={clgstate.value} 
          onBlur={validateCLgHandler}
          onChange={clgNameHandler}></input>
        </div>
        <div
          className={`${classes.control} ${
            passwordstate.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordstate.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
