/** Format Date to a string value following "YYYY-MM-DD" */
export function formatSingleDate(date : Date) : string {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}