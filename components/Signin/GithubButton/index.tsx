import style from "../Signin.module.css";

interface GithubButtonProps {
  signin: () => void;
}

const GithubButton = (props: GithubButtonProps) => {
  const {
    signin
  } = props;

  return (
    <>
      <button
        onClick={signin}
        className={`${style.signin_button}`}
      >
        Sign in with Github
      </button>
    </>
  );
}

export default GithubButton;