import style from "./FullPageLoader.module.css";
import Loader from "components/Loader";
import { LoaderProps } from "types/loader/LoaderProps";

const FullPageLoader = (props: LoaderProps) => {
  const { show } = props;

  return (
    <>
      <div className={`${style.container} ${!show ? 'z-[-1] opacity-0' : 'z-50 opacity-100'}`}>
        <Loader />
      </div>
    </>
  );
}

export default FullPageLoader;