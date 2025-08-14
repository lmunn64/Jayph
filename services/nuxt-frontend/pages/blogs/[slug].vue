<script setup lang="ts">
import type { Blog } from '~/types/blog'


const route = useRoute()
const slug = route.params.slug

const { data: blog } = await useAsyncData('blog', () =>
  queryCollection('blog').where('slug', '=', slug).first()
)
</script>

<template>
  <div class="wrapper" v-if="blog">
    <div class="blog-info">
      <div class="first-info">
        <img class="profile-picture" src="~/public/jaymipfp.jpeg"/>
        <p>Jaymi Zehms • {{ blog.date }} • {{ blog.length }} min read</p>
      </div>
      <h1>{{ blog.title }}</h1>
      <p>{{ blog.subtitle }}</p>
    </div>
    <img class="thumbnail ":src="blog.thumbnail"></img>
    <ContentRenderer :value="blog" class="content-renderer"/>
  </div>
  <div v-else>
    <p>Blog not found.</p>
  </div>
</template>

<style>
.content-renderer p {
  /* indents all paragraph-style text, can change later if complications */
    text-align:start; 
  }
.content-renderer h2 > a,
.content-renderer h3 > a,
.content-renderer h4 > a,
.content-renderer h5 > a,
.content-renderer h6 > a {
  pointer-events: none;
  color: inherit;
  text-decoration: none;
  cursor: default;
}

.content-renderer h2 > a::before,
.content-renderer h3 > a::before,
.content-renderer h4 > a::before,
.content-renderer h5 > a::before,
.content-renderer h6 > a::before {
  display: none;
}

.content-renderer h2 > a,
.content-renderer h3 > a,
.content-renderer h4 > a,
.content-renderer h5 > a,
.content-renderer h6 > a {
  /* Hide the anchor link, but keep the heading text */
  all: unset;
  color: inherit;
  font: inherit;
}
.content-renderer img {
  display: block;
  margin: 0 auto;
  width: 100%;
  object-fit: cover; 
  height: 350px;
}
</style>

<style scoped>
  body {
    background-color :var(--bg-color);
  }
  h1{
    margin: 0;
  }
  p{
    margin: 0;
  }
  .wrapper {
    background-color: white;
    outline: 1px solid rgba(196, 193, 190, 0.75);
    outline-offset: -16px;
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
  }
  .first-info {
    display: flex;
    align-items: center;
    flex-direction: wrap;
    gap: 16px;
  }
  .profile-picture {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    display: block;
  }
  .blog-info {
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-direction: column;
  }
  .thumbnail {
    width: 100%;
    /* height: 300px; */
    object-fit: cover;
  }
</style>