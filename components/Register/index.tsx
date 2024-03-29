import style from "./Register.module.css";
import { useRef } from "react";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { post } = useFetch({
    url: '/api/auth/register'
  });

  const registerHandler = async () => {
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

    const result = await post(data);

    if (result.ok) {
      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    }
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