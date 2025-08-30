export default defineCachedEventHandler(async (event) => {
  const q = getQuery(event)

  // Whitelist allowed params (adjust as needed)
  const allowed = ['start_date', 'end_date', 'adults', 'children', 'infants', 'pets',]
  const filteredEntries = Object.entries(q).filter(([k]) => allowed.includes(k))
  const qs = new URLSearchParams(filteredEntries as [string, string][]).toString()

  const url = 'https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/search' + (qs ? `?${qs}` : '')
  const data = await $fetch(url)
  return data
}, {
  maxAge: 30,      
  staleMaxAge: 50, 
  swr: true
})