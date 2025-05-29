<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import Task from '../components/Task.vue';

const showScrollbar = ref(false);
const tasks = ref([]);

const toggleScrollbar = () => { 
    showScrollbar.value = !showScrollbar.value; 
    document.getElementById('sidebar').style.overflowY = showScrollbar.value ? 'scroll' : 'hidden';
};

const deleteTask = (index) => {
    tasks.value.splice(index, 1);
    saveTasks();
};

const toggleComplete = (index, completed) => {
    tasks.value[index] = {
        ...tasks.value[index],
        completed
    };
    saveTasks();
};

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value));
};

onMounted(() => {
    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    // Convert simple strings to objects if necessary
    tasks.value = savedTasks.map(task => 
        typeof task === 'string' ? { text: task, completed: false } : task
    );
});
</script>

<template>
    <div class="h-screen flex items-center justify-center md: flex-none">
        <div id="sidebar" class="scrollbar scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-32 static c-scrollbar h-full w-150 bg-blue-500 container mx-150 md: w-100 flex-none mx-none">
            <h1 class="text-3xl font-bold text-white py-7 ml-5">
                Simple ToDo 
            <i class="pi pi-check-circle text-[20px]"></i>
            <button @click="toggleScrollbar"><i class="pi pi-angle-double-left text-[20px] pl-75 hover:text-black"></i></button>
            </h1>
        <div class="bg-white rounded-2xl shadow-lg mx-10">
            <p class="text-black text-center py-2">
                A simple and elegant way to manage your tasks.
            </p>
        </div>
        <div class="grid grid-row gap-2 mt-10">
            <Task 
                v-for="(task, index) in tasks" 
                :key="index" 
                :task="task.text"
                :completed="task.completed"
                :index="index"
                @delete-task="deleteTask"
                @toggle-complete="toggleComplete"
            />
            <RouterLink to="/add-task" class="fixed bottom-10 right-125 bg-blue-600 rounded-full p-3">
                <i class="pi pi-plus-circle text-white text-5xl hover:text-black"></i>
            </RouterLink>  
        </div>
        </div> 
    </div>   
</template>