<!-- 
    Review card component
    contains:
        - name
        - rating (default: 5)
        - date of review
        - provider (ex. airbnb)
        - review content
-->

<script setup lang="ts">
    import type { Review } from "~/types/property"

    const review = defineProps<Review>()

    const emit = defineEmits(['toggle'])
    
    // 'read more' variables
    const expanded = ref(false);
    const showToggle = ref(false);
    const reviewRef = ref<HTMLElement | null>(null);

    //check if we should toggle 
    const checkOverflow = () => {
        const el = reviewRef.value;
        if (el && el.scrollHeight > el.clientHeight + 2) {
            showToggle.value = true;
        } 
        else if(!expanded.value){ 
            showToggle.value = false;
        }
    };

    // check if text overflows the clamped height (i.e., > 3 lines)
    onMounted(() => {
        if (reviewRef.value) {
            checkOverflow();
            // Create ResizeObserver to watch height changes
            const resizeObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    checkOverflow();
                }
            });
            
            // Start observing the element
            resizeObserver.observe(reviewRef.value);
            
            // Cleanup observer when component unmounts
            onUnmounted(() => {
                resizeObserver.disconnect();
            });
        }
    });
</script>

<template>
    <div class="card">
        <div class="header">
            <!-- <img class="avatar" :src="review.img_src" alt="Profile Picture" @error = "setDefaultImage" /> -->
            <div class="header-info">
                <h3> {{ review.name }} </h3>
                <div class="rating-row">
                        <FontAwesomeIcon style="color: var(--accent-color)" icon="star" v-for="n in 5" :key="n"/>
                </div>
            </div>
        </div>
        <div class="review-info">
            <p> <span style="color: #444">{{ review.date }} · {{ review.platform }}</span></p>
            <p
                class="review"
                :class=" { 'clamped': !expanded }"
                ref="reviewRef"
                > 
                    {{ review.review_content }}
            </p>
            <!-- if more than 3 lines, will show 'read more' button -->
            <button v-if="showToggle" @click="() => { expanded = !expanded; emit('toggle') }" class="toggle-btn">
                {{ expanded ? "Show less" : "Read more" }}
            </button>
        </div>
    </div>
</template>

<style scoped>
    .card {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: var(--bg-color);
        height: fit-content;
        min-height:400px;
        margin-bottom: 30px;
        width: 100%;
     
        text-align: center;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 12px;
    }
    .header-info {
        margin: 0;
        line-height: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
        padding-inline: 75px;
        padding-bottom: 12px;
    }
    .review {
        line-height: 1.4;
        font-size: 1em;
    }
    .clamped {
        display: -webkit-box;
        -webkit-line-clamp: 5;  
        line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .toggle-btn {
        /* margin-top: 4px; */
        background: none;
        border: none;
        color: var(--accent-color);
        cursor: pointer;
        padding: 0;
    }


</style>