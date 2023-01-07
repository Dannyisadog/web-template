import style from "./Signin.module.css";
import Link from "next/link";

const DonePage = () => {
  return (
    <div className={style.done_page}>
      <p>Signed in</p>
      <Link href="/">
        <div className="border-2 p-2 rounded mt-2">Go Home Page</div>
      </Link>
    </div>
  )
}

export default DonePage;