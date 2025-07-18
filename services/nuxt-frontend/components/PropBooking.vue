<script setup lang="ts">
import Calendar from './Calendar.vue';
import { ref } from 'vue'

const selectedDates = ref()
interface Props {
    id: string
}

const bookingProps = defineProps<Props>()

// this where we will call quote endpoint teehee
watch(selectedDates, (newDates, oldDates) => {
    // currently have the selected dates in selectedDates, updating great.
    // JUST NEED TO CALL API WITH ALL OTHER DATA and also set up interfaces 
    // for the responses we will get and send. 
    console.log('Selected dates changed on ', bookingProps.id, ' :', newDates)
}, { deep: true })

</script>
<template>
    <div class="booking-wrapper">
        <div class= "booking-component">
            <div class= "calendar-col">
                 <Calendar v-model="selectedDates" />
            </div>
            <div class="booking-info"> 
                <h1>Price Details</h1>
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
                         <tr>
                            <td class="td-start">Additional Guest Fee</td>
                            <td class="td-end">$1.00</td>
                        </tr>
                         <tr>
                            <td class="td-start">Additional Guest Fee</td>
                            <td class="td-end">$1.00</td>
                        </tr>
                         <tr>
                            <td class="td-start">Additional Guest Fee</td>
                            <td class="td-end">$1.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.booking-wrapper {
    display: flex;
    justify-content: center;
    border-radius: 10px;
    min-height: 80vh;
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
    max-width: 1200px;
}

.calendar-col {
    display: flex;
    width: 60%;
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
    min-height: fit-content; 
}

@media (max-width: 950px) {
    .booking-component{
        flex-direction: column;
        align-items: center;
    }
    .calendar-col{
        width: 90%;
        height: auto; 
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
    width: 85%; /* Use full width available */
    margin: 0 auto;
    border-collapse: collapse;
    table-layout: auto; /* Allow table to size based on content */
}

.td-end{
    padding: 15px;
    text-align: center;
    border: 1px solid #ccc; /* Add borders for better visibility */
}

.td-start{
    padding: 15px;
    text-align: start;
    border: 1px solid #ccc;
}

/* Add this to handle table overflow if needed */
.booking-info {
    overflow-y: auto; /* Add scroll if content gets too tall */
}
</style>