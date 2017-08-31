/**
 * @fileoverview 
 * This file imports all our required packages.
 * It also includes 3rd party A-Frame components.
 * Finally, it mounts the app to the root node.
 */

import 'aframe'
import 'aframe-animation-component'
import 'aframe-event-set-component'
import './components/aframe-lowpoly-component'
import './components/aframe-environment-component'
import { h, render } from 'preact'
import Main from './main'

document.addEventListener('DOMContentLoaded', () => {
  render(<Main />, document.querySelector('#app'))
})
