# v-slider
[![Build Status](https://travis-ci.org/lakb248/v-slider.svg?branch=master)](https://travis-ci.org/lakb248/v-slider)
[![codecov](https://codecov.io/gh/lakb248/v-slider/branch/master/graph/badge.svg)](https://codecov.io/gh/lakb248/v-slider)

> A slider implement by vuejs

## Demo

[Demo](https://lakb248.github.io/v-slider)

## Usage

### Install

```bash
npm install v-slider --save
```

### CommonJS

```javascript
var VSlider = require('v-slider');

new Vue({
    components: {
        'v-slider': VSlider.SliderContainer,
        'slider-item': VSlider.SliderItem
    },
    template: '<div id="vue-slider-container" style="height: 300px;">\
        <v-slider :speed="1000" :arrow="true" :dot="true">\
            <slider-item>\
                <div style="display:none;background-color:red;height:100%;">SliderA</div>\
            </slider-item>\
            <slider-item>\
                <div style="display:none;background-color:blue;height:100%;">SliderB</div>\
            </slider-item>\
            <slider-item>\
                <div style="display:none;background-color:green;height:100%;">SliderC</div>\
            </slider-item>\
        </v-slider>\
    </div>'
});
```

### ES6
```javascript
import VSlider from 'v-slider';

new Vue({
    components: {
        'v-slider': VSlider.SliderContainer,
        'slider-item': VSlider.SliderItem
    },
    template: '<div id="vue-slider-container" style="height: 300px;">\
        <v-slider :speed="1000" :arrow="true" :dot="true">\
            <slider-item>\
                <div style="display:none;background-color:red;height:100%;">SliderA</div>\
            </slider-item>\
            <slider-item>\
                <div style="display:none;background-color:blue;height:100%;">SliderB</div>\
            </slider-item>\
            <slider-item>\
                <div style="display:none;background-color:green;height:100%;">SliderC</div>\
            </slider-item>\
        </v-slider>\
    </div>'
});
```

### Props

| property | description |
|:|:|
|speed| the translation speed of sliders, default 300 |
|auto| the interval of each slide, default 3000 |
|dot| show dot indicator or not, default true |
|arrow| show arrow indicator or not, default true |

## License

[MIT](http://opensource.org/licenses/MIT)
