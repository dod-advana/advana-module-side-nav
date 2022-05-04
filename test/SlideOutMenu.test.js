import React from 'react';
const assert = require('assert');
import 'regenerator-runtime/runtime';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SlideOutMenu from '../src/lib/SlideOutMenu'
import SlideOutMenuContextHandler from '../src/lib/SlideOutMenuContext'

it("renders without crashing", () => {
  render(
    <SlideOutMenuContextHandler>      
      <SlideOutMenu  />
    </SlideOutMenuContextHandler>    
  );
});