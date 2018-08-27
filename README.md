Animated Sci-Fi SVG Scene (w/ GSAP)
=====

![scifi-animated-svg](https://user-images.githubusercontent.com/5659221/27191733-5b3d7b3e-51be-11e7-8412-dc030794ad88.png)

*I’ve seen things you people wouldn’t believe. Attack ships on fire off the shoulder of Orion. I watched c-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.
— Blade Runner*

An animated sci-fi SVG scene demo using [GreenSock](https://greensock.com/gsap) heavily inspired by Blade Runner.

> Visit the live demo on CodePen: [https://codepen.io/enesser/full/BZQWBo/](https://codepen.io/enesser/full/BZQWBo/)

### Background

I created this demo to get developers and designers excited about [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) animations at [Designory](https://www.designory.com/).

SVGs:
* are generally lightweight compared to rasters
* can be described with `<desc/>`  for accessibility
* can be interactive
* are crisp at virtually any resolution and infinitely scalable
* can be great story-telling tools

### Controls

The blimp’s display will rotate on demand if you click the blimp. This is meant to demonstrate that SVG elements can be interactive.

### Taking it Apart
The following is a breakdown of all of the animations in the scene.

* **Title** ([SplitText](https://greensock.com/SplitText), [TimeLineMax](https://greensock.com/timelinemax))
    * Each letter fades in with `opacity` using `staggerFrom` with `Power1.easeIn` easing
* **Clouds** ([TimeLineLite](https://greensock.com/timelinelite), [TimeLineMax](https://greensock.com/timelinemax))
    * Clouds translate along `x`, each on their own timeline
* **Blimp** ([TimeLineLite](https://greensock.com/timelinelite), [TimeLineMax](https://greensock.com/timelinemax))
    * Translates along `x` and `y`, occasionally changing `scale` to appear near or far
    * Lights change `opacity` and `scale` using `staggerFrom`
    * Glitch effect achieved using SVG `<filter/>` and [SMIL](https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_animation_with_SMIL) `<animation/>`
    * Blimp display shows and hides SVG elements for each frame with `display` property
        * Blimp rotates frames using [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
* **Beacon Lights** ([TimeLineLite](https://greensock.com/timelinelite))
    * Lights change `opacity` using `fromTo`
* **Landing Lights** ([TimeLineMax](https://greensock.com/timelinemax))
    * Lights change opacity using `staggerFrom`
* **Windows** [TimeLineMax](https://greensock.com/timelinemax)
    * Windows change `opacity` using `from`
* **Car** ([TimeLineMax](https://greensock.com/timelinemax))
    * Sirens changes `opacity` using `to`
    * Traffic light changes SVG `fill` using `to`
    * Car translates `x` and changes `scale` using `Power3.easeOut` to appear rubbery as it moves in a poor man’s attempt to follow the [Principles of Animation](https://en.wikipedia.org/wiki/12_basic_principles_of_animation)
* **Scanlines** ([keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes), [linear-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient))
    * Scanlines for an overall ’80s retro feel have been added using CSS `linear-gradient` animated with `@keyframes`

The most complex timeline in the scene is the car, and it was meant to demonstrate how to construct a complex animation by showing a car stopping at a traffic light, a traffic light changing from red to green, and the car resuming with its sirens on when the light changes.

If you are new to GreenSock, note that when you have multiple elements in a collection, `to` or `from` will animate them all at the same time, whereas `staggerTo` and `staggerFrom` will stagger the animation for each element so that they are spaced out from each other.

Staggering is used extensively for the animation of lights so they appear to twinkle in sequence.

### Ease Visualizer

GreenSock's [Ease Visualizer](https://greensock.com/ease-visualizer) can be a tremendous help when designing animation eases.

### Additional Credits
Special thanks:
- [Аlexander Oblap](https://www.instagram.com/oblapdesign/) for helping to create image assets.
- Glitch effect adapted from [https://codepen.io/DirkWeber/pen/ArFvk](https://codepen.io/DirkWeber/pen/ArFvk)

### License
Copyright (c) 2017-2018 Eric J Nesser MIT