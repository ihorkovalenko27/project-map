import React from 'react';
import { useMap } from 'react-map-gl';
import s from './AdsList.module.css';

const AdsList = ({ data, onDeleteAds }) => {
  const { mymap } = useMap();

  const checkIfPositionInViewport = (mymap, latitude, longitude) => {
    const bounds = mymap && mymap.getMap().getBounds();
    const swLat = mymap && bounds._sw.lat;
    const neLat = mymap && bounds._ne.lat;
    const swLng = mymap && bounds._sw.lng;
    const neLng = mymap && bounds._ne.lng;
    const value =
      latitude >= swLat && latitude <= neLat && longitude >= swLng && longitude <= neLng;
    return value;
  };

  return (
    <>
      <div className={s.list}>
        <h1>Оголошення</h1>
        <ul>
          {data.map(
            ({ id, name, description, image, latitude, longitude }) =>
              checkIfPositionInViewport(mymap, latitude, longitude) && (
                <li key={id}>
                  <span className={s.text1}>{name}</span>
                  <img src={`${image}`} alt="" />
                  <span className={s.text2}>{description}</span>
                  <button onClick={() => onDeleteAds(id)}>Видалити</button>
                </li>
              ),
          )}
        </ul>
      </div>
    </>
  );
};

export default AdsList;
