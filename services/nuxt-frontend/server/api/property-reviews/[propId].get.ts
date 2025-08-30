export default defineCachedEventHandler(async (event) =>{
    const {propId} = event.context.params! 
    console.log('[reviews] origin fetch for', propId)
    return await $fetch(`https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${propId}/reviews`)
},
{
    maxAge: 10,
    staleMaxAge: 40,
    swr: true
})