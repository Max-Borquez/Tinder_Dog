import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Background from "../src/assets/Background.jpg";
import { LoremIpsum } from "lorem-ipsum";

const styles = {
  backgroundImage: `url(${Background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const getDog = async () => {
  const url = "https://dog.ceo/api/breeds/image/random";
  const res = await fetch(url);
  return res.json();
};

const generateName = (num) => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let name = " ";
  const charactersLength = caracteres.length;
  for (let i = 0; i < num; i++) {
    name += caracteres.charAt(Math.floor(Math.random() * charactersLength));
  }
  return name;
};

function App() {
  const [dog, setDog] = useState([{ name: "", img: "", desc: "" }]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDog().then((data) => {
      setDog({
        name: generateName(6),
        img: data.message,
        desc: new LoremIpsum().generateSentences(1),
      });
      setLoading(false);
    });
  }, []);

  const handleClickAccept = () => {
    setLoading(true);
    setAccepted((dogPrevious) => [dog, ...dogPrevious]);

    getDog().then((data) => {
      setDog({
        name: generateName(6),
        img: data.message,
        desc: new LoremIpsum().generateSentences(1),
      });
      setLoading(false);
    });
  };

  const handleClickReject = () => {
    setLoading(true);
    setRejected((dogPrevious) => [dog, ...dogPrevious]);

    getDog().then((data) => {
      setDog({
        name: generateName(6),
        img: data.message,
        desc: new LoremIpsum().generateSentences(1),
      });
      setLoading(false);
    });
  };

  const handleClickSwitchAccept = (dog) => {
    const newAccepted = rejected.filter((perro) => perro.name !== dog.name);
    setRejected(newAccepted);
    setAccepted((prev) => [dog, ...prev]);
    setLoading(false);
  };

  const handleClickSwitchReject = (dog) => {
    const newRejected = accepted.filter((perro) => perro.name !== dog.name);
    setAccepted(newRejected);
    setRejected((prev) => [dog, ...prev]);
    setLoading(false);
  };

  return (
    <div style={styles}>
      <Grid container spacing={10}>
        <Grid item md={4} sm={12}>
          <Typography
            align="center"
            variant="h5"
            color="black"
            sx={{ backgroundColor: "white", marginBottom: "20px" }}
          >
            Perrito nuevo
          </Typography>
          <Card sx={{ maxWidth: 400, mt: 1 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <CardMedia
                      component="img"
                      height="200"
                      width="auto"
                      image={dog.img}
                      alt="new_Dog"
                    />
                    <Typography gutterBottom variant="h5" component="div">
                      {dog.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {dog.desc}
                    </Typography>
                  </>
                )}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Tooltip title="Aceptar">
                <span>
                  <IconButton
                    disabled={loading}
                    color="success"
                    onClick={handleClickAccept}
                  >
                    <DoneIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Rechazar">
                <span>
                  <IconButton
                    disabled={loading}
                    color="error"
                    onClick={handleClickReject}
                  >
                    <ClearIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>

        <Grid item md={4} sx={{ overflowY: "auto", maxHeight: "85vh" }}>
          <Typography
            align="center"
            variant="h5"
            color="black"
            sx={{ backgroundColor: "white", marginBottom: "20px" }}
          >
            Aceptados
          </Typography>

          <div id="CardBack">
            {accepted.map((aceptado) => (
              <Card
                key={aceptado.name}
                sx={{
                  backgroundColor: "white",
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  maxWidth: 400,
                  minWidth: 200,
                  marginBottom: "20px",
                  mt: 1
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  width="auto"
                  image={aceptado.img}
                  alt={aceptado.name}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {aceptado.name}
                  </Typography>
                  <Typography paragraph>{aceptado.desc}</Typography>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Tooltip title="Cambiar">
                      <span>
                        <IconButton
                          disabled={loading}
                          color="info"
                          onClick={() => handleClickSwitchReject(aceptado)}
                        >
                          <ArrowForwardIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>

        <Grid item md={4} sx={{ overflowY: "auto", maxHeight: "85vh" }}>
          <Typography
            align="center"
            variant="h5"
            color="black"
            sx={{ backgroundColor: "white", marginBottom: "20px" }}
          >
            Rechazados
          </Typography>
          <div id="CardBack">
            {rejected.map((rechazado) => (
              <Card
                key={rechazado.name}
                sx={{
                  backgroundColor: "white",
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  maxWidth: 400,
                  minWidth: 200,
                  marginBottom: "20px",
                  mt: 1
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  width="auto"
                  image={rechazado.img}
                  alt={rechazado.name}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {rechazado.name}
                  </Typography>
                  <Typography paragraph>{rechazado.desc}</Typography>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Tooltip title="Cambiar">
                      <span>
                        <IconButton
                          disabled={loading}
                          color="info"
                          onClick={() => handleClickSwitchAccept(rechazado)}
                        >
                          <ArrowBackIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </CardActions>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
