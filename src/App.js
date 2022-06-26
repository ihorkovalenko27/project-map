import React, { useState } from 'react';
import { MapProvider } from 'react-map-gl';
import MapSchema from './components/Map/Map';
import shortid from 'shortid';
import Container from './components/Container/Container';
import AddForm from './components/AddForm/AddForm';
import 'mapbox-gl/dist/mapbox-gl.css';

const App = () => {
  const [data, setData] = useState([
    {
      id: 'id-1',
      name: 'Party House',
      description: 'A house party is a party held at a big house in the country',
      longitude: 30.505911,
      latitude: 50.504339,
      status: false,
      image: 'https://api.lorem.space/image/house?w=152&h=153',
    },
    {
      id: 'id-2',
      name: 'Town House',
      description: 'Towne House Apartments provide to the highest standards',
      longitude: 30.552603,
      latitude: 50.398753,
      image: 'https://api.lorem.space/image/house?w=151&h=151',
    },
    {
      id: 'id-3',
      name: 'Flat',
      description: 'A flat is defined as a suite of rooms in a big building which forms a society',
      longitude: 30.64427,
      latitude: 50.469388,
      image: 'https://api.lorem.space/image/house?w=150&h=152',
    },
  ]);

  const getRandomCoordinates = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const getRandomIntImg = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const randomSize = getRandomIntImg(150, 160);

  const addNewData = (name, description) => {
    const newData = {
      id: shortid.generate(),
      name,
      description,
      longitude: getRandomCoordinates(30.3, 30.852603),
      latitude: getRandomCoordinates(50.3, 50.708753),
      image: `https://api.lorem.space/image/house?w=${randomSize}&h=${randomSize}`,
    };

    setData([newData, ...data]);
  };

  const removeAds = id => {
    setData(data.filter(ads => ads.id !== id));
  };

  return (
    <Container>
      <AddForm onSubmit={addNewData} />
      <MapProvider>
        <MapSchema data={data} onDeleteAds={removeAds} />
      </MapProvider>
    </Container>
  );
};

export default App;
