import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  // States
  const [apiResult, setApiResult] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectInput, setSelectInput] = useState('population');
  const [comparitionInput, setComparitionInput] = useState('maior que');
  const [numberInput, setNumberInput] = useState(0);
  const [filteredApi, setFilteredApi] = useState([]);
  const [isFiltered, setFiltred] = useState(false);

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

  // const switchFilterMode = () => {
  //   isFiltered === 0 ? 1 : 0
  // }

  const filterApi = useCallback(() => {
    // selectInput case
    let filtered = [];

    // console.log('fui chamado');
    if (comparitionInput === 'maior que') {
      filtered = apiResult.filter((planet) => planet[selectInput] > Number(numberInput));
      // console.log('fui chamado maior que');
    }

    if (comparitionInput === 'menor que') {
      filtered = apiResult.filter((planet) => planet[selectInput] < Number(numberInput));
      // console.log('fui chamado menor que');
    }

    if (comparitionInput === 'igual a') {
      filtered = apiResult.filter((planet) => (
        planet[selectInput] === numberInput));
      // console.log('fui chamado igual a');
    }
    setFilteredApi(filtered);
    setFiltred(true);
    // console.log(filtered);
  }, [comparitionInput, selectInput, numberInput, apiResult]);

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
    filterApi,
    filteredApi,
    isFiltered,
  }), [apiResult,
    inputValue,
    setInputValue,
    selectInput,
    setSelectInput,
    comparitionInput,
    setComparitionInput,
    numberInput,
    setNumberInput,
    filterApi,
    filteredApi,
    isFiltered,
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
