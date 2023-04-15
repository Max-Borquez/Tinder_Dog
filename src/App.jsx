import { useState } from 'react'
import { Box, Grid } from '@mui/material';
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

return (
  <Box>
    <h1>Tinder Dog</h1>
    <Grid container spacing={10}>

      <Grid item md={4} sm={6}>

      </Grid>

      <Grid item md={4} xs={4}>

      </Grid>

      <Grid item md={4} sm={6} sx={{ overflowY: 'auto', maxHeight: '85vh' }}>

      </Grid>
    </Grid>
  </Box>
  )
}

export default App
