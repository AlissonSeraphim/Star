import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

import './table.css';
import Header from './Header';

function Table() {
  const {
    apiResult,
    inputValue,
    filteredApi,
    isFiltered,
  } = useContext(AppContext);
  return (
    <div>
      <Header />
      <table>
        <thead>
          <tr>
            {apiResult.length > 0 && Object.keys(apiResult[0]).map((name, index) => (
              <th key={ name + index }>{name}</th>
            ))}
          </tr>
        </thead>
        {apiResult.length > 0 && !isFiltered ? (
          apiResult.filter(
            (planet) => (planet.name.toLowerCase().includes(inputValue.toLowerCase())),
          )
            .map((planet, index) => (
              <tbody key={ planet + index }>
                <tr>
                  <td>{ planet.name }</td>
                  <td>{ planet.rotation_period }</td>
                  <td>{ planet.orbital_period }</td>
                  <td>{ planet.diameter }</td>
                  <td>{ planet.climate}</td>
                  <td>{ planet.gravity }</td>
                  <td>{ planet.terrain }</td>
                  <td>{ planet.surface_water }</td>
                  <td>{ planet.population }</td>
                  <td>
                    { planet.films.map(
                      (link) => (
                        <span key={ link + index }>
                          {' '}
                          { link }
                          {' '}
                        </span>),
                    )}

                  </td>
                  <td>{ planet.created }</td>
                  <td>{ planet.edited }</td>
                  <td>{ planet.url }</td>
                </tr>
              </tbody>
            )))
          : (
            filteredApi.filter(
              (planet) => (planet.name.toLowerCase().includes(inputValue.toLowerCase())),
            )
              .map((planet, index) => (
                <tbody key={ planet + index }>
                  <tr>
                    <td>{ planet.name }</td>
                    <td>{ planet.rotation_period }</td>
                    <td>{ planet.orbital_period }</td>
                    <td>{ planet.diameter }</td>
                    <td>{ planet.climate}</td>
                    <td>{ planet.gravity }</td>
                    <td>{ planet.terrain }</td>
                    <td>{ planet.surface_water }</td>
                    <td>{ planet.population }</td>
                    <td>
                      { planet.films.map(
                        (link) => (
                          <span key={ link + index }>
                            {' '}
                            { link }
                            {' '}
                          </span>),
                      )}

                    </td>
                    <td>{ planet.created }</td>
                    <td>{ planet.edited }</td>
                    <td>{ planet.url }</td>
                  </tr>
                </tbody>
              ))
          )}

      </table>
    </div>

  );
}

export default Table;
