<!-- 
    Property card component; displays quick-access info on properties
    Contains:
        - property thumbnail
        - title
        - location
        - #guest, bedrooms, bathrooms
        - clicking card will redirect to property page -->

<script setup lang = 'ts'>
    const thumbnail = "https://archive.org/download/placeholder-image/placeholder-image.jpg";
    import { Bed, User, Bath } from 'lucide-vue-next';
    interface Props {
        id: string
        title : string
        img_src: string
        description: string
        city: string
        state: string
        guests: number
        bedrooms: number
        bathrooms: number
    }

    const props = defineProps<Props>()

    function setDefaultImage(event: Event){
        (event.target as HTMLImageElement).src = thumbnail
    }
</script>

<template>
    <NuxtLink :to="`/properties/${props.id}`" class="card-link" draggable="false">
        <div class="card">
            <div class="thumbnail-wrapper">
                <!-- sets image as 'thumbnail' if it is invalid -->
                <img :src="props.img_src" alt="thumbnail" class="thumbnail" draggable="false" @error = "setDefaultImage"/>
            </div>
            <div class="content">
                <h3>{{props.title}}</h3>
                <p>{{props.city}}, {{ props.state }}</p>
            </div>
            <ul class="amenities">
                <div class = "amenity-item">
                    <User class = "icon"/>
                    <p>Guests {{ props.guests }} </p>
                </div>
                <li class = "amenity-item">
                    <Bed class = "icon"/>
                    <p>Bedrooms {{ props.bedrooms }} </p>
                </li>
                <li class = "amenity-item">
                    <Bath class = "icon"/>
                    <p>Bathrooms {{ props.bathrooms }} </p>
                </li>              
            </ul>
        </div>
    </NuxtLink>
</template>

<style scoped>
.card {
    width: 650px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: var(--default-border-radius);
    border: 2px solid #e2e2e2;
    overflow: hidden;
    cursor: pointer;
    transition: ease 0.2s;
}
.card-link {
    text-decoration: none;
    color: inherit;
    display: block;
}
.card:hover {
    border: 2px solid var(--accent-color);
}
.card:hover .thumbnail{
    transform: scale(1.05);
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
.icon {
    color: var(--accent-color);
    width: 30px;
    flex-shrink: 0;
}
.content {
    padding: 0 1.5rem;
    gap: 0px;
}
.amenities {
    display: flex;
    justify-content: start;
    gap: 0.5rem;
    padding: 0 1em;
}
.amenity-item {
    display: flex;
    align-items: center;
    justify-content: start;
    font-size: 1rem;
    margin-right: 1.2em;
    color: #333;
}
@media (max-width: 700px){
    .card {
        width: 90vw;
    }
    .thumbnail-wrapper, .thumbnail {
        height: 200px;
    }
    .amenities {
        flex-wrap: wrap;
        gap: 0 20px;
    }
}
</style>