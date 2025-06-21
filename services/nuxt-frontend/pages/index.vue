<script>

</script>

<template>
  <!-- Navigation Bar -->
  <div class="nav">
    <NavBar />    
  </div>

  <div>
    <h1>Welcome to Jayph homepage.</h1>
  </div>
  <!-- Hero component -->
  <div>
    <!-- TODO -->
    <Hero />
  </div>

  <!-- Reviews components -->
   <div>
    <h2>Reviews</h2>
    <!-- TODO: FORMAT REVIEWS -->
    <ReviewCard />
   </div>

   <!-- Properties components-->
    <div>
      <h2>Our Properties</h2>
      <!-- TODO: FORMAT CARDS -->
       <div class="card-grid">
        <PropCard /> <PropCard /> <PropCard /> <PropCard /> <PropCard />
       </div>
    </div>
</template>

<style scoped>

h1, h2, p {
  text-align: center;
}
.nav {
  padding-top: 80px;
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

/* One card per row if zoomed enough */
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