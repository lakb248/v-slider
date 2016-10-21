/* global describe, it, expect, jasmine, beforeEach, afterEach, document */
import Vue from 'vue';
import VueSlider from '../src/vue-slider.vue';
import Slider from '../src/slider.vue';

var initSlider = () => {
    var slider = new Vue({
        template: '<div style="width:200px;height:50px;">' +
            '<vue-slider ref="slider" :speed="400" ' +
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
    }).$mount();
    document.body.appendChild(slider.$el);
    return slider;
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
            expect(vm.$refs.slider.current).toBe(1);
            done();
        }, 2200);
    });
    it('should move to the third slider after 6000ms', done => {
        var vm = initSlider();
        setTimeout(() => {
            expect(vm.$refs.slider.current).toBe(2);
            done();
        }, 4800);
    });
    it('should move to the first slider after 9000ms', done => {
        var vm = initSlider();
        setTimeout(() => {
            expect(vm.$refs.slider.current).toBe(0);
            done();
        }, 7400);
    });
    it('should move to the next slider if right arrow clicked', done => {
        var vm = initSlider();
        Vue.nextTick(() => {
            var rightArrow = vm.$el.querySelector('.right-arrow span');
            rightArrow.click();
            Vue.nextTick(() => {
                expect(vm.$refs.slider.current).toBe(1);
                done();
            });
        });
    });
    it('should move to the previous slider if left arrow clicked', done => {
        var vm = initSlider();
        Vue.nextTick(() => {
            var leftArrow = vm.$el.querySelector('.left-arrow span');
            leftArrow.click();
            Vue.nextTick(() => {
                expect(vm.$refs.slider.current).toBe(2);
                done();
            });
        });
    });
    it('should not move if the slider is moving', done => {
        var vm = initSlider();
        Vue.nextTick(() => {
            var rightArrow = vm.$el.querySelector('.right-arrow span');
            rightArrow.click();
            setTimeout(() => {
                rightArrow.click();
                expect(vm.$refs.slider.current).toBe(1);
                done();
            }, 200);
        });
    });
});

// describe('slider.vue', () => {});
