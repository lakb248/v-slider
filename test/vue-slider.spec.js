/* global describe, it, expect, jasmine, beforeEach, afterEach, document */
import Vue from 'vue';
import VueSlider from '../src/vue-slider.vue';
import Slider from '../src/slider.vue';

var initSlider = () => {
    return new Vue({
        template: '<div style="width:200px;height:50px;">' +
            '<vue-slider v-ref:slider :speed="400" ' +
                ':arrow="true" :dot="true" :auto="2000">' +
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
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    it('should have three slider after render', () => {
        initSlider();
        expect(document.querySelectorAll('.slider').length).toBe(3);
    });
    it('should move to the second slider after 3000ms', done => {
        var vm = initSlider();
        setTimeout(() => {
            expect(vm.$refs.slider.index).toBe(1);
            done();
        }, 2200);
    });
    it('should move to the third slider after 6000ms', done => {
        var vm = initSlider();
        setTimeout(() => {
            expect(vm.$refs.slider.index).toBe(2);
            done();
        }, 4800);
    });
    it('should move to the first slider after 9000ms', done => {
        var vm = initSlider();
        setTimeout(() => {
            expect(vm.$refs.slider.index).toBe(0);
            done();
        }, 7400);
    });
    it('should move to the next slider if right arrow clicked', () => {
        var vm = initSlider();
        var rightArrow = vm.$el.querySelector('.right-arrow span');
        rightArrow.click();
        expect(vm.$refs.slider.index).toBe(1);
    });
    it('should move to the previous slider if left arrow clicked', () => {
        var vm = initSlider();
        var leftArrow = vm.$el.querySelector('.left-arrow span');
        leftArrow.click();
        expect(vm.$refs.slider.index).toBe(2);
    });
    it('should not move if the slider is moving', () => {
        var vm = initSlider();
        var rightArrow = vm.$el.querySelector('.right-arrow span');
        rightArrow.click();
        setTimeout(() => {
            rightArrow.click();
            expect(vm.$refs.slider.index).toBe(1);
            done();
        }, 200);
    });
});

// describe('slider.vue', () => {});
