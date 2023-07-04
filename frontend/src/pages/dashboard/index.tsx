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
    name: "India",
    url: "https://flagcdn.com/128x96/in.png",
  },
  {
    name: "Spain",
    url: "https://flagcdn.com/128x96/es.png",
  },
  {
    name: "United Kingdom",
    url: "https://flagcdn.com/128x96/gb.png",
  },
  {
    name: "Turkey",
    url: "https://flagcdn.com/128x96/tr.png",
  },
  {
    name: "France",
    url: "https://flagcdn.com/128x96/fr.png",
  },
  {
    name: "Finland",
    url: "https://flagcdn.com/128x96/fi.png",
  },
  {
    name: "Germany",
    url: "https://flagcdn.com/128x96/de.png",
  },
  {
    name: "Greece",
    url: "https://flagcdn.com/128x96/gr.png",
  },
  {
    name: "Italy",
    url: "https://flagcdn.com/128x96/it.png",
  },
  {
    name: "South Korea",
    url: "https://flagcdn.com/128x96/kr.png",
  },
  {
    name: "China",
    url: "https://flagcdn.com/128x96/cn.png",
  },
];
