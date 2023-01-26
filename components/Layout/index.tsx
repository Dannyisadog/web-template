import { LayoutProps } from "types/layout/LayoutProps";
import style from "./Layout.module.css";
import FullPageLoader from "components/FullPageLoader";
import { useSelector } from 'react-redux'
import { RootState } from "redux/store";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"
import { useDispatch } from "react-redux";
import { show, hide } from "redux/features/loader/loaderSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import { resetMsg } from "redux/features/globalAlert/globalAlertSlice";

const Layout = (props: LayoutProps) => {
  const { status } = useSession();
  const { children } = props;
  const showLoader = useSelector((state: RootState) => state.loader.show);
  const showAlert = useSelector((state: RootState) => state.globalAlert.hasAlert);
  const errorMsg = useSelector((state: RootState) => state.globalAlert.errorMsg);
  const warningMsg = useSelector((state: RootState) => state.globalAlert.warningMsg);
  const infoMsg = useSelector((state: RootState) => state.globalAlert.infoMsg);
  const successMsg = useSelector((state: RootState) => state.globalAlert.successMsg);
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      dispatch(show());
      dispatch(resetMsg());
    })

    router.events.on('routeChangeComplete', () => {
      dispatch(hide());
    })

    return () => {
      router.events.off('routeChangeStart', () => {
        dispatch(hide());
      })
    }
  }, [])

  const signout = async () => {
    dispatch(show());
    await signOut();
    dispatch(hide());
  }
  return (
    <>
      <nav className={style.nav}>
        <div className={style.left_container}>
          <Link href="/" className={style.logo}>Template</Link>
          <ul className={style.item_container}>
            <Link className={style.link} href="/">Home</Link>
          </ul>
        </div>
        <div>
          {status !== 'authenticated' && <Link className={style.link} href="/signin">Signin</Link>}
          {status === 'authenticated' && <div className={style.link} onClick={() => {
            signout();
          }} >Signout</div>}
        </div>
      </nav>
      <main>
        {children}
      </main>
      {showAlert && <div className={style.alert_container}>
        { errorMsg && <Alert severity="error">{errorMsg}</Alert> }
        { warningMsg && <Alert severity="warning">{warningMsg}</Alert> }
        { infoMsg && <Alert severity="info">{infoMsg}</Alert> }
        { successMsg && <Alert severity="success">{successMsg}</Alert> }
      </div>}
      <FullPageLoader show={showLoader} />
    </>
  );
}

export default Layout;