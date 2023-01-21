import SigninProps from "types/signin/SigninProps"
import { signIn } from "next-auth/react";
import style from "./Signin.module.css";
import { useSession } from "next-auth/react"
import { useEffect } from "react";
import Link from "next/link";
import { useRef, useState } from "react";

const SigninPage = (props: SigninProps) => {
  const { providers } = props;
  const { status } = useSession();
  const [errorMsg, setErrorMsg] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "authenticated") {
      location.href = "/signin/done";
    }
  }, [status]);

  const signin = async (provider: any) => {
    if (provider === 'credentials') {
      const result = await signIn(provider, {
        callbackUrl: '/signin/done',
        redirect: false,
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      })
      
      const { error } = result;
      setErrorMsg(error);      
    } else {
      signIn(provider, {
        callbackUrl: '/signin/done',
      })
    }
  }

  return (
    <>
      <div className={style.signin_page} >
        <div className={style.credential_container}>
          {errorMsg && <div className={style.err_msg}>{errorMsg}</div>}
          <input ref={emailRef} className={style.input} placeholder="email" type="text" />
          <input ref={passwordRef} className={style.input} placeholder="password" type="password" />
          <div className={style.register_container}>
            <Link href="/recovery/password" className={style.register_link}>Forgot Password</Link>
            <Link href="/register" className={style.register_link}>Register</Link>
          </div>
        </div>
        <div className={style.container}>
          {Object.values(providers).map((provider) => (
            <div className={style.signin_button_container} key={provider.name}>
              <button
                className={style.signin_button}
                onClick={() => {
                  signin(provider.id)
                }}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SigninPage
