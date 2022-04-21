import { useEffect } from "react";
import { Link } from "react-router-dom";
import request from "@tripmini/utils-mp";
import styles from "./index.module.less";
import img from "../../assets/img/logo.jpg";

request.customizeInterceptor({
  request: [
    conf => {
      console.log("request_1 >>>", conf);
      return conf;
    },
    err => {
      console.log("request_2 >>>", err);
      return Promise.reject(err);
    },
  ],
  response: [
    conf => {
      console.log("response_1 >>>", conf);
      return conf;
    },
    err => {
      console.log("response_2 >>>", err);
      return Promise.reject(err);
    },
  ],
});

const Welcome = () => {
  const promise = async () => {
    return 1;
  };

  useEffect(() => {
    request({ url: "http://localhost:4999/tcp", data: { name: "wanpan" } });
    request({
      url: "http://localhost:4999/post",
      method: "post",
      data: { name: "wanpan" },
    });

    promise().then(e => {
      console.log(e);
    });
  }, []);

  return (
    <div className={styles.content_box}>
      <h1>start you react app</h1>

      <div className={styles.img_box}>
        <img src={img} alt="logo" className={styles.img} />
      </div>

      <button>
        <Link to="/list">list page</Link>
      </button>
    </div>
  );
};

export default Welcome;
