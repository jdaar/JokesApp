import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import JokesList from "./components/JokesList";
import { addJokes } from "./redux/store";
import { IJoke } from "./redux/type";
import "./app.css";

export default function App() {
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const getNewJoke = () => {
    Axios.request({
      url: `https://official-joke-api.appspot.com${
        type !== "" ? "/jokes/" + type : "/jokes"
      }/ten`,
      transformResponse: (r) => r.data,
    }).then((response) => {
      const data: Array<IJoke> = JSON.parse(response.request.response);
      console.log(data);
      for (let x of data) {
        dispatch(addJokes(x));
      }
    });
  };

  const addPage = () => setPage(page + 1);

  useEffect(getNewJoke, [dispatch, page]);

  const changeSection = (section: string) => {
    setType(section);
    let element: HTMLElement = document.getElementById("jokes")!;
    element.scrollTo(0, element.scrollTop);
  };

  return (
    <div className="app">
      <div className="home">
        <div className="coloredWrapper"></div>
        <div className="title">
          <h1>Jokes</h1>
        </div>
        <div className="lineWrapper">
          <div className="line"></div>
        </div>
        <JokesList type={type} addPage={addPage}></JokesList>
      </div>
      <footer>
        <div className="typeBtnWrapper">
          <button
            className={"typeBtn" + (type === "programming" ? " checked" : "")}
            onClick={(e) => changeSection("programming")}
          >
            Programming
          </button>
          <button
            className={"typeBtn" + (type === "general" ? " checked" : "")}
            onClick={(e) => changeSection("general")}
          >
            General
          </button>
          <button
            className={"typeBtn" + (type === "knock-knock" ? " checked" : "")}
            onClick={(e) => changeSection("knock-knock")}
          >
            Knock
          </button>
          <button
            className={"typeBtn" + (type === "" ? " checked" : "")}
            onClick={(e) => changeSection("")}
          >
            All
          </button>
          <div
            className="dropdown"
            onClick={(e) => {
              let element = document.getElementById("dc")!;
              if (element.className.includes("toggled")) {
                element.className = element.className.replace(" toggled", "");
              } else {
                element.className += " toggled";
              }
            }}
          >
            <span>
              {type === ""
                ? "All"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <div className="dropdown-content" id="dc">
              <button onClick={(e) => changeSection("")}>All</button>
              <button onClick={(e) => changeSection("programming")}>
                Programming
              </button>
              <button onClick={(e) => changeSection("general")}>General</button>
              <button onClick={(e) => changeSection("knock-knock")}>
                Knock-knock
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
