import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';
import Planet from './Planet';

function Table() {
  const { results } = useContext(AppContext);
  const [query, setQuery] = useState('');
  console.log(results);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={ (e) => {
          setQuery(e.target.value);
        } }
        value={ query }
        data-testid="name-filter"
      />

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
            && results
              .filter((planet) => planet.name.includes(query))
              .map((planet, index) => <Planet key={ index } info={ planet } />)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
