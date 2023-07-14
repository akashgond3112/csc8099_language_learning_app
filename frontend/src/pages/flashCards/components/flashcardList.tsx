import React from "react";
import { NewFlashCardResponse, wordResponse } from "../../../state/types";
import Flashcard from "./flashcard";

import classes from "./flashcardList.module.css"

type Props = {
  flashCardList: NewFlashCardResponse;
};

const FlashcardList = ({ flashCardList }: Props) => {
  return (
    <div className={classes.card_grid}>
      {flashCardList.words.map((flashCard: wordResponse) => {
        return <Flashcard flashCard={flashCard} key={flashCard.id} />;
      })}
    </div>
  );
};

export default FlashcardList;
