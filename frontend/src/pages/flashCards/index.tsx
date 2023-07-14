import React, { useEffect, useRef, useState } from "react";
import FlashcardList from "./components/flashcardList";
import { fetchFlashCards, useGetFlashCardsQuery } from "../../state/api";
import { NewFlashCardResponse } from "../../state/types";
import axios from "axios";

const bloomsLevels: Array<string> = [
  "Knowledge",
  "Comprehension",
  "Application",
  "Analysis",
  "Synthesis",
  "Evaluation",
];

const FlashCards = () => {
  const difficultyLevelEl = useRef<HTMLSelectElement | null>(null);
  const bloomsLevelEl = useRef<HTMLSelectElement | null>(null);
  const amountEl = useRef<HTMLInputElement | null>(null);

  const [flashCardResponse, setflashCardResponse] = useState<
    NewFlashCardResponse[] | []
  >([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      difficultyLevelEl.current !== null &&
      bloomsLevelEl.current !== null &&
      amountEl.current !== null
    )
      fetchFlashCards(
        Number(amountEl.current.value),
        "arabic",
        difficultyLevelEl.current.value,
        bloomsLevelEl.current.value
      )
        .then((data: any) => {
          if (data.status === 200) {
            console.log(data.data);
            setflashCardResponse(data.data);
          }
        })
        .catch((error) => {
          // Handle error
          console.log(error);
        });
  };

  useEffect(() => {
    fetchFlashCards(10, "arabic", "easy", "Comprehension")
      .then((data: any) => {
        if (data.status === 200) {
          console.log(data.data);
          setflashCardResponse(data.data);
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  }, []);

  return (
    <>
      <form className={"flashCardHeader"} onSubmit={handleSubmit}>
        <div className={"form-group"}>
          <label htmlFor="difficultyLevel">Difficulty</label>
          <select id="difficultyLevel" ref={difficultyLevelEl}>
            <option value={"easy"}>Easy</option>
            <option value={"medium"}>Medium</option>
            <option value={"hard"}>Hard</option>
          </select>
        </div>

        <div className={"form-group"}>
          <label htmlFor="bloomsLevel">Blooms Level</label>
          <select id="bloomsLevel" ref={bloomsLevelEl}>
            {bloomsLevels.map((blooms: string, index: number) => {
              return <option value={blooms}>{blooms}</option>;
            })}
          </select>
        </div>

        <div className={"form-group"}>
          <label htmlFor="amount">Number of Flashcards</label>
          <input
            type="number"
            id="amount"
            min={"1"}
            step={"1"}
            defaultValue={10}
            ref={amountEl}
          ></input>
        </div>

        <div className={"form-group"}>
          <button className={"flashcardGenerateButton"}> Generate</button>
        </div>
      </form>
      <div style={{ padding: "0.5em", margin: "0.5em" }}>
        {flashCardResponse !== undefined && flashCardResponse.length > 0 && (
          <FlashcardList flashCardList={flashCardResponse[0]} />
        )}
      </div>
    </>
  );
};

export default FlashCards;
