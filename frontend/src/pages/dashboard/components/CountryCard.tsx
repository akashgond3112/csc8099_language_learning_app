import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Country } from "../../../state/types";
import { CardActionArea } from "@mui/material";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={country.url}
          alt="green iguana"
          style={{ padding: 10 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            {country.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
