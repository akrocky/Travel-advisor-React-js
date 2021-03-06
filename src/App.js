

import { CssBaseline, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getplaceData } from './api';
import './App.css';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces,setFilterPlaces]=useState([])
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked,setChildClicked]= useState(null)
  const [isloading, setisloading] = useState(false)
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  // const [autocomplete, setAutocomplete] = useState(null);
  console.log(places,filteredPlaces);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);
  useEffect(() => {
    const filtered=places?.filter((place)=>place.rating==rating)
    setFilterPlaces(filtered)
  }, [rating])
  useEffect(() => {
    setisloading(true)
 bounds&& getplaceData(type,bounds.sw,bounds.ne)
.then((data)=>{
  setisloading(false)
  setPlaces(data)
  setFilterPlaces([])
})
  }, [type,coords,bounds])
  // const onLoad = (autoC) => setAutocomplete(autoC);

  // const onPlaceChanged = () => {
  //   const lat = autocomplete.getPlace().geometry.location.lat();
  //   const lng = autocomplete.getPlace().geometry.location.lng();

  //   setCoords({ lat, lng });
  // };
  return (
    < >
    <CssBaseline/>
    <Header />
    <Grid container spacing={3} style={{width:'100%'}}>
<Grid item xs={12} md={4} >
<List places={filteredPlaces.length?filteredPlaces:places}
childClicked={childClicked} isloading={isloading}
 type={type}
 setType={setType}
 rating={rating}
 setRating={setRating}/>
</Grid>
<Grid item xs={12} md={8} >
<Map  setCoords={setCoords} 
setBounds={setBounds}
coords={coords}
places={filteredPlaces.length?filteredPlaces:places}
setChildClicked={setChildClicked}/>
</Grid>
    </Grid>
   
  
   
  
    </>
  );
}

export default App;
