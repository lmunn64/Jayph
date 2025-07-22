//Model for a properties availability and details for a specific date
export interface Calendar_Date{
    date: string,
    day: string,
    min_stay: number,
    closed_for_checkin: boolean,
    closed_for_checkout: boolean,
    status: string,
    available: boolean
}
   

//Model for a calendar with start and end date along with a list of Date objs
export interface Calendar{
    listing_id: string,
    provider: string,
    start_date: string,
    end_date: string,
    dates: Calendar_Date[]
}

    