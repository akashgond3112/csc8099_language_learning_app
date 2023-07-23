import { BoxProps, Box, Chip, Avatar } from "@mui/material";
import { useState } from "react";
import CountryCard from "./CountryCard";
import { Country } from "../../../state/types";
import CustomizedSnackbars from "../../../component/CustomizedSnackbars";

import { useAppDispatch, useAppSelector } from "../../../hooks/utils";
import { updateUserInfo } from "../../../store/actions/auth-actions";

type Props = {
  isNative: boolean;
  countries: Country[];
};

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

let tmp: String = "";

function CountryBox({ isNative, countries }: Props) {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.auth);

  const [selectedNativeLanguage, setselectedNativeLanguage] = useState(false);
  const [selectedNativeCountryName, setSelectednativeCountryName] =
    useState("");
  const [selectedNativeCountryImageUrl, setSelectedNativeCountryImageUrl] =
    useState("");

  const [selectedLanguageToLearn, setSelectedLanguageToLearn] = useState(false);
  const [selectedLanguageToLearnName, setSelectedLanguageToLearnName] =
    useState("");
  const [selectedLanguageToLearnImageUrl, setSelectedLanguageToLearnImageUrl] =
    useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCountrySelect = (_Country: Country, _isNativeIndex: boolean) => {
    if (_isNativeIndex && _Country !== undefined) {
      setselectedNativeLanguage(true);
      setSelectednativeCountryName(_Country.name);
      setSelectedNativeCountryImageUrl(_Country.url);
      tmp = _Country.name;

      /*Send a patch request to server to update the profile the info in redux store */

      if (
        token !== null &&
        _Country.name !== undefined &&
        _Country.url !== undefined &&
        _Country.name.length !== 0 &&
        _Country.url.length !== 0
      )
        dispatch(
          updateUserInfo(token, {
            nativeLanguage: _Country.name,
            nativeLanguageImageUrl: _Country.url,
          })
        );
    } else if (
      !_isNativeIndex &&
      _Country !== undefined &&
      tmp !== _Country.name
    ) {
      setSelectedLanguageToLearn(true);
      setSelectedLanguageToLearnName(_Country.name);
      setSelectedLanguageToLearnImageUrl(_Country.url);

      /*Send a patch request to server to update the profile the info in redux store */

      if (
        token !== null &&
        _Country.name !== undefined &&
        _Country.url !== undefined &&
        _Country.name.length !== 0 &&
        _Country.url.length !== 0
      )
        dispatch(
          updateUserInfo(token, {
            targetLanguage: _Country.name,
            targetLanguageImageUrl: _Country.url,
          })
        );
    } else {
      setError(true);
      setErrorMessage("Both native and lanuage to learn cannot be same");
    }
  };

  return (
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
      <Box>
        {isNative ? (
          <>
            {!selectedNativeLanguage ? (
              <Chip label="Select your native language." />
            ) : (
              <Chip
                avatar={
                  <Avatar
                    alt={selectedNativeCountryName}
                    src={selectedNativeCountryImageUrl}
                  />
                }
                label={selectedNativeCountryName}
                variant="outlined"
              />
            )}
          </>
        ) : (
          <>
            {!selectedLanguageToLearn ? (
              <Chip label="Select the langauge you want to Learn." />
            ) : (
              <Chip
                avatar={
                  <Avatar
                    alt={selectedLanguageToLearnName}
                    src={selectedLanguageToLearnImageUrl}
                    sx={{ width: 56, height: 56 }}
                  />
                }
                label={selectedLanguageToLearnName}
                variant="outlined"
                onDelete={
                  selectedLanguageToLearnName !== "" ? undefined : undefined
                }
              />
            )}
          </>
        )}
        {/*  */}
      </Box>
      {/* Select your native language*/}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        {countries.map((country: Country) => {
          return (
            <Item
              onClick={() => handleCountrySelect(country, isNative)}
              key={country.name}
            >
              <CountryCard country={country} />
            </Item>
          );
        })}
      </Box>
      {error ? (
        <CustomizedSnackbars
          errorType={"error"}
          errorMessage={errorMessage}
          openSnack={true}
        />
      ) : undefined}
    </Box>
  );
}

export default CountryBox;
