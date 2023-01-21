import style from "./RecoveryPassword.module.css";
import { useRef } from "react";

const ResetPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const reset = async () => {
    const email = emailRef.current?.value;

    const data = {
      email
    };

    fetch('/api/mail/recoveryPassword', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.reset_container}>
          <input ref={emailRef} className={style.email_input} type="email" placeholder="enter your email" />
          <button className={style.send_button} onClick={reset}>Send Reset Link</button>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;