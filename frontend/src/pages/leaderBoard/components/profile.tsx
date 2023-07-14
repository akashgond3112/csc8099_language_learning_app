import React from "react";
import { LeaderBoardResponse } from "../../../state/types";
import classes from "./profile.module.css";
import { useTheme } from "@mui/material";

type Props = {
  Leaderboard: LeaderBoardResponse[];
};

function Profiles({ Leaderboard }: Props) {
  const { palette } = useTheme();
  return (
    <>
      <div id={classes.profile}>
        {Leaderboard.map((value: LeaderBoardResponse, index) => (
          <div className={classes.flex} key={index}>
            <div className={classes.item}>
              <img src={value.img} alt={value.name} />

              <div className={classes.info}>
                <h3
                  className={classes["name"]}
                  style={{ color: palette.grey[300], fontSize: 20 }}
                >
                  {value.name}
                </h3>
                <span style={{ color: palette.grey[300], fontSize: 20 }}>
                  {value.location}
                </span>
              </div>
            </div>
            <div className={classes.item}>
              <span style={{ color: palette.grey[300], fontSize: 20 }}>
                {value.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Profiles;
