<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface FaqItem {
  question: string
  answer: string
}

const faqs = ref<FaqItem[]>([
{
    question: 'What time is check-in and check-out?',
    answer: 'Check-in is at 3 PM and check-out is at 11 AM.'
  },
  {
    question: 'Is parking available on-site?',
    answer: 'Yes, we offer free parking for all guests.'
  },
  {
    question: 'Are pets allowed?',
    answer: 'Yes, we are pet-friendly! Please let us know in advance.'
  },
  {
    question: 'Do you offer free Wi-Fi?',
    answer: 'Yes, high-speed Wi-Fi is available throughout the property at no extra cost.'
  },
  {
    question: 'Is breakfast included?',
    answer: 'Yes, we provide a complimentary continental breakfast each morning from 7–10 AM.'
  },
  {
    question: 'Do the rooms have air conditioning?',
    answer: 'Yes, all guest rooms are equipped with air conditioning and heating.'
  },
  {
    question: 'Is there a cancellation policy?',
    answer: 'Cancellations made up to 48 hours before check-in are fully refundable. After that, one night’s stay may be charged.'
  },
  {
    question: 'Are there hiking trails nearby?',
    answer: 'Yes, we’re located minutes from several scenic trailheads in the Catskill Mountains.'
  },
  {
    question: 'Do you allow events or weddings?',
    answer: 'Absolutely! We host weddings, retreats, and small events. Please contact us for availability and packages.'
  },
  {
    question: 'Is the front desk staffed 24/7?',
    answer: 'Our front desk is staffed from 7 AM to 10 PM. For emergencies outside of these hours, on-call assistance is available.'
  }
])

const activeIndex = ref<number | null>(null)


function toggle(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <div class="faq-list">
    <div
      v-for="(faq, index) in faqs"
      :key="index"
      class="faq-item"
    >
      <button class="faq-question" @click="toggle(index)">
        <span>{{ faq.question }}</span>
        <span>{{ activeIndex === index ? '-' : '+' }}</span>
      </button>
      <div
        class="faq-answer"
        :class="{ 'expanded': activeIndex === index }"
      >
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 2rem;
      outline: 1px solid rgba(196, 193, 190, 0.75);

  margin-bottom: 2rem;
}

.faq-item {
  border-bottom: 1px solid #ccc;
  padding: 1rem;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.125rem;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.faq-answer {
  margin-left: 0.5rem;
  font-size: 1rem;
  color: #444;
  margin-top: 0.5rem;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

.faq-answer.expanded {
  max-height: 200px;
  opacity: 1;
  transition: all .8s ease;

}
</style>
