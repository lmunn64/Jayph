<script setup lang="ts">
    const default_avatar = "https://styles.redditmedia.com/t5_8ajl6g/styles/communityIcon_ootntw58i8ue1.png"

    interface Review {
        name: string
        img_src: string
        date: string
        provider: string
        review_content: string
        rating: number
    }

    const review = defineProps<Review>()

    function setDefaultImage(event: Event){
        (event.target as HTMLImageElement).src = default_avatar
    }

    // 'read more' variables
    const expanded = ref(false);
    const showToggle = ref(false);
    const reviewRef = ref<HTMLElement | null>(null);

    // check if text overflows the clamped height (i.e., > 3 lines)
    onMounted(() => {
    const el = reviewRef.value;
    if (el && el.scrollHeight > el.clientHeight + 2) {
        showToggle.value = true;
    }
    });

</script>

<template>
    <!-- <div class="card">
        <div class="header">
            <img class="avatar" :src="review.img_src" alt="Profile Picture" @error = "setDefaultImage" />
            <h3> {{ review.name }} </h3>
        </div>
        <div class="review-info">
            <p> <span style="color: #444">{{ review.date }} · {{ review.provider }}</span></p>
            <p
                class="review"
                :class=" { 'clamped': !expanded }"
                ref="reviewRef"
                > 
                    {{ review.review_content }}
            </p>
            <button v-if="showToggle" @click="expanded = !expanded" class="toggle-btn">
                {{ expanded ? "Show less" : "Read more" }}
            </button>
        </div>
    </div> -->

    <!-- dummy data for display test -->
    <div class="card">
        <div class="header">
            <img class="avatar" :src="default_avatar" alt="Profile Picture" @error = "setDefaultImage" />
            <div class="header-info">
                <h3> John Doe </h3>
                <div class="rating-row">
                    <FontAwesomeIcon icon="star" v-for="n in 5" :key="n"/>
                </div>
            </div>
        </div>
        <div class="review-info">
            <p> <span style="color: #444">June 2025 · Airbnb</span></p>
            <p
                class="review"
                :class=" { 'clamped': !expanded }"
                ref="reviewRef"
                > 
                    Jaymi was very easy to work with and very personable. They are great recommendations and was excellent at communication. The house was beautiful and felt like home. Local to everything we needed and was very clean. Grateful for the experience and the home.
            </p>
            <button v-if="showToggle" @click="expanded = !expanded" class="toggle-btn">
                {{ expanded ? "Show less" : "Read more" }}
            </button>
        </div>
    </div>
    <!-- NEED:
     Name
     Profile Picture
     Rating
     Date of Review
     Review Content
     Source of Review (e.g. AirBnB) -->
</template>

<style scoped>
    .card {
        background-color: var(--bg-color);
        width: 650px;
    }
    .header {
        display: flex;
        align-items: left;
        gap: 12px;
        padding: 12px;
    }
    .header-info {
        margin: 0;
        line-height: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .avatar {
        margin-top: 12px;
        width: 48px;
        height: 48px;
        border-radius: 50%;   
        object-fit: cover;    
    }
    .rating-row {
        display: flex;
        gap: 6px;
        align-items: center;
    }
    .review-info {
        padding-inline: 12px;
        padding-bottom: 12px;
    }
    .review {
        line-height: 1.4;
        font-size: 1em;
    }
    .clamped {
        display: -webkit-box;
        -webkit-line-clamp: 3;  
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .toggle-btn {
        margin-top: 4px;
        background: none;
        border: none;
        color: #7d7d7d;
        cursor: pointer;
        padding: 0;
    }
</style>