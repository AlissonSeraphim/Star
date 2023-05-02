import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

import './table.css';

function Table() {
  const { apiResult } = useContext(AppContext);

  return (
    <div>

      <table>
        <thead>
          <tr>
            {apiResult.length > 0 && Object.keys(apiResult[0]).map((name, index) => (
              <th key={ name + index }>{name}</th>
            ))}
          </tr>
        </thead>
        {apiResult.length > 0 && apiResult.map((planet, index) => (
          <tbody key={ index }>
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
              <td>{ planet.films}</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>

  );
}

export default Table;
