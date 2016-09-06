import Vue from 'vue';
import {VueSlider, SliderItem} from './src/index.js';

new Vue({
    el: '#container',
    components: {
        'vue-slider': VueSlider,
        'slider-item': SliderItem
    },
    data() {
        return {};
    }
});
