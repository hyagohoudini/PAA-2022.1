import { Box } from "@skynexui/components";
import Head from "next/head";
import Image from "next/image";
import arquivo from "../../g1.json";
import Readmore from "../components/Readmore/Readmore.js";

export default function Home() {
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <h1>
          TESTE DE PARSING
          <style jsx>{`
            h1 {
              font-size: 10rem;
              font-weight: 700;
              text-transform: uppercase;
              text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
              animation: glitch 500ms infinite;
            }
            @keyframes glitch {
              0% {
                text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                  -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
              }
              15% {
                text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                  0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
              }
              50% {
                text-shadow: 0.025em -0.025em 0 rgba(255, 0, 0, 0.75),
                  0.05em 0 0 rgba(0, 255, 0, 0.75),
                  0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
              }
              100% {
                text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                  -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
              }
            }
          `}</style>
        </h1>
        {arquivo.map((item) => {
          const auxDate = new Date(item.pubDate);
          return (
            <Box
              key={item.id}
              styleSheet={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "80%",
                marginBottom: "5%",
                backgroundColor: "white",
                color: "black",
                padding: "2%",
                borderRadius: "2%",
              }}
            >
              <Box>
                <h2>{item.title}</h2>
                <p>
                  <em>{item.subTitle}</em>
                </p>

                <p>
                  <small>
                    <i>{auxDate.toUTCString().slice(0, 22)}</i>
                  </small>
                </p>
              </Box>
              {item?.image && (
                <img
                  src={item.image}
                  style={{ height: "400px", maxWidth: "600px" }}
                />
              )}
              <Readmore>{item.content}</Readmore>
              <a href={item.link}>Clique para visitar a página</a>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
