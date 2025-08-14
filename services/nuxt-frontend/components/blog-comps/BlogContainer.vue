<!-- 
    Blog Container component
    contains:
        - filter buttons at top for certain blogs
            All, things to do, winter, hikes, summer, fall
            If no blog found, error message appears instead
        - container for list of blog cards
            tags on cards can be clicked to apply filters as well
-->

<script setup lang="ts">

    // collect blogs from /content/posts
    const blogs = await queryCollection('blog').order('date', 'DESC').all()
    const tags = ['All posts', 'Things to do', 'Winter', 'Hikes', 'Summer', 'Fall']
    const activeTag = ref('All posts') // default selection

    // computed filtered blogs
    const filteredBlogs = computed(() => {
        if (activeTag.value === 'All posts') return blogs
        return blogs.filter((blog: { tags: string[] })=> blog.tags.includes(activeTag.value))
    })
    function setActiveTag(tag: string) {
        activeTag.value = tag
    }


</script>

<template>
    <!-- filter buttons -->
    <div class="filters">
        <button 
            v-for="(tag, index) in tags"
            :key="index"
            class="tag-button"
            :class="{ active: activeTag === tag }"
            @click="setActiveTag(tag)"
            >
                {{ tag }}
            </button>
    </div>
    <!-- blog cards -->
    <div class="blog-container">
        <template v-if="filteredBlogs.length > 0">
            <BlogCompsBlogCard
            v-for="(blog, index) in filteredBlogs"
            :key="index"
            :blog="blog"
            @tagSelected="setActiveTag"
            />
        </template>
        <p v-else class="no-results-text">No posts found for this tag.</p>
    </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem 0;
}

.tag-button {
  background-color: transparent;
  border: none;
  padding: 0 0;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.tag-button:hover{
    color: var(--accent-color);
}
.tag-button.active {
  color: var(--accent-color); 
}
.blog-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 2rem;
}
.no-results-text {
    font-size:.9em;
}
</style>