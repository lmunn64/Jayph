export default defineEventHandler(async (event) => {
  const { propId } = event.context.params!
  const body = await readBody(event)
  
  // const { apiBase } = useRuntimeConfig()
  const apiBase  = 'http://127.0.0.1:8000'
  try {
    const quote = await $fetch(`${apiBase}/api_properties/${propId}/quote`, {
      method: 'POST',
      body
    })
    return quote
  } catch (error: any) {
    throw createError({
      statusCode: error?.response?.status || 500,
      statusMessage: 'Quote fetch failed',
      data: error?.data || error?.message
    })
  }
})