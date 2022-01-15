
import axios from "axios";





export const getplaceData= async(type,sw,ne)=>{

  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': '5c6ea75fc5msh8eefd6f290c4281p19baeajsnd12589cc016f'
    }
  })
return data;
    }
    catch(err){
console.log(err);
    }
}