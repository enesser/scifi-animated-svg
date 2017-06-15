'use strict';

/**
 * DOM load event.
 */
document.addEventListener('DOMContentLoaded', () => {

  const CITY_NAME = '.city';

  /**
   * Clouds.
   */
  (() => {
    const CLOUDS_SELECTOR = `${CITY_NAME} [id^=cloud]`,
      clouds = Array.prototype.slice.call(document.querySelectorAll(CLOUDS_SELECTOR)),
      clouds_timeline = new TimelineMax({
        repeat: -1
      });

    clouds.forEach((cloud) => {
      TweenLite.set(cloud, {
        x: -800
      });
      const cloud_timeline = new TimelineMax({
        repeat: -1
      });
      cloud_timeline.to(cloud, 50 + (Math.random() * 200), {
        x: 700,
        ease: Linear.easeNone
      }, 0);
      clouds_timeline.add(cloud_timeline, Math.random() * 5);
    });
    clouds_timeline.seek(80);
  })();

  /**
   * Blimp animation
   */
  (() => {
    const blimp = document.querySelector(`${CITY_NAME} #blimp`),
      blimp_lights = document.querySelectorAll(`${CITY_NAME} [id^=blimp-light]`),
      blimp_search_lights = document.querySelectorAll(`${CITY_NAME} [id^=blimp-search]`),
      BLIMP_SCREENS_SELECTOR = `${CITY_NAME} #off-world, ${CITY_NAME} #face, ${CITY_NAME} #characters`,
      blimp_screens = Array.prototype.slice.call(document.querySelectorAll(BLIMP_SCREENS_SELECTOR)),
      blimp_timeline = new TimelineMax({
        repeat: -1,
        yoyo: true
      });

    blimp_timeline.set(blimp, {
      y: 55,
      x: 500
    });

    blimp_timeline
      .to(blimp, 80, {
        y: 90,
        x: 75,
        scale: 1.25,
        ease: Linear.easeNone
      });

    [blimp_lights, blimp_search_lights].forEach((lights) => {
      const blimp_lights_timeline = new TimelineMax({
        repeat: -1,
        yoyo: true
      });

      blimp_lights_timeline.staggerFrom(lights, 0.8, {
        opacity: 0
      }, 0.2).to(lights, 0.2, {
        opacity: 1,
        scale: 1.05
      }).to(lights, 0.2, {
        opacity: 0
      });
    });

    /* Transition blimp screens */
    (() => {
      let activeBlimpScreen = 0,
        frameCount = 0,
        frameToTransition = 400;

      let renderFrame = () => {
        if (frameCount < 100) {
          blimp_screens[activeBlimpScreen].setAttribute('filter', 'url(#glitch-filter)');
        } else {
          blimp_screens[activeBlimpScreen].removeAttribute('filter');
        }

        if (++frameCount >= frameToTransition) {
          frameCount = 0;

          blimp_screens.forEach((blimpScreen) => {
            blimpScreen.style.display = 'none';
          });

          if (++activeBlimpScreen > blimp_screens.length - 1) {
            activeBlimpScreen = 0;
          }
          blimp_screens[activeBlimpScreen].style.display = 'block';
        }
        window.requestAnimationFrame(renderFrame);
      };

      window.requestAnimationFrame(renderFrame);

      blimp.addEventListener('click', (event) => {
        frameCount = frameToTransition;
        event.preventDefault();
        event.stopPropagation();
      }, false);
    })();
  })();

  /* Beacon lights */
  (() => {
    const beacon_lights = document.querySelectorAll(`${CITY_NAME} [id^=beacon-light]`),
      beacon_lights_timeline = new TimelineMax({});

    beacon_lights_timeline.fromTo(beacon_lights, 1.0, {
      opacity: 1
    }, {
      opacity: 0,
      repeat: -1,
      yoyo: true
    });
  })();

  /**
   * Landing lights animation  
   */
  (() => {
    const landing_lights = document.querySelectorAll(`${CITY_NAME} [id^=landing-light]`),
      landing_lights_timeline = new TimelineMax({
        repeat: -1,
        yoyo: true
      });

    landing_lights_timeline.staggerFrom(landing_lights, 0.8, {
      opacity: 0
    }, 0.2).to(landing_lights, 0.2, {
      opacity: 1
    }).to(landing_lights, 0.2, {
      opacity: 0
    });
  })();

  /**
   * Windows
   */
  (() => {
    const windows = document.querySelectorAll(`${CITY_NAME} #window1`),
      window_timeline = new TimelineMax({
        repeat: -1,
        yoyo: true
      });

    window_timeline.from(windows, 4, {
      opacity: 0
    }, 2);
  })();

  /**
   * Car animations
   */
  (() => {
    const siren1 = document.querySelectorAll(`${CITY_NAME} #siren1, ${CITY_NAME} #siren-blur1`),
      siren2 = document.querySelectorAll(`${CITY_NAME} #siren2, ${CITY_NAME} #siren-blur2`),
      police_car = document.querySelectorAll(`${CITY_NAME} #police-car`),
      traffic_light_go = document.querySelectorAll(`${CITY_NAME} [id^=traffic-go]`),
      traffic_light_warn = document.querySelectorAll(`${CITY_NAME} [id^=traffic-warn]`),
      traffic_light_stop = document.querySelectorAll(`${CITY_NAME} [id^=traffic-stop]`),
      traffic_flicker = document.querySelectorAll(`${CITY_NAME} [id^=traffic-flicker]`),
      TRAFFIC_LIGHT_DEFAULT_COLOR = '#2A515C',
      TRAFFIC_LIGHT_WARN_COLOR = '#ffff00',
      TRAFFIC_LIGHT_GO_COLOR = '#00ff00',
      TRAFFIC_LIGHT_STOP_COLOR = '#ff0000',
      car_siren_timeline = new TimelineMax({
        repeat: -1
      }),
      car_timeline = new TimelineMax({
        repeat: -1
      });

    [siren2, siren1].forEach((siren) => {
      car_siren_timeline.to(siren, 0.2, {
        ease: Linear.easeNone,
        opacity: 0.4
      });
    });

    car_timeline.set(traffic_flicker, {
      opacity: 0
    });

    car_timeline.to(traffic_light_warn, 0.4, {
        fill: TRAFFIC_LIGHT_WARN_COLOR
      })
      .fromTo(police_car, 4, {
        x: 700,
        scaleX: 1.0
      }, {
        x: 430,
        ease: Power3.easeOut
      })
      .to(traffic_light_warn, 0.2, {
        fill: TRAFFIC_LIGHT_DEFAULT_COLOR
      }, '-=2.2')
      .to(traffic_light_stop, 0.2, {
        fill: TRAFFIC_LIGHT_STOP_COLOR
      }, '-=2.2')
      .to(police_car, 4, {
        x: 430
      })
      .to(traffic_light_stop, 0.4, {
        fill: TRAFFIC_LIGHT_DEFAULT_COLOR
      })
      .to(traffic_light_go, 0.6, {
        fill: TRAFFIC_LIGHT_GO_COLOR
      })
      .to(police_car, 4, {
        x: -900,
        scaleX: 1.1
      })
      .to(traffic_flicker, 0.1, {
        yoyo: true,
        opacity: 1,
        repeat: 6
      }, '-=4.0');
  })();  

  /**
   * Main screen load animation for the scene.
   */
  (() => {
    const city = document.querySelector(CITY_NAME),
      title = document.querySelector('.title'),      
      city_timeline = new TimelineMax({}),
      split_title_timeline = new TimelineMax(),
      split_title = new SplitText(title, {
        type: 'words,chars'
      }),
      CHARS = split_title.chars;

    split_title_timeline.staggerFrom(CHARS, 0.01, {
      opacity: 0,
      ease: Power1.easeIn
    }, 0.08, "+=0.1");

    city_timeline.to(title, 0.2, {
        opacity: 1
      })
      .to(city, 1.3, {
        opacity: 1
      });      
  })();
});