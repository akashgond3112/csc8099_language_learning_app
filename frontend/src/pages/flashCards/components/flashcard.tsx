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
      backEl.current?.getBoundingClientRect().height;

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

  const cardFaceFrontClasses = [classes.card__face, classes.card__face__front];
  const cardFaceBackClasses = [classes.card__face, classes.card__face__back];

  let cardInnerClasses = [classes.card__inner];

  if (flip) {
    cardInnerClasses = [classes.card__inner, classes.is__flipped];
  }

  return (
    <>
      <div className={classes.card}>
        <div className={cardInnerClasses.join(" ")}>
          <div className={cardFaceFrontClasses.join(" ")}>
            <h2>{flashCard.word}</h2>
          </div>
          <div className={cardFaceBackClasses.join(" ")}>
            <div className={classes.card__content}>
              <div className={classes.card__header}>
                <img
                  width="96"
                  height="96"
                  src="https://img.icons8.com/color/96/great-britain-circular.png"
                  alt="great-britain-circular"
                  className="pp"
                />
                <h4>Total Points {flashCard.total_points}</h4>
              </div>
              <div className={classes.card__body}>
                <h2>{flashCard.translation}</h2>
              </div>
            </div>
          </div>
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
