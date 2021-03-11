import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { Drawer as DrawerLayout } from './layouts'
import {
  Installation as InstallationView,
  KPICard as KPICardView
} from './views'

// Define the sections &  items to display in the left drawer menu
const menuDict = {
  'Getting Started': [
    {
      label: 'Installation',
      render: () => <InstallationView/> // eslint-disable-line
    }
  ],
  Indicators: [
    {
      label: 'KPICard',
      render: () => <KPICardView/> // eslint-disable-line
    }
  ]
}

const Routes = props => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/installation"
      />
      <DrawerLayout menu={menuDict} defaultPath="installation"/>
    </Switch>
  )
}

Routes.propTypes = {
}

export default Routes
