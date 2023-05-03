import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  // States
  const [apiResult, setApiResult] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectInput, setSelectInput] = useState('population');
  const [comparitionInput, setComparitionInput] = useState('maior que');
  const [numberInput, setNumberInput] = useState(0);

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

  const filteredApi = () => {

  };

  const values = useMemo(() => ({
    apiResult,
    inputValue,
    setInputValue,
    selectInput,
    setSelectInput,
    comparitionInput,
    setComparitionInput,
    numberInput,
    setNumberInput,
  }), [apiResult,
    inputValue,
    setInputValue,
    selectInput,
    setSelectInput,
    comparitionInput,
    setComparitionInput,
    numberInput,
    setNumberInput,
  ]);

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
