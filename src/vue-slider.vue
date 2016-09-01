<template>
    <div class="vue-slider-container">
        <div class="sliders-wrap">
            <slot></slot>
        </div>
        <div class="arrow-container" v-if="arrow">
            <div class="left-arrow"><span v-on:click="preSlider()"></span></div>
            <div class="right-arrow"><span v-on:click="nextSlider()"></span></div>
        </div>
        <div class="indicator-container" v-if="dot">
            <ul class="indicator-list">
                <li v-for="slider in sliders" track-by="$index"
                    data-index="{{$index}}"
                    v-bind:class="{'active': index == $index}"
                    v-on:click="gotoSlider($index)"
                    ></li>
            </ul>
        </div>
    </div>
</template>

<script>
    var addClass = (el, className) => {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    };
    var removeClass = (el, className) => {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' +
                className.split(' ').join('|') +
                '(\\b|$)', 'gi'), ' ');
        }
    };
    var setTransform = (el, value) => {
        el.style.webkitTransform = value;
        el.style.msTransform = value;
        el.style.mozTransform = value;
        el.style.transform = value;
    };
    var setTransition = (el, value) => {
        el.style.webkitTransition = value;
        el.style.msTransition = value;
        el.style.mozTransition = value;
        el.style.transition = value;
    };
    export default {
        props: {
            speed: {
                type: Number,
                default: 500
            },
            dot: {
                type: Boolean,
                default: true
            },
            auto: {
                type: Number,
                default: 3000
            },
            arrow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                index: 0,
                sliders: [],
                isMoving: false,
                autoTimeout: -1
            };
        },
        methods: {
            initSliders() {
                var children = this.$children;
                var sliders = [];
                this.index = 0;
                children.forEach((slider, index) => {
                    sliders.push(slider.$el);
                    removeClass(slider.$el, 'active');
                    if (index === this.index) {
                        addClass(slider.$el, 'active');
                    }
                });
                this.sliders = sliders;
            },
            translate(slider, offset, callback) {
                setTransition(slider, 'transform ' + this.speed + 'ms');
                setTransform(slider, 'translate3d(' + offset + ', 0, 0)');
                // fire when traisition end
                setTimeout(() => {
                    setTransform(slider, '');
                    setTransition(slider, '');
                    if (callback) {
                        callback();
                    }
                }, this.speed + 100);
            },
            afterTransition(previousIndex, index) {
                removeClass(this.sliders[previousIndex], 'active');
                addClass(this.sliders[index], 'active');
                this.isMoving = false;
                this.autoInterval = setTimeout(() => {
                    this.nextSlider();
                }, this.auto);
            },
            gotoSlider(index) {
                if (this.isMoving) {
                    return;
                }
                clearInterval(this.autoInterval);
                this.isMoving = true;
                var previousIndex = this.index;
                if (index !== previousIndex) {
                    if (index < previousIndex) {
                        if (index < 0) {
                            index = this.sliders.length - 1;
                        }
                        setTransform(this.sliders[index], 'translateX(-100%)');
                        setTimeout(() => {
                            this.translate(this.sliders[previousIndex], '100%');
                            this.translate(this.sliders[index], '0', () => {
                                this.afterTransition(previousIndex, index);
                            });
                        }, 50);
                    } else {
                        if (index > this.sliders.length - 1) {
                            index = 0;
                        }
                        this.translate(this.sliders[previousIndex], '-100%');
                        this.translate(this.sliders[index], '0', () => {
                            this.afterTransition(previousIndex, index);
                        });
                    }
                }
                this.index = index;
            },
            nextSlider() {
                this.gotoSlider(this.index + 1);
            },
            preSlider() {
                this.gotoSlider(this.index - 1);
            },
            play(start) {
                this.autoInterval = setTimeout(() => {
                    this.nextSlider();
                }, this.auto);
            }
        },
        ready() {
            this.initSliders();
            this.play(0);
        }
    };
</script>

<style lang="sass">
    .vue-slider-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .sliders-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        & > div {
            position: absolute;
            width: 100%;
            height: 100%;
            -ms-transform: translateX(100%);
            -moz-transform: translateX(100%);
            -webkit-transform: translateX(100%);
            -o-transform: translateX(100%);
            &.active {
                -ms-transform: translateX(0);
                -moz-transform: translateX(0);
                -webkit-transform: translateX(0);
                -o-transform: translateX(0);
            }
        }
    }
    .arrow-container {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        div {
            position: absolute;
            top: 0px;
            bottom: 0px;
            width: 50px;
        }
        span {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50px;
            height: 120px;
            margin-left: -25px;
            margin-top: -60px;
            outline: 1px solid black;
        }
    }
    .left-arrow {
        left: 0px;
    }
    .right-arrow {
        right: 0px;
    }
    .indicator-container {
        position: absolute;
        height: 30px;
        bottom: 20px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
    }
    .indicator-list {
        height: 30px;
        list-style: none;
        padding: 0px;
        margin: 0px;
        li {
            float: left;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background-color: rgba(0,0,0,0.6);
            margin: 7px 5px;
            cursor: pointer;
            &.active {
                background-color: rgba(255,255,255,0.6);
            }
        }
    }
</style>
