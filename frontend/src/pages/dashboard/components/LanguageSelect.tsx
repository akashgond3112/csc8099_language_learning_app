import { Box } from "@mui/material";
import React from "react";
import CountryBox from "./CountryBox";
import { Country } from "../../../state/types";

type Props = {
  countries: Country[];
};

function LanguageSelect({ countries }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      {/* Select your native language main*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {/* Select your native language header*/}
        <CountryBox isNative={true} countries={countries} />
      </Box>
      {/* Select the language you want to learn main*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {/* Select the language you want to learn header*/}
        <CountryBox isNative={false} countries={countries} />
      </Box>
    </Box>
  );
}

export default LanguageSelect;
