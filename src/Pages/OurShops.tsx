import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Container from '../Views/Container';
import ApiConfig from '../Api/ApiConfig';
import CustomMarker from '../Views/CustomMarker';
import { useEffect, useRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 35.7010476,
  lng: -0.6478989,
};
const icons = {
  hanouteek: ApiConfig.rootUrl + "/logo-1700126267928-818468360.webp",
  amir: ApiConfig.rootUrl + "/market png-1703598191310-240851212.webp",
  tania: ApiConfig.rootUrl + "/favicon-9-1702969701396-476639064.webp",
  millenium: ApiConfig.rootUrl + "/favicon-9-1703749562351-903330813.webp"
}

const locations = [
  {
    name: "Millenium 31",
    icon: icons.hanouteek,
    latlng: "35.7101569,-0.6015516",
    color: "#f5a10f",
  },
  {
    name: 'Hanouteek',
    icon: icons.hanouteek,
    latlng: '35.6867974,-0.652138',
    color: "#f5a10f",
  },
  {
    name: 'Hanouteek Belgaid',
    icon: icons.hanouteek,
    latlng: '35.7427887,-0.5451647',
    color: "#f5a10f",
  },
  {
    name: 'Hanouteek',
    icon: icons.hanouteek,
    latlng: '35.6879129,-0.6515382',
    color: "#f5a10f",
  },
  // {
  //   name: 'Hanouteek',
  //   icon: icons.hanouteek,
  //   latlng: '36.8974,7.7500',
  //   color: "#f5a10f",
  // },
]
export default function OurShops() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    fitBounds(map);
  };

  const fitBounds = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    locations.forEach((location) => {
      const [lat, lng] = location.latlng.split(',').map(Number);
      bounds.extend(new google.maps.LatLng(lat, lng));
    });
    map.fitBounds(bounds);
  };

  useEffect(() => {
    if (mapRef.current) {
      fitBounds(mapRef.current);
    }
  }, [locations]);
  return (
    <Container>
      <LoadScript googleMapsApiKey="AIzaSyDneDWCMwjucdNDK78yEa4VM58cSijNEqA">
        <GoogleMap
          onLoad={onLoad}
          mapContainerStyle={containerStyle}
          center={center}
          // zoom={10}
        >
          {locations.map((location, index) => {
            return (
              <CustomMarker
                key={index}
                location={location}

              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    </Container>
  )
}
