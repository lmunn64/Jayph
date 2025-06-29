<script lang="ts">

</script>

<template>
    <h1> Reviews </h1>
    <div class="card-grid">
        <ReviewCard />
        <ReviewCard />
    </div>
</template>

<style scoped>
    h1 {
        text-align: center;
    }
    .card-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        justify-content: center;
        padding: 0 20px;
        box-sizing: border-box;
        max-width: calc(650px * 2 + 2rem + 2rem + 2rem);
        margin: 0 auto;     
    }
    .card-grid > * {
        width: min(650px, 100%);
        min-width: 300px; /* don't shrink below 300px */ 
        max-width: 100%;
        box-sizing: border-box;
    }
    @media (max-width: 700px) {
        .card-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
        }
        .card-grid > * {
            width: 100%;
        }
    }
</style>