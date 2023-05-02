import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [apiResult, setApiResult] = useState([]);

  const searchApi = async () => {
    try {
      const results = await fetch('https://swapi.dev/api/planets');
      const data = await results.json();
      data.results.forEach((planet) => {
        delete planet.residents;
      });
      console.log(data.results);
      setApiResult(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchApi();
  }, []);

  const values = useMemo(() => ({
    apiResult,
  }), [apiResult]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
