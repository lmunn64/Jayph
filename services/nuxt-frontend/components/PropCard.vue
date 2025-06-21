<script setup>
    const thumbnail = "https://media.tenor.com/P4HGr5rklqYAAAAM/spongebob.gif";
</script>

    <!-- Need:
     Thumbnail
     Title
     Location
     #Guests
     #Bedrooms
     #Bathrooms -->

<template>
    <div class="card">
        <div class="thumbnail-wrapper">
            <img :src="thumbnail" alt="thumbnail" class="thumbnail" />
        </div>
        <div class="content">
            <h3>Title</h3>
            <p>Description</p>
        </div>
    </div>
</template>

<style scoped>
.card {
  width: 650px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e2e2;
  overflow: hidden;
}
.thumbnail-wrapper {
    height: 350px;
    overflow: hidden;
}
.thumbnail {
  width: 100%;
  height: 350px;
  object-fit: cover;
  display: block;
  transition: transform 0.2s ease;
}
.thumbnail:hover {
    transform: scale(1.1);
}
.content {
    padding-inline: 1rem;
}
</style>