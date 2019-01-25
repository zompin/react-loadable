import React from 'react';
import Components from '../index';

const Render = (props) => {
  const { componentName } = props;
  const RenderingComponent = Components[componentName];

  if (!(componentName in Components)) {
    console.error(`${componentName} not found`);

    return false;
  }

  return (
    <RenderingComponent {...props} />
  );
};

export default Render;
