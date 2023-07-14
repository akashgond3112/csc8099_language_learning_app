import React, { useState } from "react";
import { useGetLeaderBoardQuery } from "../../state/api";
import { LeaderBoardResponse } from "../../state/types";
import Profiles from "./components/profile";
import { Typography, useTheme } from "@mui/material";

function between(data: LeaderBoardResponse[], between: number) {
  const today = new Date();
  const previous = new Date(today);
  previous.setDate(previous.getDate() - (between + 1));

  let filter = data.filter((val: LeaderBoardResponse) => {
    let userDate = new Date(val.date);
    if (between === 0) return val;
    return previous <= userDate && today >= userDate;
  });

  return filter.sort((a, b) => {
    if (a.score === b.score) {
      return b.score - a.score;
    } else {
      return b.score - a.score;
    }
  });
}

function Leaderboard() {
  const [period, setPeriod] = useState(0);
  const { palette } = useTheme();

  const { data, error, isLoading, isFetching, isSuccess } =
    useGetLeaderBoardQuery();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const datasetId = target.dataset.id;

    if (datasetId) {
      const newPeriod = parseInt(datasetId, 10) ?? 0;
      setPeriod(newPeriod);
    }
  };

  const button = {
    border: "1px solid var(--color-light)",
    padding: ".5em 2em",
    borderRadius: "50px",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: palette.grey[300],
    fontSize: 20,
  };

  return (
    <div className="board" style={{ textAlign: "center" }}>
      <h1
        className="leaderboard"
        style={{ marginBottom: "1em", color: palette.grey[300], fontSize: 20 }}
      >
        Leaderboard
      </h1>
      <div
        className="duration"
        style={{ display: "flex", justifyContent: "center", gap: "1em" }}
      >
        <button onClick={handleClick} data-id="7" style={button}>
          7 Days
        </button>
        <button onClick={handleClick} data-id="30" style={button}>
          30 Days
        </button>
        <button onClick={handleClick} data-id="0" style={button}>
          All-Time
        </button>
      </div>
      {isLoading && <Typography>Loading...</Typography>}
      {error && <Typography>Something went wrong</Typography>}
      {isFetching && <Typography>Fetching...</Typography>}
      {isSuccess && <Profiles Leaderboard={between(data, period)}></Profiles>}
    </div>
  );
}

export default Leaderboard;
