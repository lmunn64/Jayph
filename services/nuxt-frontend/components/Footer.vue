<script setup lang="ts">

</script>

<template>
    <footer class="footer">
         <div class="container">
            <p>© 2025 Fountain City Stays.  Come enjoy the inspired touches that make your stay unique & memorable. We look forward to hosting you.</p>
            <nav class="footer-nav">
                <a href="/about">About</a> |
                <a href="/contact">Contact</a> |
                <a href="/privacy">Privacy Policy</a>
            </nav>
          </div>
    </footer>
</template>

<style scoped>
.footer {
  background-color: var(--secondary-color);
  color: var(--text-color-light);
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.9rem;
}

.footer-nav a {
  color: #eee;
  margin: 0 0.5rem;
  text-decoration: none;
}

.footer-nav a:hover {
  text-decoration: underline;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>