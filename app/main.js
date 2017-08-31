import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'

class Main extends Component {
  render() {
    return (
      <Scene
        environment={{
          preset: 'starry',
          seed: 1,
          lightPosition: { x: 200.0, y: 1.0, z: -50.0 },
          fog: 0.8,
          ground: 'canyon',
          groundYScale: 5.0,
          groundTexture: 'walkernoise',
          groundColor: '#755b5c',
          grid: 'none'
        }}
      >
        <Entity
          primitive="a-light"
          type="directional"
          color="#FFF"
          intensity={0.75}
          position={{ x: 2.5, y: 0.0, z: 0.0 }}
        />

        <Entity
          frame={{
            color: '#D92B6A',
            nodes: true,
            opacity: 0.15,
            wireframe: true
          }}
          primitive="a-octahedron"
          detail={2}
          radius={2}
          position={{ x: 0.0, y: 4, z: -10.0 }}
          color="#FAFAF1"
          animation__rotate={{
            property: 'rotation',
            dur: 60000,
            easing: 'linear',
            loop: true,
            to: { x: 0, y: 360, z: 0 }
          }}
        />

        <Entity primitive="a-camera">
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: 'white', shader: 'flat', opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
          />
        </Entity>
      </Scene>
    )
  }
}

export default Main
