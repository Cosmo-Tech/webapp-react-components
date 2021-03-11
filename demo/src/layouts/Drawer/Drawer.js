import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Drawer, Box, List } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import MenuSection from './components/MenuSection'

// import {
//   Installation as InstallationView,
//   KPICard as KPICardView
// } from '../../views'

const useStyles = theme => ({
  content: {
    height: 'calc(100% - 36px)', // footer height = 36px
    paddingTop: theme.spacing(6),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    boxSizing: 'border-box'
  },
  drawer: {},
  drawerPaper: {
    minWidth: '200px'
  }
})

class DrawerLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { classes } = this.props
    // Build left drawer menu with nav routes, and list of existing routes
    const menuItems = []
    const routes = []
    for (const sectionName in this.props.menu) {
      const section = this.props.menu[sectionName]
      menuItems.push(<MenuSection name={sectionName} items={section}/>)
      for (const i in section) {
        routes.push(section[i])
      }
    }

    return <Route
      path="/"
      render={({ location }) => (
        <Fragment>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            anchor="left"
          >
            <List>
              {menuItems}
            </List>
          </Drawer>
          <Box className={classes.content}>
            <Switch>
              {routes.map(route => (
                  <Route exact key={route.label}
                    path={ '/' + route.label.toLowerCase().replace(/ /g, '') }
                    render={ route.render }/>
              ))}
              <Route render={() => <Redirect to={this.props.defaultPath} />} />
            </Switch>
          </Box>
        </Fragment>
      )}
    />
  }
}

DrawerLayout.propTypes = {
  menu: PropTypes.object.isRequired,
  defaultPath: PropTypes.string,
  classes: PropTypes.any
}

export default withStyles(useStyles)(DrawerLayout)
