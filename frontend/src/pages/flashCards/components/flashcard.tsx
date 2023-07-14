import React, { useState, useEffect, useRef } from "react";
import { wordResponse } from "../../../state/types";
import classes from "./flashcard.module.css";

type Props = {
  flashCard: wordResponse;
};

const Flashcard = ({ flashCard }: Props) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState(0);

  const frontEl = useRef<HTMLDivElement | null>(null);
  const backEl = useRef<HTMLDivElement | null>(null);

  function setmaxHeight() {
    const frontHeight: number | undefined =
      frontEl.current?.getBoundingClientRect().height;

    const backHeight: number | undefined =
      frontEl.current?.getBoundingClientRect().height;

    setHeight(
      Math.max(
        frontHeight !== undefined ? frontHeight : 0,
        backHeight !== undefined ? backHeight : 0,
        100
      )
    );
  }

  useEffect(setmaxHeight, [flashCard.word, flashCard.translation]);

  useEffect(() => {
    window.addEventListener("resize", setmaxHeight);
    return () => window.removeEventListener("resize", setmaxHeight);
  }, []);

  return (
    <>
      <div className={classes.main}>
        <div
          className={`${classes.card} ${flip ? classes.flip : ``}`}
          style={{ height: height }}
        >
          {/* Front side */}
          <div className={classes.front} ref={frontEl}>
            {flashCard.word}
          </div>

          {/* Back Side */}
          <div className={classes.back} ref={backEl}>
            {flashCard.translation}
          </div>
          {/* {flip ? flashCard.answer : flashCard.question} */}
        </div>
        <div className={classes.buttonContainer}>
          <div className={classes.flashCardButtons}>
            <div className={classes.flashCard_button}>
              <button
                className={classes.know_button}
                onClick={() => setFlip(!flip)}
              >
                Know
              </button>
            </div>
            <div className={classes.flashCard_button}>
              <button
                className={classes.dontKnow_button}
                onClick={() => setFlip(!flip)}
              >
                Don't Know
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flashcard;
