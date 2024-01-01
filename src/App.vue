<template>
	<main>
		<!-- Header -->
		<header>
			<img src="./assets/pinia-logo.svg" alt="pinia-logo" />
			<h1>{{ name }}</h1>
		</header>

		<!-- Add New Task Form -->
		<div class="new-task-form">
			<TaskForm />
		</div>

		<div class="filter">
			<button
				class=""
				:class="{ active: filter === 'all' }"
				@click="filter = 'all'"
			>
				All Tasks
			</button>
			<button
				class=""
				:class="{ active: filter === 'fav' }"
				@click="filter = 'fav'"
			>
				Favourite Tasks
			</button>
		</div>

		<!-- Loading -->
		<div class="loading" v-if="loading">Loading...</div>

		<!-- All Task -->
		<div class="task-list" v-if="filter === 'all'">
			<p>You have {{ totalCount }} tasks left to do.</p>
			<div v-for="task in tasks" :key="task.id">
				<TaskDetail :task="task" />
			</div>
		</div>

		<!-- Favorite Task -->
		<div class="task-list" v-if="filter === 'fav'">
			<p>You have {{ favCount }} tasks left to do.</p>
			<div v-for="task in favTasks" :key="task.id">
				<TaskDetail :task="task" />
			</div>
		</div>

		<!-- reset -->
		<button @click="taskStore.$reset">reset the state</button>
	</main>
</template>

<script>
import { useTaskStore } from "./stores/TaskStore";
import TaskDetail from "./components/TaskDetail.vue";
import TaskForm from "./components/TaskForm.vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

export default {
	components: {
		TaskDetail,
		TaskForm,
	},
	setup() {
		const taskStore = useTaskStore();
		const filter = ref("all");

		const { favCount, totalCount, favTasks, tasks, loading, name } =
			storeToRefs(taskStore);

		taskStore.getTasks();

		return {
			taskStore,
			filter,
			favCount,
			totalCount,
			favTasks,
			tasks,
			loading,
			name,
		};
	},
};
</script>
