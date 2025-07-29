<script setup lang="ts">
import VueCalendar from './VueCalendar.vue';
import { ref } from 'vue'
import type { Guests, Quote, Quote_Response } from '~/types/booking'
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

const quote = ref<Quote>({
    checkin_date: '',
    checkout_date: '',
    guests: guestCounts.value,
    promo_code: undefined
})

const promoForm = useTemplateRef('promo-form')

//fetch calendar data
const {data: calendar_data, error} = await useAsyncData<Calendar>(`calendar-${bookingProps.id}`, ()=>
    $fetch(`http://localhost:8000/api_properties/${bookingProps.id}/calendar`)
)
let calendar: Calendar | null = calendar_data.value;
console.log(calendar_data.value)

// this where we will call quote endpoint teehee
watch([selectedDates, guestCounts, promoCode], async ([newDates, newGuests, newPromo]) => {
    // currently have the selected dates in selectedDates, updating great.
    // JUST NEED TO CALL API WITH ALL OTHER DATA and also set up interfaces 

    /** If the dates aren't clear, or if there are dates when adjusting adults and children, generate a new quote */
    if(newDates != undefined){
        quote.value.guests.adults = newGuests.adults
        quote.value.guests.children = newGuests.children
        quote.value.guests.infants = newGuests.infants
        quote.value.guests.pets = newGuests.pets
        quote.value.checkin_date = newDates[0]
        quote.value.checkout_date = newDates[1]
        if(newPromo != undefined)
            quote.value.promo_code = newPromo
        console.log('new quote generated: ', quote.value)
        const {data: quote_response, error} = await useAsyncData<Quote_Response>(()=>
            $fetch(`http://localhost:8000/api_properties/${bookingProps.id}/quote`,{
                method: 'POST',
                body: quote.value,
            })
        )
        if(quote_response.value){
            console.log("Quote received: ", quote_response.value)
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
                <div class = "price-info"> 
                    <h2>Price Details</h2>
                    <table class="price-table">
                        <tbody class="price-table-body">
                            <tr>
                                <td class="td-start">$164.50 x 4 nights</td>
                                <td class="td-end">$1.00</td>
                            </tr>
                            <tr>
                                <td class="td-start">Cleaning Fee</td>
                            
                                <td class="td-end">$1.00</td>
                            </tr>
                            <tr>
                                <td class="td-start">Pet Fee</td>
                                <td class="td-end">$1.00</td>
                            </tr>
                            <tr>
                                <td class="td-start">Additional Guest Fee</td>
                                <td class="td-end">$1.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class = "promo-code-text" :class = "{ hidden: hasPromo }"@click = openPromo ref = 'promo-text'>I have a discount code</p>
                <div class = "promo-container" :class = "{ hidden : !hasPromo}">
                    <input type= "text" class = "promo-code-form" ref = "promo-form">
                    <button class = "promo-code-btn" @click = submitPromo>Submit</button>
                </div>
                
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
    border-style: dashed;
    border-width: 1px;
    padding: 20px; 
}

.booking-info {
    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    border-style: dashed;
    border-width: 1px;
    padding: 20px; 
}

.price-info {
    width: 90%;
    flex-direction: column;
    justify-content: center; 
    align-items: flex-start;
    border-style: dashed;
    border-width: 1px;
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

.price-table {
    width: 100%; 
    margin: 0 auto;
    border-collapse: collapse;
    table-layout: auto; 
}

.td-end{
    padding: 15px;
    text-align: end;
}

.td-start{
    padding: 15px;
    text-align: start;
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

/* .booking-info {
    overflow-y: auto;
} */
</style>