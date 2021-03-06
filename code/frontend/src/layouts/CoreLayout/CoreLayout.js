import React from 'react'
import Navbar from 'containers/Navbar/Navbar'
import classes from './CoreLayout.scss'
import 'styles/core.scss'
import GoogleTagManager from 'components/GoogleTagManager'

export const CoreLayout = ({ children }) => (
  <div className={classes.container}>
  	<GoogleTagManager gtmId='GTM-WZCVMQH' />
    <Navbar />
    <div className={classes.children}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
