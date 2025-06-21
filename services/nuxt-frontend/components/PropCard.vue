<script setup lang = 'ts'>
    const thumbnail = "https://media.tenor.com/P4HGr5rklqYAAAAM/spongebob.gif";

    interface Props {
        title : string
        img_src: string
        description: string
        guests: number
        bedrooms: number
        bathrooms: number
    }

    const props = withDefaults(defineProps<Props>(), {
        img_src: thumbnail
    })
    console.log(props.img_src)

    function setDefaultImage(event: Event){
        (event.target as HTMLImageElement).src = thumbnail
    }
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
            <img :src="props.img_src" alt="thumbnail" class="thumbnail" @error = "setDefaultImage"/>
        </div>
        <div class="content">
            <h3>{{props.title}}</h3>
            <p>{{props.description}}</p>
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