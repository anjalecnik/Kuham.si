import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../Sidebar";
import "../../assets/css/styles.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dish from "../../assets/img/food-plate-vector-png-file-hd.png";

const Recepti = () => {
  const [recepti, setRecepti] = useState([]);
  const [priljubljeni, setPriljubljeni] = useState([]);

  const pridobiPriljubljene = () => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      api
        .get(`/priljubljeni-recepti?uporabnikId=${userId}`, {
          timeout: 5000,
        })
        .then((response) => {
          setPriljubljeni(response.data);
        })
        .catch((error) => {
          console.error("Priljubljeni recepti", error);
        });
    }
  };

  useEffect(() => {
    const pridobiRecepte = () => {
      api.get("/recept").then((response) => {
        setRecepti(response.data);
      });
    };

    pridobiRecepte();
    pridobiPriljubljene();
  }, []);

  function generate() {
    return recepti.map((recept, index) => (
      <div key={index} style={{ flexBasis: "20vw", margin: "8px" }}>
        <Card sx={{ minWidth: "26vw" }} key={index}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {recept.avtor.uporabniskoIme.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={recept.naziv}
            subheader={recept.avtor.uporabniskoIme}
          />
          <CardMedia
            component="img"
            height="194"
            image={Dish}
            alt="Fotografija jedi"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {recept.opis}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                api
                  .post("/priljubljeni-recepti/dodaj-med-priljubljene", {
                    idRecepta: recept.id,
                    idUporabnika: sessionStorage.getItem("userId"),
                  })
                  .then((response) => {
                    const noviPriljubljeni = [
                      ...priljubljeni,
                      { recept: { id: recept.id } },
                    ];
                    setPriljubljeni(noviPriljubljeni);
                  });
              }}
              style={{
                color: priljubljeni.some(
                  (entry) => entry.recept.id === recept.id
                )
                  ? red[500]
                  : "inherit",
                disabled: priljubljeni.some(
                  (entry) => entry.recept.id === recept.id
                )
                  ? true
                  : false,
                display: sessionStorage.getItem("userId") ? "block" : "none",
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    ));
  }

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <div>
          <h1>Seznam vseh receptov</h1>
          <div style={{ display: "flex", flexWrap: "wrap" }}>{generate()}</div>
        </div>
      </div>
    </div>
  );
};

export default Recepti;
