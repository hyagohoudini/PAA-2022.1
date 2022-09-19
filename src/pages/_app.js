import { Toaster } from "react-hot-toast";
import "../../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <GlobalStyle />
      <Component {...pageProps} />;
    </>
  );
}

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: "Open Sans", sans-serif;
      }
      .container {
        position: absolute;
        top: 10%;
        left: 23%;
        width: 50%;
      }

      .text {
        display: inline;
        width: 100%;
      }

      .read-or-hide {
        color: rgb(192, 192, 192);
        color: black;
        cursor: pointer;
        font-weight: 700;
      }
      .news-links {
        cursor: pointer;
      }
      a {
        color: blue;
      }
    `}</style>
  );
}

export default MyApp;
