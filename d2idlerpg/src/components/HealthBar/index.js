// HealthBar component thanks to https://github.com/jdestep93/react-healthbar/

import React from 'react';
import PropTypes from 'prop-types';
import {
  getHealthBarBackgroundColor,
  defaultColorPallet,
  hexColorRegex
} from './HealthBarUtils';

export default function HealthBar({
  percentage,
  colors = defaultColorPallet,
  width = 150,
  height = 24
}) {
  return (
    <div 
      style={{
        borderRadius: '3px',
        border: '1px solid black',
        maxWidth: width,
        height
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          minHeight: height,
          backgroundColor: getHealthBarBackgroundColor(percentage, colors)
        }}
      >
        &nbsp;
      </div>
    </div>
  );
}

HealthBar.propTypes = {
  percentage: (props, propName, componentName) => {
    if (props[propName] < 0 || props[propName] > 100 || isNaN(props[propName])) {
      return new Error(`percentage must be between 0 and 100 including both ${componentName}`);
    }
  },
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  colors: PropTypes.arrayOf((propValue, key, componentName) => {
    if (!hexColorRegex.test(propValue[key])) {
      return new Error(
        `Invalid color code ${propValue[key]} supplied to ${componentName}`
      );
    }
  })
};