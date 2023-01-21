import style from "./Register.module.css";
import { useRef } from "react";

const Register = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const registerHandler = () => {
    const username = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirm = passwordConfirmRef.current?.value;

    const data = {
      username,
      email,
      password,
      passwordConfirm
    };

    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  return (
    <>
      <div className={style.signin_page} >
        <div className={style.credential_container}>
          <input className={style.input} ref={nameRef} placeholder="username" type="text" />
          <input className={style.input} ref={emailRef} placeholder="email" type="text" />
          <input className={style.input} ref={passwordRef} placeholder="password" type="password" />
          <input className={style.input} ref={passwordConfirmRef} placeholder="password-confirm" type="password" />
          <input className={style.submit} type="button" value="Register" onClick={registerHandler} />
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Register;