import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppProvider';
import Planet from './Planet';

function Table() {
  const { results } = useContext(AppContext);
  // useEffect(() => {
  //   // declare the async data fetching function
  //   const fetchData = async () => {
  //     // get the data from the api
  //     const data = await fetch('https://swapi.dev/api/planets');
  //     // convert data to json
  //     const json = await data.json();
  //     json.results.forEach((planet) => {
  //       delete planet.residents;
  //     });

  //   };

  //   fetchData();
  // }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {results
          && results.map((planet, index) => <Planet key={ index } info={ planet } />)}
      </tbody>
    </table>
  );
}

export default Table;
