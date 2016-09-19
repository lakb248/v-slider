import Vue from 'vue';
import {SliderContainer, SliderItem} from './src/index.js';

new Vue({
    el: '#container',
    components: {
        'v-slider': SliderContainer,
        'slider-item': SliderItem
    },
    data() {
        return {};
    }
});
