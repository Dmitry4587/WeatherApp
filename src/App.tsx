import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import qs from 'query-string';
import { Routes, Route } from 'react-router-dom';
import WeatherList from './components/WeatherList';
import CityPage from './pages/CityPage';
import Auth from './components/Auth';
import LoginPage from './pages/LoginPage';
import RegistrPage from './pages/RegistrPage';
import EditPage from './pages/EditPage';
import Layout from './pages/Layout';
import SettingsPage from './pages/SettingsPage';
import EventsPage from './pages/EventsPage';

const App = () => {
  return (
    <QueryParamProvider
      adapter={ReactRouter6Adapter}
      options={{
        searchStringToObject: qs.parse,
        objectToSearchString: qs.stringify,
        updateType: 'replaceIn',
      }}>
      <Routes>
        <Route
          path='/'
          element={
            <Auth>
              <Layout />
            </Auth>
          }>
          <Route index element={<WeatherList />} />
          <Route path='/:city/*' element={<CityPage />} />
        </Route>
        <Route
          path='/settings'
          element={
            <Auth>
              <SettingsPage />
            </Auth>
          }
        />
        <Route
          path='/events'
          element={
            <Auth>
              <EventsPage />
            </Auth>
          }
        />
        <Route
          path='/edit'
          element={
            <Auth>
              <EditPage />
            </Auth>
          }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registr' element={<RegistrPage />} />
      </Routes>
    </QueryParamProvider>
  );
};
export default App;
