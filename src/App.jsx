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
import getDog from "./utils/getDog";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import './App.css'


const generateName = (num) => {
  const caracteres ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let name= ' ';
  const charactersLength = caracteres.length;
  for ( let i = 0; i < num; i++ ) {
      name += caracteres.charAt(Math.floor(Math.random() * charactersLength));
  }
  return name;
}

function App() {
  const [dog, setDog] = useState([{name:'', img:''}])
  const [accepted, setAccepted] = useState([])
  const [rejected, setRejected] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDog().then((data) => {
      setDog({ name: generateName(6), img: data.message });
      setLoading(false);
    });
  }, []);

  const handleClickAccept = () => {
    setLoading(true);
    setAccepted((dogPrevious) => [dog, ...dogPrevious]); // Agrega el perro a la lista de perros accepted

    getDog().then((data) => {
      setDog({ name: generateName(6), img: data.message }); // Genera un nuevo perro
      setLoading(false);
    });
  };

  const handleClickReject = () => {
    setLoading(true);
    setRejected((dogPrevious) => [dog, ...dogPrevious]); // Agrega el perro a la lista de perros rejected

    getDog().then((data) => {
      setDog({ name: generateName(6), img: data.message }); // Genera un nuevo perro
      setLoading(false);
    });
  };

  const handleClickSwitchAccept = (dog) => {
    //funcion para cambiar al perro a accepted
    const newAccepted = rejected.filter((perro) => perro.name !== dog.name);
    setRejected(newAccepted);
    setAccepted((prev) => [dog, ...prev]);
    setLoading(false);
  };

  const handleClickSwitchReject = (dog) => {
    //funcion para cambiar al perro a rejected
    const newRejected = accepted.filter((perro) => perro.name !== dog.name);
    setAccepted(newRejected);
    setRejected((prev) => [dog, ...prev]);
    setLoading(false);
  };


  const styles = {
    paperContainer: {
      height: 1356,
      backgroundImage: `url(${"../public/Fondo.png"})`,
    },
  };

return (
  <Grid container spacing={10} style={styles.paperContainer}>

    <Grid item md={4} sm={6}>
      <Typography align="center" variant="h5" color="black" backgroundColor="white">
        Rechazados
      </Typography>
    </Grid>

    <Grid item md={4} sm={12}>
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
                  <FavoriteIcon />
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
                  <DoNotDisturbIcon />
                </IconButton>
              </span>
            </Tooltip>
          </CardActions>
        </Card>
      ) : (
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={dog.img}
            alt="DOGO"
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
                  <FavoriteIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Rechazar">
              <span>
                <IconButton color="error" onClick={handleClickReject}>
                  <DoNotDisturbIcon />
                </IconButton>
              </span>
            </Tooltip>
          </CardActions>
        </Card>
      )}
    </Grid>


    <Grid item md={4} sm={6}>
      <Typography align="center" variant="h5" color="black" backgroundColor="white">
        Aceptados
      </Typography>
    </Grid>
  </Grid>
  )
}

export default App
