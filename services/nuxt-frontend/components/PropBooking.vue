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
    $fetch(`http://localhost:8000/api_properties/${bookingProps.id}/calendar`)
)
let calendar: Calendar | null = calendar_data.value;
console.log(calendar_data.value)

// this where we will call quote endpoint teehee
watch([selectedDates, guestCounts, promoCode], async ([newDates, newGuests, newPromo]) => {
    /** If the dates aren't clear, or if there are dates when adjusting adults and children, generate a new quote */
    if(newDates != undefined){
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
            is_fetching_quote.value = true
            const quote_response = await $fetch<Quote_Response>(
            `http://localhost:8000/api_properties/${bookingProps.id}/quote`,
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
    }
}, { deep: true })

const openPromo = () =>{
    hasPromo.value = !hasPromo.value
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

</script>

<template>
    <div class="booking-wrapper">                
        <div class= "booking-component">
            <h2 v-if = '!calendar'> Sorry, we cannot display the booking details at this time, try refreshing the page.</h2>
            <div class= "calendar-col" v-if = 'calendar'>
                 <VueCalendar v-model="selectedDates" :cal_data = calendar  />
            </div>

            <div class="booking-info" v-if = 'calendar'> 
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
                            <tr  v-for="(fee, i) in current_quote.fees" :key ="`$fee-${i}`">
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

                   
                </div>
                <p class = "promo-code-text" v-if="current_quote" :class = "{ hidden: hasPromo }"@click = openPromo ref = 'promo-text'>I have a discount code</p>
                <div class = "promo-container" :class = "{ hidden : !hasPromo}">
                    <input type= "text" class = "promo-code-form" ref = "promo-form">
                    <button class = "promo-code-btn" @click = submitPromo>Submit</button>
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
    align-items: center;

    border-radius: 10px;
    min-height: 25vh;
    width: 100%;
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
    height:100%;
    max-width: 1200px;
}

.calendar-col {
    display: flex;
    width: 60%;
    height: 90%;
    justify-content: center;
    align-items: center; 
    /* border-style: dashed;
    border-width: 1px; */
    padding: 20px; 
}

.booking-info {
    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    /* border-style: dashed;
    border-width: 1px; */
    padding: 20px; 
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
    width: 90%;
    background-color: white;
    border-radius: 8px;
    margin: 0 10px 10px 10px;
    /* text-align: center; */
    /* justify-content: center; */
    /* align-items: center; */
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 950px) {
    .booking-component{
        flex-direction: column;
        align-items: center;
    }
    .calendar-col{
        width: 100%;
        
        height: 100%; 
        margin-right: 0;
        margin-bottom: 15px;
    }
    .booking-info {
        width: 90%;
        height: auto;
        margin-left: 0;
        margin-top: 15px;
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
    border-radius: 8px;
    border-width: 0;
}
/** later */
.promo-code-btn:hover{
    
}
.hidden{
    display: none;
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