export default defineCachedEventHandler(async ()=> {
    const { apiBase } = useRuntimeConfig()
    return await $fetch(`${apiBase}/api_properties`)
}, {
    maxAge: 10,
    staleMaxAge: 40,
    swr: true
})