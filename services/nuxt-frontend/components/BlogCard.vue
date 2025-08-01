<!-- 
    Blog Card component
    - displayed inside BlogContainer.vue on blog page
    contains:
        - thumbnail
        - publish date / read length
        - tags
        - title
        - sub-title
        - view count, comment count, 'Like' button?
    - clicking thumbnail or title-info redirects to blog page
-->

<script setup lang="ts">

import type { Blog } from '~/types/blog'

const props = defineProps<{ blog: Blog }>()

const router = useRouter()

// const dummyBlog = ref<Blog>({
//     thumbnail: 'https://static.wixstatic.com/media/c3ce5f_69af9e1b18714883a459abdfd968df68~mv2.jpg/v1/fill/w_1367,h_1027,fp_0.50_0.50,q_90,enc_avif,quality_auto/c3ce5f_69af9e1b18714883a459abdfd968df68~mv2.jpg',
//     date: 'Jul 28, 2023',
//     tags: ['Summer', 'Fall', 'Hikes'],
//     length: 2,
//     title: 'Our Top 5 Best Hikes in the Great Northern uhhh',
//     subtitle: 'Nestled in the picturesque northern region of the Catskill Mountains, Prattsville, NY, offers so many hiking opportunities for outdoor enthusiasts seeking to reconnect with nature. With its charming small-town atmosphere and breathtaking landscapes, Prattsville serves as an excellent base for exploring the surrounding wilderness. Here’s our top 5 best hikes that are sure to leave you with unforgettable memories of your visit in the Catskills this summer!'
// })
const emit = defineEmits<{
  (e: 'tagSelected', tag: string): void
}>()

function onTagClick(tag: string) {
  emit('tagSelected', tag)
}
</script>

<template>
    <NuxtLink :to="`/blogs/${blog.slug}`" class="card-link" draggable="false">
        <div class="card">
            <img class="thumbnail" :src="blog.thumbnail">
            <div class="info">
                <p> {{ blog.date }} · {{ blog.length }} min read</p>
                <div class="tags">
                    <button
                        v-for="(tag, index) in blog.tags"
                        :key="index"
                        class="tag-button"
                        @click.prevent="onTagClick(tag)"
                    >
                        {{ tag }}
                    </button>
                </div>
                <div class="title-info">
                    <h1 class="title"> {{ blog.title }}</h1>
                    <p class="subtitle"> {{ blog.subtitle }}</p>
                </div>
                <hr class="divider" />
                <div class="viewer-info">
                    <p>X views</p>
                    <p>X comments</p>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped>
    .card-link {
        text-decoration: none;
        color: inherit;
        display: block;
    }
    .card {
        border: 1px solid #ccc;
        display: flex;
        cursor: pointer;
    }
    .thumbnail {
        width: 350px;
        height: auto;
        object-fit: cover;
    }
    .info {
        padding: 24px;
    }
    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .tag-button {
        background-color: var(--accent-color);
        color: var(--text-color-light);
        border: none;
        padding: 6px 12px;
        cursor: pointer;
        font-size: 14px;
    }
    .title-info:hover {
        color: var(--accent-color);
    }
    .title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .subtitle {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .divider {
        color: #ccc;
    }
    .viewer-info {
        display: flex;
        justify-content: flex-start;
        gap: 36px;
    }
</style>