import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';
import Planet from './Planet';

function Table() {
  const { results } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState([]);
  console.log(selected);

  const tratarDados = (linha) => {
    // console.info('Linha: ', linha);
    const bools = [];
    selectedFilters.forEach((filter) => {
      switch (filter.condition) {
      case 'maior que':
        bools.push(Number(linha[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        bools.push(Number(linha[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        bools.push(Number(linha[filter.column]) === Number(filter.value));
        break;
      default:
        return true;
      }
    });

    return bools.every((el) => el);
  };

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

      <select
        data-testid="column-filter"
        value={ selected.column }
        onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
      >
        {[
          'population',
          'orbital_period',
          'diameter',
          'rotation_period',
          'surface_water',
        ].map((col) => (
          <option value={ col } key={ col }>{col}</option>
        ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ selected.condition }
        onChange={ (e) => setSelected({ ...selected, condition: e.target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        placeholder="Digite o valor"
        value={ selected.value }
        onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
      />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => {
          setSelectedFilters([...selectedFilters, selected]);
          setSelected({
            column: 'population',
            condition: 'maior que',
            value: 0,
          });
        } }
      >
        ADICIONAR
      </button>
      <button
        type="button"
        onClick={ () => {
          setSelectedFilters([]);
          setSelected({
            column: '',
            condition: '',
            value: '',
          });
        } }
      >
        LIMPAR
      </button>

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
              .filter(tratarDados)
              .map((planet, index) => <Planet key={ index } info={ planet } />)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
