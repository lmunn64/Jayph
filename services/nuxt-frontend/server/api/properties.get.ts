export default defineCachedEventHandler(async ()=> {
    console.log('properties isr fetch')
    return await $fetch('https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties')
}, {
    maxAge: 10,
    staleMaxAge: 40,
    swr: true
})