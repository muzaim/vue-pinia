import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [],
		loading: false,
		name: "nadia",
	}),
	getters: {
		favTasks() {
			return this.tasks.filter((task) => task.isFav);
		},
		favCount() {
			return this.tasks.reduce((p, c) => {
				return c.isFav ? p + 1 : p;
			}, 0);
		},
		totalCount: (state) => {
			return state.tasks.length;
		},
	},
	actions: {
		async getTasks() {
			this.loading = true;
			const res = await fetch("http://localhost:3000/tasks");
			const data = await res.json();

			this.tasks = data;

			this.loading = false;
		},
		async addNewTask(task) {
			this.tasks.push(task);

			const res = await fetch("http://localhost:3000/tasks", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(task),
			});

			if (res.error) {
				console.log(res.error);
			}
		},
		async deleteTask(id) {
			this.tasks = this.tasks.filter((task) => task.id !== id);

			await fetch("http://localhost:3000/tasks/" + id, {
				method: "DELETE",
			});
		},
		async toggleFav(id) {
			const task = this.tasks.find((task) => task.id === id);
			task.isFav = !task.isFav;

			await fetch("http://localhost:3000/tasks/" + id, {
				method: "PATCH",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ isFav: task.isFav }),
			});
		},
	},
});
