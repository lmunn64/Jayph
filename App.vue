<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const name: string = "JAYPH"
  const status: ref = ref(true)
  const tasks : ref = ref(["Boobs", "Tits", "Ass" ])
  const link : String = "https://fountaincitystays.com"
  const newTask : ref  = ref("")
  function activeStatus(){
    status.value = !status.value
  }
  function addTask(){
    console.log(`Added new task ${newTask.value}`)
    tasks.value.push(newTask.value)
  }
  function deleteTask(index){
    tasks.value.splice(index, 1);
  }
  onMounted(async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos`)
      const data = await response.json();
      tasks.value = data.map((task)=> task.title).slice(0,5)
    } catch (error) {
      console.log("Error fetching tasks")
    }
  })
</script>

<template>
  <div id = "title">
    {{ name }}

    <p v-if = "status">User is Active</p>
    <p v-else =>User is Inactive</p>
    <button @click = "activeStatus">Toggle Status </button>
    <!--for loops-->
    <li v-for = "(task, index) in tasks" :key="task"> 
      <span>{{ task }}</span>
      <button @click = "deleteTask(index)">Delete Task</button>
    </li>
    <!--Dynamic binding for link --> 
    <a :href="link">Click for Airbnb page</a>
    <ul>
      <form @submit.prevent = "addTask">
        <label for="newTask">Add Task </label>
        <input type = "text" id = "newTaskInput" name = "newTask" v-model = "newTask">
        <button type = "submit">Submit</button>
      </form>
    </ul>
  </div>

</template>

<style scoped>
  #title{
    font-family: 'Courier New', Courier, monospace;
  }
</style>
