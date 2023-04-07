<template>
	<div class="chat-drawer ps-1 py-2 pe-3 rounded-3">
		<a @click="$event => $emit('click', chatId)" class="text-decoration-none d-flex justify-content-between align-items-center">
			<div class="d-flex flex-row flex-nowrap align-items-center overflow-hidden">
				<div class="position-relative d-inline-block">
					<img 
						:src="image" 
						alt="avatar"
						class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
					>
					<span class="dot" :class="active ? 'green' : 'gray'"></span>
				</div>
				<div class="overflow-hidden text-nowrap">
					<p class="h6 mb-0 text-light">{{ username }}</p>
					<small class="text-primary mb-0 text-light">{{ lastMessage }}</small>
				</div>
			</div>
			<div>
				<p class="small text-muted mb-1 text-end">
          {{ lastMessageTime }}
        </p>
				<span
          :class="{ hidden: unseenMessagesCount === 0  }"
          class="badge rounded-pill bg-danger float-end">
          {{ unseenMessagesCount }}
        </span>
			</div>
		</a>
	</div>
</template>

<script>
export default {
	props: [
    'chatId',
		'image',
		'username',
		'lastMessage',
		'lastMessageTime',
    'unseenMessagesCount',
    'active'
	],
	emits: [
		'click'
	]
}
</script>

<style scoped>
.dot {
	position: absolute;
	bottom: 0;
	left: 50%;
	height: 10px;
	width: 10px;
	border-radius: 50%;
	display: inline-block;
}

.green {
  background-color: #00ff00;
}

.gray {
  background-color: #494949;
}

.chat-drawer:hover {
	background-color: #232323;
	cursor: pointer;
}

.chat-drawer a div img {
	width: 40px;
	height: 40px;
	object-fit: cover;
}

.chat-drawer a div div {
	text-overflow: ellipsis;
}

.chat-drawer adiv div small {
	overflow: hidden;
	text-overflow: ellipsis;
}

.chat-drawer a div div p {
	overflow: hidden;
	text-overflow: ellipsis;
}

.hidden {
  visibility: hidden;
}
</style>