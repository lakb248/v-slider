import Vue from 'vue';
import {SliderContainer, SliderItem} from './src/index.js';

new Vue({
    el: '#container',
    components: {
        'vue-slider': SliderContainer,
        'slider-item': SliderItem
    },
    data() {
        return {};
    }
});
