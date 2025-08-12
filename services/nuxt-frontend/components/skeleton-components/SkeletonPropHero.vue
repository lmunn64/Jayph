<template>
<div class = 'skeleton-wrapper'>
    <div class="skeleton-img"></div>
    <div class="skeleton-img"></div>
    <div class="skeleton-img"></div>
</div>
</template>
<style scoped>
.skeleton-wrapper {
    display: flex;
    flex-direction:row;
    position: relative;
    height: 375px;
    width: 100%;
}
.skeleton-img{
    width: 34%;
    background-color: var(--skeleton-color);
    animation: var(--skeleton-animation);
}
.skeleton-img:nth-child(1) {
    animation-duration: 1.2s;
}
.skeleton-img:nth-child(2) {
    animation-duration: 1.7s;
}
.skeleton-img:nth-child(3) {
    animation-duration: 2.1s;
}
</style>