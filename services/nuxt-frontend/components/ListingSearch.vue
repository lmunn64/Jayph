<script setup lang="ts">

const showDropdown1 = ref(false)
const showDropdown2 = ref(false)
const showDropdown3 = ref(false)

function toggleDropdown(index: number) {
  showDropdown1.value = index === 1 ? !showDropdown1.value : false
  showDropdown2.value = index === 2 ? !showDropdown2.value : false
  showDropdown3.value = index === 3 ? !showDropdown3.value : false
}

</script>

<template>
    <div class="listing-container">
        <h1 class="title">Find your stay.</h1>
        <div class="btn-container">
            <div class="dropdown">
                <button class="input" @click="toggleDropdown(1)"> Location </button>
                <div class="menu" v-if="showDropdown1">
                    <p>Branson West</p>
                    <p>Kansas City</p>
                </div>
            </div>
            <div class="dropdown">
                <button class="input">
                    Check-in -> Check-out
                </button>
            </div>
            <div class="dropdown">
                <button class="input">
                    2 adults
                </button>
            </div>
            <button class="search">
                Search
            </button>
        </div>
    </div>
</template>

<style scoped>
.listing-container {
    top: 0;
    left: 0;
    height: 400px;
    background-color: var(--secondary-color);
    color: var(--text-color-light);
}
.title {
    text-align: center;
    padding-top: 5rem;
}
.btn-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    /* padding: 0 2rem; */
}
.btn-container button {
    font-size: 1em;
    padding: 0.5rem 1rem;
    border-radius: 16px;
    outline: none;
    cursor: pointer;
    transition: 0.2s ease;
}
.input {
    text-align: left;
    border: 0px;
    height: 58px;
    padding-inline: 40px;
    width: 15vw;
    background-color: var(--bg-color);
    color: var(--text-color-dark);
}


.dropdown {
  position: relative;
}

.menu {
  margin-top: 8px;
  position: absolute;
  border-radius: 16px;
  background: var(--bg-color);
  border: 0px;
  z-index: 10;
  width: 15vw;
  overflow: hidden;
}

.menu p {
  margin: 0;
  padding: 0.5rem 1rem;
  color: var(--text-color-dark);
  cursor: pointer;
}

.menu p:hover {
  background-color: var(--highlight-color);
  color: var(--text-color-light);
}
.search {
    border: 2px solid var(--bg-color);
    background-color: var(--accent-color);
    color: var(--text-color-light);
}
.search:hover {
    background-color: var(--highlight-color);
}
</style>