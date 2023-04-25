import React from 'react';

const SvgHeader = () => {
  return (
    <div className="svg-header">
      <img src={`${process.env.PUBLIC_URL}/logo-star-wars.svg`} alt="Header" />
    </div>
  );
};

export default SvgHeader;