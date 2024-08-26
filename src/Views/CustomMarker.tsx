import React from 'react';
import { OverlayView } from '@react-google-maps/api';

interface Location {
  name: string;
  icon: string;
  latlng: string;
  color:string
}

interface CustomMarkerProps {
  location: Location;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ location }) => {
  const [lat, lng] = location.latlng.split(',').map(Number);

  const markerStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%) rotate(45deg)',
    backgroundColor: 'white',

    borderRadius: '50%',
    borderBottomRightRadius:"0",
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as React.CSSProperties;

  const imgStyle = {
    width: '20px',
    height: '20px',
    transform: 'rotate(-45deg)',
  } as React.CSSProperties;

  return (
    <OverlayView
      position={{ lat, lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={{
        ...markerStyle,
        borderColor:location.color
      }} className='relative border-2 '>
        <h1 className={`-rotate-45  text-white whitespace-nowrap !left-1/2  absolute top-full`}
        style={{
          backgroundColor:location.color
        }}>{location.name}</h1>
        <img src={location.icon} alt={location.name} style={imgStyle} />
      </div>
    </OverlayView>
  );
};

export default CustomMarker;
