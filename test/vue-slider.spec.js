/* global describe, it, expect, document */
import Vue from 'vue';
import VueSlider from '../src/vue-slider.vue';
import Slider from '../src/slider.vue';

var initSlider = () => {
    return new Vue({
        template: '<div style="width:200px;height:50px;">' +
            '<vue-slider :speed="1000" :arrow="true" :dot="true">' +
                '<slider-item>' +
                    '<div class="slider" style="display:none' +
                    ';background-color:red;height:100%;">SliderA</div>' +
                '</slider-item>' +
                '<slider-item>' +
                    '<div class="slider" style="display:none' +
                    ';background-color:red;height:100%;">SliderA</div>' +
                '</slider-item>' +
                '<slider-item>' +
                    '<div class="slider" style="display:none' +
                    ';background-color:red;height:100%;">SliderA</div>' +
                '</slider-item>' +
            '</vue-slider>' +
        '</div>',
        components: {
            'vue-slider': VueSlider,
            'slider-item': Slider
        }
    }).$mount().$appendTo('body');
};
describe('vue-slider.vue', () => {
    it('should have three slider after render', () => {
        initSlider();
        expect(document.querySelectorAll('.slider').length).toBe(3);
    });
});

// describe('slider.vue', () => {});
