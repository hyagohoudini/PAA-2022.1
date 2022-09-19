import { Box } from "@skynexui/components";
import arquivo from "../../g1.json";
import Readmore from "../components/Readmore/Readmore.js";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

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
            label="Search field"
            type="search"
            variant="filled"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
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
                      (findCommonElement(news.topics, item.topics) && item.liked) && (
                        <li> - {news.title}</li>
                      )
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
