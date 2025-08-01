<script setup lang="ts">
import VueCalendar from './VueCalendar.vue';
import { ref } from 'vue'
import type { Guests, Quote, Quote_Response, Fee, Discount} from '~/types/booking'
import type { Calendar } from '~/types/calendar';

interface Props {
    id: string
}

const bookingProps= defineProps<Props>()

const selectedDates = ref<string[]>()

const hasPromo = ref(false)

const guestCounts = ref<Guests>({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0
})

const promoCode = ref<string>()


const promoForm = useTemplateRef('promo-form')

// stored current quote, starts undefined
const current_quote = ref<Quote_Response>()

const is_fetching_quote = ref<boolean>(false)

// fetch calendar data
const {data: calendar_data, error} = await useAsyncData<Calendar>(`calendar-${bookingProps.id}`, ()=>
    $fetch(`https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${bookingProps.id}/calendar`)
)

let calendar: Calendar | null = calendar_data.value;

// debouncer for watched booking details
let debounceTimer: ReturnType<typeof setTimeout> | null = null


watch([selectedDates, guestCounts, promoCode], async ([newDates, newGuests, newPromo]) => {
     if (!newDates || !newDates[0] || !newDates[1]) {
        current_quote.value = undefined
        is_fetching_quote.value = false
        if (debounceTimer) clearTimeout(debounceTimer)
        return
    }
    if(newDates != undefined){
        is_fetching_quote.value = true
        /** Debouncer for rapid guest or date changes (won't worry about recent data as much when closing and opening of guest count is the trigger for sending new requests on guest change) */
        if(debounceTimer)
            clearTimeout(debounceTimer)
        debounceTimer = setTimeout(async ()=> {
            /** If the dates aren't clear, or if there are dates when adjusting adults and children, generate a new quote */

                const quotePayload = {
                checkin_date: selectedDates.value?.[0] ?? '',
                checkout_date: selectedDates.value?.[1] ?? '',
                guests: {
                    adults: guestCounts.value.adults,
                    children: guestCounts.value.children,
                    infants: guestCounts.value.infants,
                    pets: guestCounts.value.pets
                },
                promo_code: promoCode.value
                }
                if(newPromo != undefined)
                    quotePayload.promo_code = newPromo
                console.log('quote being generated...: ', quotePayload)
                
                try{
                    
                    const quote_response = await $fetch<Quote_Response>(
                    `https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev/api_properties/${bookingProps.id}/quote`,
                    {
                        method: 'POST',
                        body: quotePayload,
                    })     
                    if(quote_response){
                        current_quote.value = quote_response
                        console.log("Quote received: ", current_quote.value)
                        is_fetching_quote.value = false
                    }
                } catch (error) {
                    console.error("Error fetching quote:", error)
                    is_fetching_quote.value = false
                }
           
        }, 700)
     }
}, { deep: true })

const openPromo = () =>{
    hasPromo.value = !hasPromo.value
}

const clearQuoteResponse = () =>{
    // Clears quote response to disallow user from selecting expired 
    console.log("clearing quote response")
    current_quote.value = undefined
    is_fetching_quote.value = false
}

const submitPromo = () => {
    if(promoForm.value != undefined){
        if(promoForm.value.value != undefined && promoForm.value.value != "")
            promoCode.value = promoForm.value.value
        else
            /**must be valid maybe add class to outline red */
            return
    }
    else{

    }
    
}

const redirectToHospitable = () =>{
    if(current_quote.value){
        if(current_quote.value.booking_url){
            window.open(current_quote.value.booking_url, '_blank', 'noopener')
        }
    }
}

</script>

<template>
    <div class="booking-wrapper">       
        
        <div class= "booking-component">
            <h2 v-if = '!calendar'> Sorry, we cannot display the booking details at this time, try refreshing the page.</h2>
            <div class= "calendar-col" v-if = 'calendar'>
                 <VueCalendar @delete-quote-response="clearQuoteResponse" v-model="selectedDates" :cal_data = calendar  />
            </div>
            
            <div class="booking-info" v-if = 'calendar'> 
                 <h1>Your Stay</h1> 
                <!-- <hr></hr> -->
                <div class = placeholder-guest-selector> 
                    <GuestSelector v-if = 'calendar' v-model="guestCounts"/>
                </div>
                
                <div v-if = '!is_fetching_quote && current_quote'  class = "price-info"> 
                    <h2>Price Details</h2>
                    <table class="price-table">
                        <tbody class="price-table-body">
                            <tr>
                                <td class="td-start">Sub Total</td>
                                <td class="td-end">{{ current_quote.sub_total }}</td>
                            </tr>
                            <tr  v-for="(fee, i) in current_quote.fees.filter((e : Fee)=> e.amount > 0)" :key ="`$fee-${i}`">
                                <td class="td-start">{{ fee.label }}</td>
                                <td class="td-end">{{ fee.formatted }}</td>
                            </tr>
                             <tr  v-for="(discount, i) in current_quote.discounts" :key ="`$discount-${i}`">
                                <td class="td-start">{{ discount.label }}</td>
                                <td class="td-end">{{ discount.formatted }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="total-table">
                        <tbody class="price-table-body">
                            <tr>
                                <td class="td-total-start">Total Before Taxes</td>
                                <td class="td-total-end">{{ current_quote.total_before_tax }}</td>
                            </tr>
                        </tbody>
                    </table>

                    
                    <div class = "promo-container" >
                        <p class = "promo-code-text" v-if="current_quote" :class = "{ hidden: hasPromo }"@click = openPromo ref = 'promo-text'>I have a discount code</p>
                        <div class = "promo-container" :class = "{ hidden : !hasPromo}">                        
                            <input type= "text" class = "promo-code-form" ref = "promo-form">
                            <button class = "promo-code-btn" @click = submitPromo>Submit</button>
                        </div>
                    </div>
                    <div class="request-book-container">
                        <button class = "rq-book-btn" @click = "redirectToHospitable">Request to Book</button>
                        <p class = "small-text">You won't be charged yet</p>
                    </div>
                </div>
                <div class="loader" v-if="is_fetching_quote"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.booking-wrapper {
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: start;
    flex-direction: column;
    border-radius: 10px;
    min-height: 60vh;
    width: 92%;
    background-color: #7fab8d;
    padding: 10px;
    box-sizing: border-box;
}

.booking-component {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    width: 100%;
    padding-top: 20px;
    height:100%;
    max-width: 1200px;
}

.calendar-col {
    display: flex;
    width: 55%;
    height: 90%;
    justify-content: end;
    align-items: end; 
    padding: 0 20px 10px 20px;
    margin: 5px;
    /* border-style: dashed;
    border-width: 1px; */
   
}

h1{
    padding-bottom: 10px;
    margin: 0;
    font-size: xx-large;
}

/* hr{
    width:90%;
    height: 1px;
    color:#000;
    border-width: 0;
    padding: 0px;
} */
.booking-info{
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: center; 
    padding: 0 20px 10px 10px;
    margin: 5px;
    margin-top: -2.5em;
    align-items: center;
    /* border-style: dashed;
    border-width: 1px; */
}

@media (min-height: 600px){
    .booking-info{
        margin-top: 0;
    }
}
.price-info {
    width: 90%;
    flex-direction: column;
    justify-content: center; 
    align-items: flex-start;
    /* border-style: dashed;
    border-width: 1px; */
}


.placeholder-guest-selector {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    border-radius: 8px;
    /* text-align: center; */
    /* justify-content: center; */
    /* align-items: center; */
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 950px) {
    .booking-component{
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .calendar-col{
        width: 100%;
        height: 100%; 
    }
    .booking-info {
        width: 90%;
        padding: 10px 10px 10px 10px;
        height: auto;
        margin-top: -1em;
    }
}

@media (max-width: 400px){
    .booking-component{
        border-style: none;
    }
}

/** price table styling */
.total-table {
    width: 100%; 
    margin: 0 auto;
    table-layout: auto; 
}

.price-table {
    width: 100%; 
    margin: 0 auto;
    table-layout: auto; 
    border-bottom: 1px solid #00000023;
}
.td-end{
    padding: 5px;
    text-align: end;
    opacity: 60%;
}

.td-start{
    padding: 15px;
    text-align: start;
    opacity: 60%;
}

.td-total-start{
    padding-top: 15px;
    text-align: start;
    font-size:larger;
}
.td-total-end{
    padding-top: 15px;
    text-align: end;
    font-size:larger;
}

.promo-code-text{
    text-decoration: underline;
    font-style: italic;
    cursor: pointer;
    margin: 10px;
}
.promo-container{
    display: flex;
    align-items: center;
    margin: 10px;
    min-height: 1rem;
    justify-content: center;
}
.promo-code-form{
    width: 50%;
    font-size: medium;
    cursor: pointer;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    margin: 5px;
}
/**also later */
.promo-code-form:focus{

}
.promo-code-btn{
    width: auto;
    height: auto;
    font-size: small;
    border-radius: 5px;
    border-width: 0;
}
/** later */
.promo-code-btn:hover{
    
}

.hidden{
    display: none;
}
.request-book-container{
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    
}
.rq-book-btn{
    width: 275px;
    height: 50px;
    border-radius: 5px;
    border-width: 0px;
    font-size: medium;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
}
.rq-book-btn:hover{
    background-color: #c2c2c2;
    transition: 0.3s;
}

.rq-book-btn:active{
    background-color: #858585;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
}
.small-text{
    font-size: small;
    opacity: 60%;
}
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
/* .booking-info {
    overflow-y: auto;
} */
</style>