import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { TRootState } from "../redux/store";
import "./jokesList.component.css";
import "./jokesList.loader.component.css";

export default function JokesList({
  type,
  addPage,
}: {
  type: string;
  addPage: () => void;
}) {
  const jokes = useSelector((state: TRootState) => state);
  const renderingJokes = jokes.filter((v) =>
    type !== "" ? v.type === type : true
  );

  useEffect(() => {
    let element: HTMLElement = document.getElementById("jokes")!;
    element.scrollTo(0, element.scrollTop);
  }, []);

  return (
    <div
      id="jokes"
      onScroll={(e) => {
        let element: HTMLElement = document.getElementById("jokes")!;
        if (
          element.scrollHeight - element.scrollTop - 3 - element.clientHeight <
          -2
        ) {
          addPage();
        }
      }}
    >
      <ul>
        {jokes.length > 0 ? (
          renderingJokes.map((v, i) => (
            <li className="joke" key={i}>
              <h3>{v.setup}</h3>
              <h2>{v.punchline}</h2>
              <h4>{v.type}</h4>
            </li>
          ))
        ) : (
          <div className="loader">
            <div className="lds-grid">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}
