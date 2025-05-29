<script setup>
    import { defineProps, defineEmits } from 'vue';
    import { useToast } from 'vue-toastification';


    const toast = useToast();
    const props = defineProps({
        task: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    });

    const emit = defineEmits(['deleteTask', 'toggleComplete']);

    const handleDelete = () => {
        emit('deleteTask', props.index);
        toast.warning('Task deleted!');
    };

    const handleToggle = (event) => {
        emit('toggleComplete', props.index, event.target.checked);
    };
</script>

<template>
    <div class="mx-10">
        <div class="rounded-lg bg-white h-8 flex items-center px-3">
            <label :class="{'line-through text-gray-500': completed, 'text-black': !completed}" class="font-bold">
                <input 
                    class="accent-lime-500 mr-1" 
                    type="checkbox" 
                    :checked="completed"
                    @change="handleToggle"
                > 
                {{ task }}
            </label>
            <div class="justify-end flex-1 flex items-end">
                <button 
                    @click="handleDelete"
                    class="w-5 h-5 text-gray-500 pb-7 hover:bg-gray-200 hover:rounded-full hover:text-white"
                >x</button>
            </div>
        </div>  
    </div>  
</template>