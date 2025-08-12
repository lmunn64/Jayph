<template>
  <div class="skeleton-card">
    
    <div class="thumbnail"></div>
    <div class="details">
        <div class="property-info">
            <div class="phony-text-1"></div>
            <div class="phony-text-2"></div>
        </div>
        <div class = "result-container">
            <div class="price-container">
                <div class = "price"></div>
                <div class = "price-helper"></div>
            </div>
        </div>
        
    </div>

  </div>
  
</template>

<style scoped>
.skeleton-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #ffff;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    margin: 0 auto;
    border-radius: 16px;
    border: 2px solid #e2e2e2;
}
.thumbnail {
    width: 100%;
    background: var(--skeleton-color);
    height: 250px;
    object-fit: cover;
    display: block;
    animation: var(--skeleton-animation);
}
.details{
    display: flex;
    flex-direction: column;
    flex: 1; 
    min-height: 190px;
}
.property-info{
    padding: 0 1.5rem;
}
.phony-text-1{
    width: 70%;
    margin: 10px;
    height:20px;
    background-color:var(--skeleton-color);
    animation: var(--skeleton-animation);
}
.phony-text-2{
    width: 50%;
    margin: 10px;
    height:20px;
    background-color: var(--skeleton-color);
    animation: var(--skeleton-animation);
}
.result-container{
    display: flex;
    bottom: 0;
    justify-content: flex-end;
    align-items: center;
    padding: 15px;
    
    background-color: var(--skeleton-color);
    min-height: 70px;
    margin-top: auto;
    animation: var(--skeleton-animation);
}

</style>