// @flow
import React from 'react'
import { blue } from 'material-ui/styles/colors'

const styles = {
  outer: {
    background: blue[700]
  }
}

function Background() {
  return (
    <div className="table-bg">
      <div className="bg-outer" style={styles.outer}>
        <div className="bg-inner"></div>
      </div>
      <div className="bg-outer" style={styles.outer}>
        <div className="bg-inner"></div>
      </div>
      <div className="bg-outer" style={styles.outer}>
        <div className="bg-inner"></div>
      </div>
    </div>
  )
}

export default Background