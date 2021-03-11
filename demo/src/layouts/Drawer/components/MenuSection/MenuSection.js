import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Collapse, List, ListItem, ListItemText } from '@material-ui/core'

const useStyles = theme => ({
  section: {
    textAlign: 'left',
    paddingTop: '0px',
    paddingBottom: '0px',
    marginTop: '2px',
    marginBottom: '2px',
    '& .MuiTypography-body1': {
      fontWeight: '800'
    }
  },
  link: {
    textAlign: 'left',
    padding: '4px',
    margin: '0px',
    '& .MuiTypography-body1': {
      marginLeft: '25px'
    }
  }
})

class MenuSection extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({ open: !this.state.open })
  }

  render () {
    const { classes } = this.props
    return (
      <Fragment>
        <ListItem button onClick={this.handleClick} className={classes.section}>
          <ListItemText primary={this.props.name} className={classes.section} />
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {this.props.items.map((sectionItem, index) => (
              <NavLink
                  to={sectionItem.label.toLowerCase().replace(/ /g, '')}
                  style={{ textDecoration: 'none' }}
                  key={sectionItem.label}>
                <ListItem key={index} button className={classes.link}>
                  <ListItemText primary={sectionItem.label}/>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Collapse>
      </Fragment>
    )
  }
}

MenuSection.propTypes = {
  name: PropTypes.string,
  items: PropTypes.array,
  classes: PropTypes.any
}

export default withStyles(useStyles)(MenuSection)
