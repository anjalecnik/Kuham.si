import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../Sidebar";
import "../../assets/css/styles.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dish from "../../assets/img/food-plate-vector-png-file-hd.png";

const Recepti = () => {
  const [recepti, setRecepti] = useState([]);

  useEffect(() => {
    const pridobiRecepte = () => {
      api.get("/recept").then((response) => {
        setRecepti(response.data);
      });
    };
    pridobiRecepte();
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
            <IconButton aria-label="add to favorites">
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
