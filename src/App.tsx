// App.tsx
import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button } from '@ui-kitten/components';
import AppNavigator from './navigation/AppNavigator';

export default () => {
  
  return (
  <ApplicationProvider
    {...eva}
    theme={eva.light}
  >
    <AppNavigator />
  </ApplicationProvider>
);};
