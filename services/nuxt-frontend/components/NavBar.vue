<script>

</script>

<template>
  <header class="navbar">
    <NuxtLink to="/">
        <img src="/logo.png" alt="Logo" style="height:60px;" />
    </NuxtLink>
    <nav class="nav-links">
        <NuxtLink to="/">Home</NuxtLink> |
        <NuxtLink to="/about">About</NuxtLink>
     </nav>
  </header>
</template>

<style scoped>
.navbar{
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 1rem 2rem;
   background-color: #f4f4f4;
}
</style>