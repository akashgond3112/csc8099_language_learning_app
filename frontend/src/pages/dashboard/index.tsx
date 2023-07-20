import { Country } from "../../state/types";
import image from "../../assets/images/multiLanguage.jpg";
import { useState } from "react";
import LanguageSelect from "./components/LanguageSelect";
import Popup from "../../component/Popup";

export default function Dashboard() {
  const [openPopup, setopenPopup] = useState(false);

  const handleClose = () => {
    setopenPopup(!openPopup);
  };

  return (
    <div
      style={{
        height: "100vh", // Adjust the height as needed
        width: "100%",
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!openPopup && (
        <button
          style={{
            padding: "1em",
            fontSize: "1.2em",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "2px solid #ffffff",
            borderRadius: "5px",
          }}
          onClick={() => handleClose()}
        >
          Let's Get started!
        </button>
      )}
      {openPopup && (
        <Popup
          title={"undefined"}
          openPopup={openPopup}
          setOpenPopUp={handleClose}
        >
          <LanguageSelect countries={countries} />
        </Popup>
      )}
    </div>
  );
}

const countries: Country[] = [
  {
    name: "arabic",
    url: "https://flagcdn.com/128x96/sa.png",
  },
  {
    name: "bangla",
    url: "https://flagcdn.com/128x96/bd.png",
  },
  {
    name: "brazilian",
    url: "https://flagcdn.com/128x96/br.png",
  },
  {
    name: "chineseTraditional",
    url: "https://flagcdn.com/128x96/cn.png",
  },
  {
    name: "chineseSimplified",
    url: "https://flagcdn.com/128x96/cn.png",
  },
  {
    name: "croatian",
    url: "https://flagcdn.com/128x96/hr.png",
  },
  {
    name: "dutch",
    url: "https://flagcdn.com/128x96/nl.png",
  },
  {
    name: "filipino",
    url: "https://flagcdn.com/128x96/ph.png",
  },
  {
    name: "french",
    url: "https://flagcdn.com/128x96/fr.png",
  },
  {
    name: "german",
    url: "https://flagcdn.com/128x96/de.png",
  },
  {
    name: "greek",
    url: "https://flagcdn.com/128x96/gr.png",
  },
  {
    name: "hindi",
    url: "https://flagcdn.com/128x96/in.png",
  },
  {
    name: "indonesian",
    url: "https://flagcdn.com/128x96/id.png",
  },
  {
    name: "italian",
    url: "https://flagcdn.com/128x96/it.png",
  },
  {
    name: "japanese",
    url: "https://flagcdn.com/128x96/jp.png",
  },
  {
    name: "korean",
    url: "https://flagcdn.com/128x96/kr.png",
  },
  {
    name: "polish",
    url: "https://flagcdn.com/128x96/pt.png",
  },
  {
    name: "russian",
    url: "https://flagcdn.com/128x96/ru.png",
  },
  {
    name: "serbian",
    url: "https://flagcdn.com/128x96/rs.png",
  },
  {
    name: "spanish",
    url: "https://flagcdn.com/128x96/es.png",
  },
  {
    name: "english",
    url: "https://flagcdn.com/128x96/gb.png",
  },
  {
    name: "swedish",
    url: "https://flagcdn.com/128x96/se.png",
  },
  {
    name: "thai",
    url: "https://flagcdn.com/128x96/th.png",
  },
  {
    name: "turkish",
    url: "https://flagcdn.com/128x96/tr.png",
  },
];
