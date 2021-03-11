import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
// import { KPICard } from '@cosmotech/ui'

const useStyles = theme => ({
  root: {
    height: '100%'
  }
})

class KPICardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    // const { classes } = this.props
    return (
      <div>
        KPICard
      </div>
    )
  }
}

KPICardView.propTypes = {
  classes: PropTypes.any
}

export default withStyles(useStyles)(KPICardView)
