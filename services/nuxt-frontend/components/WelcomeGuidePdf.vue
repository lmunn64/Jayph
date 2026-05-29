<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import 'pdfjs-dist/legacy/web/pdf_viewer.css'

type PdfStatus = 'loading' | 'ready' | 'error'

const props = defineProps<{
  src: string
  missingMessage?: string
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const viewerRef = ref<HTMLDivElement | null>(null)
const status = ref<PdfStatus>('loading')
const errorMessage = ref('')

let pdfDoc: any = null
let loadingTask: any = null
let pdfjsLib: any = null
let pdfjsViewer: any = null
let pdfViewer: any = null
let linkService: any = null
let eventBus: any = null
let resizeObserver: ResizeObserver | null = null
let resizeTimer: number | null = null
let lastContainerWidth = 0
let lastDevicePixelRatio = 0

const ensurePdfjs = async () => {
  if (pdfjsLib && pdfjsViewer) return
  pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs')
  pdfjsViewer = await import('pdfjs-dist/legacy/web/pdf_viewer.mjs')
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'
}

const initViewer = () => {
  if (!containerRef.value || !viewerRef.value || pdfViewer) return
  eventBus = new pdfjsViewer.EventBus()
  linkService = new pdfjsViewer.PDFLinkService({
    eventBus,
    externalLinkTarget: pdfjsViewer.LinkTarget.BLANK,
    externalLinkRel: 'noopener'
  })

  pdfViewer = new pdfjsViewer.PDFViewer({
    container: containerRef.value,
    viewer: viewerRef.value,
    eventBus,
    linkService,
    textLayerMode: 2,
    annotationMode: pdfjsLib.AnnotationMode.ENABLE
  })

  linkService.setViewer(pdfViewer)
}

const destroyDocument = async () => {
  if (loadingTask?.destroy) {
    await loadingTask.destroy()
  }
  loadingTask = null
  if (pdfViewer) {
    pdfViewer.setDocument(null)
  }
  if (linkService) {
    linkService.setDocument(null, null)
  }
  pdfDoc = null
}

const applyFitWidth = () => {
  if (!pdfViewer) return
  pdfViewer.currentScaleValue = 'page-width'
}

const loadAndRender = async () => {
  try {
    status.value = 'loading'
    errorMessage.value = ''

    await ensurePdfjs()
    initViewer()

    loadingTask = pdfjsLib.getDocument({ url: props.src })
    pdfDoc = await loadingTask.promise
    linkService.setDocument(pdfDoc, null)
    pdfViewer.setDocument(pdfDoc)

    pdfViewer.firstPagePromise.then(() => {
      const container = containerRef.value
      if (container) {
        lastContainerWidth = container.clientWidth || window.innerWidth
        lastDevicePixelRatio = window.devicePixelRatio || 1
      }
      applyFitWidth()
    })

    status.value = 'ready'
  } catch (error) {
    if (import.meta.dev) {
      console.error('PDF load failed:', error)
    }
    status.value = 'error'
    errorMessage.value = props.missingMessage || 'Welcome guide not available.'
  }
}

const scheduleResize = () => {
  const container = containerRef.value
  if (!container || !pdfDoc) return
  const containerWidth = container.clientWidth || window.innerWidth
  const outputScale = window.devicePixelRatio || 1
  if (outputScale !== lastDevicePixelRatio) return
  if (containerWidth === lastContainerWidth) return
  lastContainerWidth = containerWidth
  lastDevicePixelRatio = outputScale

  if (resizeTimer) window.clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(() => {
    applyFitWidth()
  }, 150)
}

onMounted(() => {
  loadAndRender()

  if (containerRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(scheduleResize)
    resizeObserver.observe(containerRef.value)
  } else {
    window.addEventListener('resize', scheduleResize)
  }
})

onBeforeUnmount(async () => {
  if (resizeObserver && containerRef.value) {
    resizeObserver.unobserve(containerRef.value)
    resizeObserver.disconnect()
  } else {
    window.removeEventListener('resize', scheduleResize)
  }

  if (resizeTimer) window.clearTimeout(resizeTimer)
  await destroyDocument()
})

watch(
  () => props.src,
  async () => {
    await destroyDocument()
    await loadAndRender()
  }
)
</script>

<template>
  <div class="pdf-viewer">
    <div v-if="status === 'error'" class="pdf-error">
      {{ errorMessage }}
    </div>
    <div
      ref="containerRef"
      class="pdf-container"
      :class="{ 'is-hidden': status === 'error' }"
    >
      <div ref="viewerRef" class="pdfViewer"></div>
    </div>
  </div>
</template>

<style scoped>
.pdf-viewer {
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: relative;
}

.pdf-container {
  position: absolute;
  inset: 0;
  overflow: auto;
  background: #ffffff;
}

.pdfViewer {
  min-height: 100%;
}

.pdf-container.is-hidden {
  display: none;
}

.pdf-error {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 16px;
  box-sizing: border-box;
}
</style>
