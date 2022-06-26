import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import AdsList from '../AdsList/AdsList';
import s from './Map.module.css';
import house from '../../assets/house.png';
const API_ACCESS =
  'pk.eyJ1Ijoic2VyaGl5bWFzaGtvdiIsImEiOiJjbDRrNDN1b2owajVzM2RxZnpvcDJsZWJ1In0.yeu444qHZfJ3h2zug3h3jA';

const MapSchema = ({ data, onDeleteAds }) => {
  const [viewState, setViewState] = useState({
    latitude: 50.44119,
    longitude: 30.578009,
    zoom: 10,
  });

  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedPark(null);
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <>
      <div className={s.container}>
        <Map
          id="mymap"
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          style={{ width: 1280, height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={API_ACCESS}
        >
          {data.map(park => (
            <Marker
              key={park.id}
              latitude={park.latitude}
              longitude={park.longitude}
              onClick={e => {
                e.originalEvent.stopPropagation();
              }}
            >
              <button
                className={s.marker}
                onClick={e => {
                  e.preventDefault();
                  setSelectedPark(park);
                }}
              >
                <img src={house} alt="house" />
              </button>
            </Marker>
          ))}
          {selectedPark ? (
            <Popup
              latitude={selectedPark.latitude}
              longitude={selectedPark.longitude}
              onClose={() => {
                setSelectedPark(null);
              }}
            >
              <div className={s.mainPopup}>
                <h2 className={s.mainText}>{selectedPark.name}</h2>
                <img width="100%" src={`${selectedPark.image}`} alt="" />
                <p>{selectedPark.description}</p>
              </div>
            </Popup>
          ) : null}
        </Map>

        <AdsList data={data} onDeleteAds={onDeleteAds} />
      </div>
    </>
  );
};

export default MapSchema;
