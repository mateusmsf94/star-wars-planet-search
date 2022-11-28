import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://swapi.dev/api/planets');

      const json = await data.json();
      json.results.forEach((planet) => {
        delete planet.residents;
      });
      setPlanetsInfo(json);
    };

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={ planetsInfo }>
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.isRequired,
};

export { AppContextProvider, AppContext };
