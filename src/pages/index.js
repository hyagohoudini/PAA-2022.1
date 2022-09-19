import { Box } from "@skynexui/components";
import arquivo from "../../g1.json";
import Readmore from "../components/Readmore/Readmore.js";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Fab, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import FormDialog from "../components/Dialog";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import toast from "react-hot-toast";
import ClearLikes from "../components/ClearLikes";

export default function Home() {
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [likes, setLikes] = useState([]);
  const [aux, setAux] = useState([]);

  useEffect(() => {
    setLikes(localStorage.getItem("news"));
    if (likes === null) {
      setLikes([]);
    }
    setAux(localStorage.getItem("all"));
  }, [refresh]);

  console.log(aux);

  function findCommonElement(arr1, arr2) {
    // Create an empty object
    let obj = {};

    // Loop through the first array
    for (let i = 0; i < arr1.length; i++) {
      // Check if element from first array
      // already exist in object or not
      if (!obj[arr1[i]]) {
        // If it doesn't exist assign the
        // properties equals to the
        // elements in the array
        const element = arr1[i];
        obj[element] = true;
      }
    }

    // Loop through the second array
    for (let j = 0; j < arr2.length; j++) {
      // Check elements from second array exist
      // in the created object or not
      if (obj[arr2[j]]) {
        return true;
      }
    }
    return false;
  }

  const sectionsRefs = useRef([]);
  sectionsRefs.current = [];
  const addToRefs = (el) => {
    if (el && !sectionsRefs.current.includes(el)) {
      sectionsRefs.current.push(el);
    }
  };
  const scroll = (param) => {
    setSearch("");
    const parte = sectionsRefs.current.filter((section) => {
      if (section.innerText === param) {
        return section;
      }
    });
    try {
      window.scrollTo({ top: parte[0].offsetTop - 95, behavior: "smooth" });
    } catch (e) {
      setRefresh(true);
    }
  };

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
        <Fab
          style={{
            position: "fixed",
            bottom: "10%",
            right: "4%",
            marginTop: "auto",
          }}
          color="default"
          aria-label="navigate"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <ArrowCircleUpOutlinedIcon />
        </Fab>
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            marginBottom: "5%",
            marginTop: "5%",
            backgroundColor: "white",
            color: "black",
            padding: "2%",
            borderRadius: "2%",
          }}
        >
          <TextField
            fullWidth
            id="filled-search"
            label="Buscar notícia"
            type="search"
            variant="filled"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Box
            styleSheet={{
              display: "flex",
            }}
          >
            <FormDialog />
            <ClearLikes />
          </Box>
        </Box>
        {arquivo
          .filter((val) => {
            if (search == "") {
              return val;
            } else if (
              val.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((item) => {
            const auxDate = new Date(item.pubDate);
            if (likes.includes(item.title)) {
              item.liked = true;
            }
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
                <Box key={Math.random()}>
                  <h2 ref={addToRefs}>{item.title}</h2>
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
                    style={{ height: "40%", width: "100%" }}
                  />
                )}
                <Readmore>{item.content}</Readmore>
                <Box
                  styleSheet={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <Box
                    styleSheet={{
                      margin: "1% 2% 0 2%",
                    }}
                    onClick={() => {
                      item.liked = !item.liked;
                      localStorage.setItem("news", [likes, `${item.title}`]);
                      setRefresh(!refresh);
                    }}
                  >
                    {item.liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                    {item.liked ? (
                      <ThumbDownOutlinedIcon />
                    ) : (
                      <ThumbDownAltIcon />
                    )}
                  </Box>

                  <a href={item.link}>Clique para visitar a página</a>
                </Box>
                <lu>
                  {arquivo.map((news) => {
                    if (news.title === item.title) {
                      return;
                    }
                    return (
                      <>
                        {findCommonElement(news.topics, item.topics) &&
                          item.liked && (
                            <li
                              onClick={() => {
                                setSearch("");
                                setRefresh(true);
                                scroll(news.title);
                              }}
                            >
                              {" "}
                              <Box
                                className="news-links"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "1%",
                                }}
                              >
                                <OpenInNewOutlinedIcon /> {news.title}
                              </Box>
                            </li>
                          )}
                      </>
                    );
                  })}
                </lu>
              </Box>
            );
          })}
      </Box>
    </>
  );
}
