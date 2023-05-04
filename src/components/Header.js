import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Header() {
  const {
    inputValue,
    setInputValue,
    selectInput,
    setSelectInput,
    comparitionInput,
    setComparitionInput,
    numberInput,
    setNumberInput,
    filterApi,
    optionsList,
    filtersUsed,
    setOptionsList,
    setFiltersUsed,
    setCounterUpdate,
    setIsFiltered,
  } = useContext(AppContext);

  console.log(filtersUsed);

  const clearFilter = (filter) => {
    setFiltersUsed((prevFilters) => prevFilters.filter((item) => item !== filter));
    setOptionsList([...optionsList, filter.column]);
  };

  return (
    <div>
      <h1> sou o header, STAR WARS </h1>
      <label>
        Pesquise pelo Nome:
        <input
          type="text"
          data-testid="name-filter"
          name="inputValue"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
      </label>
      <label>
        De acordo com:
        <select
          data-testid="column-filter"
          name="selectInput"
          value={ selectInput }
          onChange={ ({ target }) => setSelectInput(target.value) }
        >
          {
            optionsList.map((option, index) => (
              <option key={ option + index } value={ `${option}` }>{option}</option>
            ))
          }
        </select>
      </label>
      <label>
        Faixa de valor:
        <select
          data-testid="comparison-filter"
          name="selectInput"
          value={ comparitionInput }
          onChange={ ({ target }) => setComparitionInput(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label>
        <input
          type="number"
          data-testid="value-filter"
          name="numberInput"
          value={ numberInput }
          onChange={ ({ target }) => setNumberInput(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        name="filterButton"
        onClick={ filterApi }
      >
        Filtrar
      </button>
      {
        filtersUsed && (
          filtersUsed.map((each, index) => (
            <section key={ each.value + index } data-testid="filter">
              <p>
                {`${each.column} - ${each.comparition} - ${each.value}` }
              </p>
              <button
                type="button"
                name="clearFilterButton"
                onClick={ () => {
                  clearFilter(each);
                } }
              >
                Clear Filter
              </button>
            </section>
          ))
        )
      }
      <button
        type="button"
        data-testid="button-remove-filters"
        name="removeFilters"
        onClick={ () => {
          setCounterUpdate(0);
          setFiltersUsed([]);
          setOptionsList([
            'population',
            'orbital_period',
            'diameter',
            'rotation_period',
            'surface_water']);
          setIsFiltered(false);
        } }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default Header;
