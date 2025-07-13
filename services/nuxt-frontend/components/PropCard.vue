<!-- 
    Property card component; displays quick-access info on properties
    Contains:
        - property thumbnail
        - title
        - location
        - #guest, bedrooms, bathrooms
        - clicking card will redirect to property page -->

<script setup lang = 'ts'>
    const thumbnail = "https://media.tenor.com/P4HGr5rklqYAAAAM/spongebob.gif";

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
    
    console.log(props.img_src)

    function setDefaultImage(event: Event){
        (event.target as HTMLImageElement).src = thumbnail
    }
</script>

<template>
    <NuxtLink :to="`/properties/${props.id}`" class="card-link">
        <div class="card">
            <div class="thumbnail-wrapper">
                <!-- sets image as 'thumbnail' if it is invalid -->
                <img :src="props.img_src" alt="thumbnail" class="thumbnail" @error = "setDefaultImage"/>
            </div>
            <div class="content">
                <h3>{{props.title}}</h3>
                <p>{{props.city}}, {{ props.state }}</p>
            </div>
            <div class="amenities">
                <p> <font-awesome-icon icon="user" /> Guests {{ props.guests }} </p>
                <p>  <font-awesome-icon icon="bed" /> Bedrooms {{ props.bedrooms }} </p>
                <p>  <font-awesome-icon icon="bath" /> Bathrooms {{ props.bathrooms }} </p>
                
            </div>
        </div>
    </NuxtLink>
</template>

<style scoped>
.card {
  width: 650px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
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

.content {
    padding: 0 1rem;
    gap: 0px;
}
.amenities {
    padding-inline: 1rem;
    display: flex;
    gap: 40px;
}
</style>