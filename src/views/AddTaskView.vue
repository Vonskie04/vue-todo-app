<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const newTask = ref('');
const toast = useToast();

const addTask = () => {
    if (newTask.value.trim()) {
        try {
            // Get existing tasks from localStorage
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // Add new task with completed state
            tasks.push({
                text: newTask.value,
                completed: false
            });
            // Save back to localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
            // Clear input
            newTask.value = '';
            // Show success toast
            toast.success('Task added successfully!');
            // Navigate back to home
            router.push('/');
        } catch (error) {
            toast.error('Failed to add task. Please try again.');
        }
    } else {
        toast.warning('Please enter a task first!');
    }
};
</script>

<template>
    <div class="h-screen flex items-center justify-center">
      <div class="h-full w-150 bg-gray-200">
        <div class="h-125 w-125 border-solid border-2 border-gray-300 bg-white rounded-lg p-4 mx-auto my-25 backdrop-blur-md shadow-lg ">
          <div class="flex">
            <RouterLink to="/" class="text-gray-200 rounded-lg px-2 py-2 hover:text-black">Back</RouterLink>
            <button @click="addTask" class="bg-blue-500 text-white rounded-lg px-4 py-2 ml-88">Add</button>
          </div>
            
          <div>
            <textarea 
              v-model="newTask"
              class="w-full h-50 p-2 border border-gray-300 rounded-lg mt-4 resize-none" 
              placeholder="Enter your task here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>     
</template>

