import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppProvider';
import Planet from './Planet';
import './Table.css';

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

  const opcoes = (opcao) => !selectedFilters.find((filtro) => opcao === filtro.column);

  const addCurrFilter = () => {
    setSelectedFilters([...selectedFilters, selected]);
    setSelected({
      column: 'population',
      condition: 'maior que',
      value: 0,
    });
  };

  return (
    <div className="container">
      <div className="panel">
        <input
          type="text"
          placeholder="Search"
          onChange={ (e) => {
            setQuery(e.target.value);
          } }
          value={ query }
          data-testid="name-filter"
        />
      </div>
      <div className="filters">
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
          ]
            .filter(opcoes)
            .map((col) => (
              <option value={ col } key={ col }>
                {col}
              </option>
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
        {selected.column === 'diameter' && <span>in km</span>}
        <button
          data-testid="button-filter"
          type="button"
          onClick={ addCurrFilter }
        >
          ADICIONAR
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
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
      </div>
      {selectedFilters.map((filter, index) => (
        <div key={ index } data-testid="filter">
          <button
            type="button"
            onClick={ () => {
              const currentFilters = [...selectedFilters];
              currentFilters.splice(index, 1);
              setSelectedFilters(currentFilters);
            } }
          >
            Remover
          </button>
          <span>
            {filter.column}
            {' '}
            {filter.condition}
            {' '}
            {filter.value}
          </span>
        </div>
      ))}

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
            <th style={ { width: '300px' } }>Films</th>
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
