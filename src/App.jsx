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
//import getDog from "./utils/getDog";
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from "@mui/material/Tooltip";
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './App.css'

const getDog = async () => {
  const url = 'https://dog.ceo/api/breeds/image/random';
  const res = await fetch(url);
  return res.json();
};


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


return (
  <Grid container spacing={10} backgroundColor="#2CA4D8">

    <Grid item md={4} sm={12}>
      <Typography align="center" variant="h5" color="black" backgroundColor="white">
        Rechazados
      </Typography>
      {rejected.map((rechazado) => (
        <Card
          key={rechazado.name}
          sx={{
            backgroundColor: "white",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 200,
            minHeight: 200,
            maxWidth: 200,
            maxHeight: 200
          }}
        >
          <CardMedia
            component="img"
            height="140"
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

    <Grid item md={4} sm={6} sx={{ overflowY: 'auto', maxHeight: '85vh' }}>
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
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={dog.img}
            alt="DOG"
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


    <Grid item md={4} sm={6} sx={{ overflowY: 'auto', maxHeight: '85vh' }}>
      <Typography align="center" variant="h5" color="black" backgroundColor="white">
        Aceptados
      </Typography>
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
            height="140"
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
  )
}

export default App
