# Creating Your First WebVR App using A-Frame and React

### Building VR apps has never been easier. Multiply that by the power and accessibility of the web, and you get WebVR.

Today, we'll be running through a short tutorial on creating our own WebVR application using [A-Frame](https://aframe.io/) and [React](https://facebook.github.io/react/). We'll cover the setup process, build out a basic scene, and add interactive elements and animations. A-Frame has an excellent third-party component registry, so we will be pulling some of those in in addition to writing one from scratch because that's really where the power lies. In the end, we'll go through the deployment process through [surge](https://surge.sh/) so that you can share your app with the world and test it out live on your smartphone (or Google Cardboard if you have one available). Over the course of this tutorial, we will be building a dreamy scene like this.

[Insert CodePen!]

Exciting, right? Without further ado, let's get started!

## What is A-Frame?
A-Frame is a WebVR framework for building rich 3D experiences on the web. It's built on top of three.js, an advanced 3D JavaScript library that makes working with WebGL extremely fun. The catch is that A-Frame lets you build WebVR apps without writing a single line of JavaScript (to some extent). You can create a basic scene in a few minutes writing a [couple lines of HTML](https://codepen.io/prayasht/pen/EvderE?editors=1000). It provides an excellent HTML API for you to scaffold out the scene, while still giving you full flexibility by letting you access the rich three.js API that powers it. In my opinion, A-Frame strikes an excellent balance of abstraction this way.

I won't go into more detail about how A-Frame works. You can learn all about it straight from the horse's mouth. The [documentation](https://aframe.io/docs/0.6.0/introduction/) is an excellent place for that.

## Setup
The first thing we're gonna be doing is getting A-Frame and React set up. I've already gone ahead and done that for you so you can simply clone [this repo](https://github.com/prayasht/aframe-preact-starter), cd into it, and run `yarn install` to get all the required dependencies. For this app, we're actually going to be using [Preact](http://preactjs.com), a fast and lightweight alternative to React, in order to reduce our bundle size. Dont worry, it's still the same API so if you've worked with React before then you shouldn't notice any differences. Go ahead and run `yarn start` to fire up the development server. Hit up http://localhost:3333 and you should be presented with a basic scene including a cube and some text. Now on to the fun stuff.

## Building Blocks
Fire up the editor and inspect the file `app/main.js`, that's where we'll be building out our scene. Let's take a second to break this down.

The Scene component is the root node of an A-Frame app. It's what creates the stage for you to place 3D objects in, initializes the camera, and renderer and handles other boilerplate. It should be the outermost element wrapping everything else inside it. You can think of `Entity` like an HTML `div`. Entities are the basic building blocks of an A-Frame `Scene`. Every object inside the A-Frame scene is an `Entity`.

A-Frame is built on the [Entity-component-system](https://en.wikipedia.org/wiki/Entity-component-system) (ECS) architecture, a very common pattern utlizied in 3D and game development most notably popularized by [Unity](https://unity3d.com/), a powerful game engine. What ECS means in the context of an A-Frame app is that we create a bunch of Entities that quite literally do nothing, and attach components to them to describe their behavior and looks. Because we're using React, this means that we'll be passing props into our `Entity` to tell it what to render. For example, passing in `a-box` as the value of the prop `primitive` will render a box for us. Then we can pass in other values for attributes like position, rotation, material, size, etc. Basically, anything listed in the A-Frame [documentation](https://aframe.io/docs/0.6.0/core/entity.html) is fair game. I hope you can see how powerful this really is. You're grabbing just the bits of functionality you need and attaching them to Entities. It gives us maximum flexibility and reusability of code, and is very easy to reason about.

## But, Why React?
Sooooo, all we need is markup and a few scripts. What's the point of using React, anyway? Well, if you wanted to attach state to these objects, then manually doing it would be a lot of hard work. A-Frame handles almost all of its rendering through the use of HTML attributes (or components as mentioned above), and updating different attributes of many objects in your scene manually can be a massive headache. Since React is excellent at binding state to markup, diffing it for you, and re-rendering, we'll be taking advantage of that. Keep in mind that we won't be handling any WebGL render calls or manipulating the animation loop with React, that's not what it's good at and it's not its job. A-Frame has a built in animation engine that handles that for us. We just need to pass in the appropriate props and let it do the hard work for us. See how this is pretty much like creating your ordinary React app, except the result is WebGL instead of raw markup? Enough with the talking, let's write some code.

## Setting Up the Scene
The first thing to do is to establish an environment. Let's start with a blank slate. Delete everything inside the `Scene` tags. 
For the sake of making things look interesting right away, we'll utilize a third-party component to generate a nice environment for us. Let's import that component from the `lib` directory and attach the component to our scene. I've hand-coded some nice defaults for us to get started, but feel free to modify to your taste. As an aside, you can press `CTRL + ALT + I` to load up the A-Frame Scene Inspector and change parameters in real-time. I find this super handy in the initial stage when designing the app. Our file should now look something like:

```javascript
import 'aframe'
import { h, Component } from 'preact'
import { Entity, Scene } from 'aframe-react'
import '../lib/aframe-environment-component'
import '../lib/aframe-particle-system'

class App extends Component {
  render() {
    return (
      <Scene
        environment={{
          preset: 'starry',
          seed: 2,
          lightPosition: { x: 0.0, y: 0.03, z: -0.5 },
          fog: 0.8,
          ground: 'canyon',
          groundYScale: 6.31,
          groundTexture: 'walkernoise',
          groundColor: '#8a7f8a',
          grid: 'none'
        }}
      >
        <Entity>
      </Scene>
    )
  }
}
```
Was that too easy? That's the power of A-Frame components. Don't worry. We'll dive into writing some of our own stuff from scratch later on.

## Populating the Environment
Now that we've got this sweet scene set up, we can populate it with objects. They can be basic 3D geometry objects like a box, sphere, cylinder, octahedron, or even a custom 3D model. For the sake of simplicity, we'll use of the defaults provided by A-Frame, and then write out own component and attach it to the default object to customize it.

## Building Your First A-Frame Component
Baby steps. Now let's take it up a notch and build our own custom A-Frame component from scratch. This component will add to the appearance of our object, and also attach interactive behavior to it.

Open up `lib/`

## Adding Interactivity
A-Frame comes with a built in raycaster fully functional out of the box. [Raycasting](https://en.wikipedia.org/wiki/Ray_casting) gives us the abiltiy to trigger events when an object is 'gazed at' with our cursor. We can also change this behavior to accomdate user input (ie click). To add a raycaster, we provide the `raycaster` prop to the camera with the classes of objects which we want to be clickable. Our camera node should now look like:
```javascript
<Entity primitive="a-camera" wasd-controls-enabled={false}>
  <Entity
    primitive="a-cursor"
    cursor={{
      color: 'white',
      fuse: false,
      fuseTimeout: 500
    }}
    material={{
      color: 'white',
      shader: 'flat'
    }}
    event-set__1="_event: mouseenter; color: black"
    event-set__2="_event: mouseleave; color: white"
    raycaster="objects: .clickable"
  />
</Entity>
```

## Animating Objects
Let's animate all the things. We can utilize the [aframe-animation-component](https://github.com/ngokevin/kframe/tree/master/components/animation/) to make this happen. It's already been imported so let's add that functionality to our buttons (planes, technically). The play and pause button should now look like:

## Polishing Up
This is a WebGL rabbit hole. Post-processing effects in WebGL are extremely fast and can add a lot of character to your scene. There are many shaders available for use depending on the aesthetic you're going for. You can very easily overdo it but even something subtle can give a lot of life to your scene. If you want to add post-processing effects to your scene, you can utilize the additional shaders provided by three.js to do so. Some of my favorites are the bloom, blur, and static TV shaders. Let's run through that very briefly here.

## Deployment
If you look inside the `bin/` directory, there should be a bash script named deploy.sh. We'll be executing this in order to deploy to the `gh-pages` branch of our project.

## Fin
I hope you enjoyed this tutorial and you see the power of A-Frame and its capabilities. By utilizing third-party components and cooking up our own, we can create something decent with relative ease. We've only scratched the surface, and now it's up to you to explore the rest. As 2D content fails to meet the rising demand for immersive content on the web, tools like A-Frame and three.js have come into the limelight. The future of WebVR is looking bright. Go on now, unleash your creativity, for the browser is an empty 3D canvas. If you end up making something cool, feel free to tweet @_prayash and @aframevr so we all can see it too.

## Additional Resources
Check out these additional resources to advance your knowledge of A-Frame.

- [A-Frame School](https://aframe.io/aframe-school/#/) for more A-Frame knowledge.
- [A Week of A-Frame](https://aframe.io/blog/awoa-75/) for inspiration.
- [A-Frame Slack](https://aframevr-slack.herokuapp.com/) for the community.
- [A-Frame Stack Overflow]() for common problems that you will run into.
- [Awesome A-Frame](https://github.com/aframevr/awesome-aframe) for a general hub for anything A-Frame.