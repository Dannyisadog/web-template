import SigninProps from "types/signin/SigninProps"
import { signIn } from "next-auth/react";
import style from "./Signin.module.css";
import { useSession } from "next-auth/react"
import { useEffect } from "react";

const SigninPage = (props: SigninProps) => {
  const { providers } = props;
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      location.href = "/";
    }
  }, []);

  return (
    <div className={style.signin_page} >
      <div className={style.container}>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className={style.signin_button}
              onClick={() => {
                signIn(provider.id, {
                  callbackUrl: '/signin/done'
                })
              }}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SigninPage
