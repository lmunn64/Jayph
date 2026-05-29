<script setup lang="ts">
import { computed } from 'vue'
import WelcomeGuidePdf from '~/components/WelcomeGuidePdf.vue'

definePageMeta({ layout: false, ssr: false })

const route = useRoute()
const id = route.params.id as string

const pdfSrc = computed(() => `/welcome-guides/${id}.pdf`)
</script>

<template>
  <div class="welcome-guide">
    <ClientOnly>
      <WelcomeGuidePdf :src="pdfSrc" missing-message="Welcome guide not available." />
    </ClientOnly>
  </div>
</template>

<style scoped>
.welcome-guide {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ffffff;
}


:global(html, body) {
  width: 100%;
  height: 100%;
  margin: 0;
}

:global(#__nuxt) {
  width: 100%;
  height: 100%;
}
</style>
