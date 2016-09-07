<template>
    <div class="slider-container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    ready() {
        var children = this.$el.children;
        if (children.length !== 0) {
            children[0].style.display = 'block';
        }
    }
};
</script>
