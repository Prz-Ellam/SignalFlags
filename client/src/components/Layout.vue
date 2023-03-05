<template>
	<div class="vh-100 d-flex flex-column">
		<div class="flex-grow-0 flex-shrink-1">
			<Navbar />
		</div>
		<div class="d-flex flex-md-row-reverse flex-column flex-grow-1 flex-shrink-1 overflow-auto">
			<section class="flex-grow-1 flex-shrink-1 overflow-auto">
				<Chat />
			</section>
			<aside class="d-flex flex-grow-0 flex-shrink-1">
				<Sidebar />
			</aside>
		</div>
	</div>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import Chat from '../views/Chat.vue';
import Group from '../views/Group.vue';

export default {
	components: {
		Navbar,
		Sidebar,
		Chat,
		Group
	},
	data() {
		return {

		}
	},
	methods: {

	}
}

</script>

<style scoped>
</style>