import { useState, useMemo } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const mapStyleContainer = {
  width: '80%',
  height: '60vh',
  margin: "0 auto",
  marginBottom: "5em",
  borderRadius: "10px"
}

export default function MapContainer({address}) {
  console.log("API KEY:", import.meta.env.GOOGLE_API_KEY)
  return  <LoadScript
            id="script-loader"
            googleMapsApiKey={import.meta.env.GOOGLE_API_KEY}
            language="pt-br"
            region="BR"
            version="weekly"
          >
            <Map address={address} />;
          </LoadScript>
}

function Map({address}) {
  const center = useMemo(() => ({ lat: -7.224140, lng: -39.313411 }), []);
  const [selected, setSelected] = useState(null);

  if(address){
    (async function () {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
    
      setSelected({ lat, lng });
    })();
  }

  return (
    <>
      <GoogleMap
        zoom={selected ? 16 : 12}
        center={selected ? selected : center}
        mapContainerStyle={mapStyleContainer}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </>
  );
};
