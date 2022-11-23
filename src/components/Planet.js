import React from 'react';
import PropTypes from 'prop-types';

function Planet({ info }) {
  return (
    <tr>
      <td>{info.name}</td>
      <td>{info.rotation_period}</td>
      <td>{info.orbital_period}</td>
      <td>{info.diameter}</td>
      <td>{info.climate}</td>
      <td>{info.gravity}</td>
      <td>{info.terrain}</td>
      <td>{info.surface_water}</td>
      <td>{info.population}</td>
      <td>{info.films}</td>
      <td>{info.created}</td>
      <td>{info.edited}</td>
      <td>{info.url}</td>
    </tr>
  );
}

Planet.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    rotation_period: PropTypes.string,
    orbital_period: PropTypes.string,
    diameter: PropTypes.string,
    climate: PropTypes.string,
    gravity: PropTypes.string,
    terrain: PropTypes.string,
    surface_water: PropTypes.string,
    population: PropTypes.string,
    films: PropTypes.arrayOf(PropTypes.string),
    created: PropTypes.string,
    edited: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Planet;
