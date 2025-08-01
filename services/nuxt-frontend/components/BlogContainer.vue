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

import type { Blog } from '~/types/blog'

    // dummy blogs
    const blogs = ref<Blog[]>([
    {
        thumbnail: 'https://static.wixstatic.com/media/c3ce5f_69af9e1b18714883a459abdfd968df68~mv2.jpg/v1/fill/w_1367,h_1027,fp_0.50_0.50,q_90,enc_avif,quality_auto/c3ce5f_69af9e1b18714883a459abdfd968df68~mv2.jpg',
        date: 'Jul 28, 2023',
        slug: 'top-5-hikes',
        tags: ['Summer'],
        length: 3,
        title: 'Our Top 5 Best Hikes in the Great Northern Catskills',
        subtitle: 'Nestled in the picturesque northern region of the Catskill Mountains, Prattsville, NY, offers so many hiking opportunities for outdoor enthusiasts seeking to reconnect with nature. With its charming small-town atmosphere and breathtaking landscapes, Prattsville serves as an excellent base for exploring the surrounding wilderness. Here’s our top 5 best hikes that are sure to leave you with unforgettable memories of your visit in the Catskills this summer!'
    },
    {
        thumbnail: 'https://static.wixstatic.com/media/c3ce5f_c5a04345df8f47cc9072e332803c931d~mv2.jpg/v1/fill/w_1276,h_958,fp_0.50_0.50,q_90,enc_avif,quality_auto/c3ce5f_c5a04345df8f47cc9072e332803c931d~mv2.jpg',
        date: 'Nov 10, 2023',
        slug: 'romantic-picnic',
        tags: ['Fall'],
        length: 2,
        title: 'Planning a Romantic Picnic Cabin Getaway to The Catskills',
        subtitle: 'Whether you\'re celebrating a special occasion or simply want to spend quality time together, we\'ve got you covered. Our friends at Picnic in Bloom have put together some tips on how you can plan a dreamy picnic at a cabin getaway in the breathtaking Catskill Mountains.'
    },
    {
        thumbnail: 'https://static.wixstatic.com/media/c3ce5f_be40e4df3dad4f9187648716aec84077~mv2.jpg/v1/fill/w_1816,h_1364,fp_0.50_0.50,q_90,enc_avif,quality_auto/c3ce5f_be40e4df3dad4f9187648716aec84077~mv2.jpg',
        date: 'Dec 1, 2023',
        slug: 'things-to-do-in-winter',
        tags: ['Winter', 'Things to do'],
        length: 4,
        title: '10 Things To Do In The Catskills In The Winter- Plan A Winter Cabin Getaway in the Great Northern Catskills of Upstate NY',
        subtitle: 'If you are looking for things to do in the Catskills during the winter, you’ve come to the right place! The Catskills is a popular destination all year round and there’s just so much to do especially in the winter. From winter sports like skiing and snowboarding to cozy cabin stays there’s something for everyone and we’re here to make your winter getaway to the Catskills one you won’t forget! We’ve put together our top 10 things to do in the Catskills this winter.'
    },
    // add more dummy data for testing idk
    ])

    const tags = ['All posts', 'Things to do', 'Winter', 'Hikes', 'Summer', 'Fall']
    const activeTag = ref('All posts') // default selection

    // computed filtered blogs
    const filteredBlogs = computed(() => {
        if (activeTag.value === 'All posts') return blogs.value
        return blogs.value.filter(blog => blog.tags.includes(activeTag.value))
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
            <BlogCard
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