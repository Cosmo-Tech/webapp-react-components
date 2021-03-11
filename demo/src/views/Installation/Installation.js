import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'

const useStyles = theme => ({
  root: {
    height: '100%'
  }
})

class Installation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    // const { classes } = this.props
    return (
      <div>
        Installation
      </div>
    )
  }
}

Installation.propTypes = {
  classes: PropTypes.any
}

export default withStyles(useStyles)(Installation)
