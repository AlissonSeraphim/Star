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
  const [isFiltered, setIsFiltered] = useState(false);
  const [counterUpdate, setCounterUpdate] = useState(0);
  const [optionsList, setOptionsList] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [filtersUsed, setFiltersUsed] = useState([]);

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
    if (filtersUsed.length < 1) {
      setIsFiltered(false);
      console.log('fui chamado no if');
    }
  }, [filtersUsed]);

  const filterOptions = useCallback(() => {
    const filteredOptions = optionsList.filter((each) => each !== selectInput);
    setOptionsList(filteredOptions);
    setSelectInput(filteredOptions[0]);
  }, [selectInput, optionsList]);

  const sequentialFilters = useCallback(() => {
    let refreshFilters = [];
    console.log('to chegando assim', selectInput);

    console.log('fui chamado sequencial filtros');
    if (comparitionInput === 'maior que') {
      refreshFilters = filteredApi.filter((planet) => (
        planet[selectInput] > Number(numberInput)));
      console.log('fui chamado maior que');
    }

    if (comparitionInput === 'menor que') {
      refreshFilters = filteredApi.filter((planet) => (
        planet[selectInput] < Number(numberInput)));
      console.log('fui chamado menor que');
    }

    if (comparitionInput === 'igual a') {
      refreshFilters = filteredApi.filter((planet) => (
        planet[selectInput] === numberInput));
      console.log('fui chamado igual a');
    }
    setFilteredApi(refreshFilters);
    setIsFiltered(true);
    console.log('filtros sequenciais', refreshFilters);
  }, [comparitionInput, selectInput, numberInput, filteredApi]);

  const deletedOneFilter = useCallback(() => {
    let filtered = apiResult;
    console.log('fui chamado deletedOneFilter');
    console.log(filtersUsed);

    if (filtersUsed.length > 0) {
      filtersUsed.forEach((filter) => {
        if (filter.comparition === 'maior que') {
          filtered = filtered.filter((planet) => (
            planet[filter.column] > Number(filter.value)));
          console.log('fui chamado maior que');
        }

        if (filter.comparition === 'menor que') {
          filtered = filtered.filter((planet) => (
            planet[filter.column] < Number(filter.value)));
          console.log('fui chamado menor que');
        }

        if (filter.comparition === 'igual a') {
          filtered = filtered.filter((planet) => (
            planet[filter.column] === filter.value));
          console.log('fui chamado igual a');
        }
        console.log('filter dentro do foreach:', filtered);
      });
      setFilteredApi(filtered);
      console.log('filter dentro do foreach 2:', filtersUsed);
    }
  }, [apiResult, filtersUsed]);

  useEffect(() => {
    deletedOneFilter();
  }, [filtersUsed, deletedOneFilter]);

  // Pai de todos os filtros
  const filterApi = useCallback(() => {
    if (counterUpdate === 0) {
    // selectInput case
      let filtered = [];
      console.log('fui chamado primeiro filtro');

      if (comparitionInput === 'maior que') {
        filtered = apiResult.filter((planet) => (
          planet[selectInput] > Number(numberInput)));
      // console.log('fui chamado maior que');
      }

      if (comparitionInput === 'menor que') {
        filtered = apiResult.filter((planet) => (
          planet[selectInput] < Number(numberInput)));
      // console.log('fui chamado menor que');
      }

      if (comparitionInput === 'igual a') {
        filtered = apiResult.filter((planet) => (
          planet[selectInput] === numberInput));
      // console.log('fui chamado igual a');
      }
      setFilteredApi(filtered);
      setIsFiltered(true);
      setCounterUpdate(counterUpdate + 1);
      console.log('primeiro filtro', filtered);
    }
    // fim do if = ja foi utilizado o filtro 1 vez, não está sendo trabalhado mais diretamente com a API

    console.log('to chegando como', selectInput);
    setFiltersUsed([...filtersUsed, {
      column: selectInput,
      comparition: comparitionInput,
      value: numberInput,
    }]);
    filterOptions();
    if (counterUpdate > 0) {
      sequentialFilters();
    }
  }, [comparitionInput,
    selectInput,
    numberInput,
    apiResult,
    counterUpdate,
    sequentialFilters,
    filterOptions,
    filtersUsed]);

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
    optionsList,
    filtersUsed,
    setOptionsList,
    setFiltersUsed,
    setCounterUpdate,
    deletedOneFilter,
    setIsFiltered,
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
    optionsList,
    filtersUsed,
    deletedOneFilter,
    setIsFiltered,
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
