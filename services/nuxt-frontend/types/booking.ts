export interface Guests{
  adults: number
  children: number
  infants: number
  pets: number
}

export interface Search {
  location: string
  checkinDate: string
  checkoutDate: string
  adults: number
  children: number
  infants: number
  pets: number
}

export interface Quote {
  checkin_date: string
  checkout_date: string
  guests: Guests
  promo_code: string | undefined
}

export interface Fee{
  amount: number
  formatted: string
  label: string
  category: string
}


export interface Discount{
  amount: number
  formatted: string
  label: string
  category: string
}

export interface Quote_Response{
    quote_id: string
    booking_url: string
    sub_total: string
    fees: Fee[]
    discounts: Discount[]
    total_before_tax: string
}

    