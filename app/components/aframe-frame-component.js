AFRAME.registerComponent('frame', {
  schema: {
    color: { type: 'string', default: '#FFF' },
    nodes: { type: 'boolean', default: false },
    opacity: { type: 'number', default: 1.0 },
    wireframe: { type: 'boolean', default: false }
  },

  init: function() {
    const obj = this.el.getObject3D('mesh')
    const scene = document.querySelector('a-scene').object3D

    obj.material = new THREE.MeshPhongMaterial({
      color: this.data.color,
      shading: THREE.FlatShading,
      vertexColors: THREE.FaceColors
    })

    const frameGeom = new THREE.OctahedronGeometry(3, 2)
    const frameMat = new THREE.MeshPhongMaterial({
      color: '#FFFFFF',
      opacity: this.data.opacity,
      transparent: true,
      wireframe: true
    })

    const icosFrame = new THREE.Mesh(frameGeom, frameMat)
    const { x, y, z } = obj.position
    icosFrame.position.set(0.0, 4, -15.0)

    if (this.data.wireframe) {
      scene.add(icosFrame)
    }

    if (this.data.nodes) {
      let spheres = []
      let vertices = icosFrame.geometry.vertices
      for (var i in vertices) {
        let geometry = new THREE.SphereGeometry(0.045, 16, 16)
        let material = new THREE.MeshBasicMaterial({
          color: '#FFFFFF',
          opacity: this.data.opacity,
          shading: THREE.FlatShading,
          transparent: true
        })

        spheres.push(new THREE.Mesh(geometry, material))
        spheres[i].position.set(
          vertices[i].x,
          vertices[i].y + 4,
          vertices[i].z + -15.0
        )
        scene.add(spheres[i])
      }
    }
  },

  update: function() {
    const obj = this.el.getObject3D('mesh')
  }
})
