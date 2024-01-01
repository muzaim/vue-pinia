<template>
	<div class="task">
		<div class="isi">
			<h3>{{ task.title }}</h3>
			<p>{{ task.description }}</p>
		</div>
		<div class="icons">
			<i class="material-icons" @click="taskStore.deleteTask(task.id)"
				>delete</i
			>
			<i
				class="material-icons"
				:class="{ active: task.isFav }"
				@click="taskStore.toggleFav(task.id)"
				>favorite</i
			>
		</div>
	</div>
</template>

<script>
import { useTaskStore } from "@/stores/TaskStore";
export default {
	props: ["task"],
	setup() {
		const taskStore = useTaskStore();

		return { taskStore };
	},
};
</script>
