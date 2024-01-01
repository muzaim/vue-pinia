<template>
	<form @click.prevent="handleSubmit">
		<input
			type="text"
			name="task"
			v-model="newTask"
			placeholder="I need to do ..."
		/>
		<button type="submit">Submit</button>
	</form>
</template>

<script>
import { useTaskStore } from "@/stores/TaskStore";
import { ref } from "vue";

export default {
	setup() {
		const taskStore = useTaskStore();

		const newTask = ref("");

		const handleSubmit = () => {
			if (newTask.value.length > 0) {
				taskStore.addNewTask({
					title: newTask.value,
					isFav: false,
					id: Math.floor(Math.random() * 1000),
				});
			}
			newTask.value = "";
		};

		return { handleSubmit, newTask };
	},
};
</script>
