import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  CircularProgress
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  const [dog, setDog] = useState([{ name: "", img: "" }]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDog().then((data) => {
      setDog({ name: generateName(6), img: data.message });
      setLoading(false);
    });
  }, []);

  const handleClickAccept = () => {
    setLoading(true);
    setAccepted((dogPrevious) => [dog, ...dogPrevious]);

    getDog().then((data) => {
      setDog({ name: generateName(6), img: data.message });
      setLoading(false);
    });
  };

  const handleClickReject = () => {
    setLoading(true);
    setRejected((dogPrevious) => [dog, ...dogPrevious]);

    getDog().then((data) => {
      setDog({ name: generateName(6), img: data.message });
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
    <Grid container spacing={10} style={{ backgroundColor: "#2CA4D8" }}>
      <Grid item md={4} sx={{ overflowY: "auto", maxHeight: "85vh" }}>
        <Typography
          align="center"
          variant="h5"
          color="black"
          sx={{ backgroundColor: "white" }}
        >
          Rechazados
        </Typography>
        <br />
        {rejected.map((rechazado) => (
          <Card
            key={rechazado.name}
            sx={{
              backgroundColor: "white",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 100,
            }}
          >
            <CardMedia
              component="img"
              height="300"
              width="100%"
              image={rechazado.img}
              alt={rechazado.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {rechazado.name}
              </Typography>
              <CardActions>
                <Tooltip title="Cambiar">
                  <span>
                    <IconButton
                      disabled={loading}
                      color="info"
                      onClick={() => handleClickSwitchAccept(rechazado)}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </Grid>

      <Grid item md={4} sm={12}>
        <Typography
          align="center"
          variant="h5"
          color="black"
          sx={{ backgroundColor: "white" }}
        >
          Nuevo Perro
        </Typography>
        <br />
        {loading ? (
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <CircularProgress />
              </Typography>
            </CardContent>
            <CardActions>
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
        ) : (
          <Card >
            <CardMedia
              component="img"
              height="300"
              width={"100%"}
              image={dog.img}
              alt="new_Dog"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {dog.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Tooltip title="Aceptar">
                <span>
                  <IconButton color="success" onClick={handleClickAccept}>
                    <DoneIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Rechazar">
                <span>
                  <IconButton color="error" onClick={handleClickReject}>
                    <ClearIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </CardActions>
          </Card>
        )}
      </Grid>

      <Grid item md={4} sx={{ overflowY: "auto", maxHeight: "85vh" }}>
        <Typography
          align="center"
          variant="h5"
          color="black"
          sx={{ backgroundColor: "white" }}
        >
          Aceptados
        </Typography>
        <br />
        {accepted.map((aceptado) => (
          <Card
            key={aceptado.name}
            sx={{
              backgroundColor: "white",
              boxShadow: 1,
              borderRadius: 2,
              p: 2,
              minWidth: 100,
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={aceptado.img}
              alt={aceptado.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {aceptado.name}
              </Typography>
              <CardActions>
                <Tooltip title="Cambiar">
                  <span>
                    <IconButton
                      disabled={loading}
                      color="info"
                      onClick={() => handleClickSwitchReject(aceptado)}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}

export default App;
