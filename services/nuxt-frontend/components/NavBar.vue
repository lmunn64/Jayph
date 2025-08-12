<!-- 
      Navigation bar component
      Contains:
         - Logo linked to home page
         - NuxtLinks for each additional page
            - home
            - about
            - faq
            - blog
-->
<script>

</script>

<template>
   <div class = 'nav'>
      <header class="navbar">
         <NuxtLink to="/">
            <img src="/logo.png" alt="Logo" style="height:80px;" />
         </NuxtLink>
         <nav class="nav-links">
            <NuxtLink to="/">Home</NuxtLink> 
            <NuxtLink to="/about">About</NuxtLink>
            <NuxtLink to="/faq">FAQ</NuxtLink> 
            <NuxtLink to="/blog">Blog</NuxtLink>
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
   height: 50px;
   display: flex;
   align-items: center;
   justify-content: space-evenly;
   padding: 1rem 1rem;
   background-color: var(--primary-color);
   z-index: 1000;
}
.nav {
  padding-top: 80px;
}
a {
   color: var(--text-color-light);
   text-decoration: none;
}
a:hover {
   text-decoration: underline;
}
.nav-links {
   display: flex;
   gap: 1.5rem;
}
@media (max-width: 400px){
   .nav-links {
      display: flex;
      gap: 1rem;
   }
   .navbar{
   
   justify-content: space-between;

}
}

</style>