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
  } = useContext(AppContext);
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
      >
        Filtrar
      </button>
    </div>
  );
}

export default Header;
