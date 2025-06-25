<script>

</script>

<template>
   <div class = 'nav'>
      <header class="navbar">
         <NuxtLink to="/">
            <img src="/logo.png" alt="Logo" style="height:80px;" />
         </NuxtLink>
         <nav class="nav-links">
            <NuxtLink to="/">Home</NuxtLink> |
            <NuxtLink to="/about">About</NuxtLink>
         </nav>
      </header>
   </div>

</template>

<style scoped>
.navbar{
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   height: 60px;
   display: flex;
   align-items: center;
   justify-content: space-evenly;
   padding: 1rem 2rem;
   background-color: #f4f4f4;
   z-index: 1000;
}
.nav {
  padding-top: 80px;
}

</style>