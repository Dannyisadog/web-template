import style from "./ResetPassword.module.css";
import { ResetPasswordProps } from "types/signin/PasswordProps";
import { useRef } from "react";
import useFetch from "hooks/useFetch";

const ResetPassword = (props: ResetPasswordProps) => {
  const { email } = props;

  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordConfirmRef = useRef<HTMLInputElement>(null);

  const { post } = useFetch({
    url: '/api/auth/resetPassword'
  })

  const reset = async () => {
    const newPassword = newPasswordRef.current?.value;
    const newPasswordConfirm = newPasswordConfirmRef.current?.value;

    const data = {
      newPassword,
      newPasswordConfirm,
      email
    }
    
    post(data);
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.password_container}>
          <input ref={newPasswordRef} className={style.input} type="password" placeholder="enter new password" />
          <input ref={newPasswordConfirmRef} className={style.input} type="password" placeholder="confirm" />
          <button className={style.reset_button} onClick={reset}>Reset Password</button>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;