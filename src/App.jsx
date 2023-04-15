import { useEffect, useState } from "react";
import { Grid, Typography } from '@mui/material';
import getDog from "./utils/getDog";
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

    <Grid item md={4} xs={4}>

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
