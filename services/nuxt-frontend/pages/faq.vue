<script setup lang="ts">

</script>

<template>
    <div class="wrapper">
        <h1>Frequently Asked Questions</h1>
        <h2>Sample Questions:</h2>
        <FaqList />
    </div>
</template>

<style scoped>
h1, h2 {
    text-align: center;
}
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 1000px;        
    padding-inline: 1rem;    
    margin: 0 auto;
    box-sizing: border-box; 
    background-color: var(--bg-color);
 }
</style>