<template>
  <div class="position-relative">
    <input
      type="text"
      autocomplete="off"
      class="bg-secondary form-control rounded-4 mb-1"
      placeholder="Buscar personas..."
      v-model="search"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul
      class="autocomplete-results scrollbar bg-secondary rounded-3 position-absolute w-100"
      v-if="isOpen"
    >
      <li
        v-for="(result, i) in results"
        :key="result._id"
        :class="{ 'autocomplete-result': true, 'is-active': i === arrowCounter }"
        @click="handleClick(result);"
      >
        <div class="p-1">
          <img
            class="img-fluid rounded-circle user-image"
            :src="`/api/v1/images/${result.avatar}`"
            alt="Perfil"
          />
          <span class="h6 m-2">{{ result.username }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      arrowCounter: -1
    }
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: [],
    },
  },
  emits: [
    'click'
  ],
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    handleInput(event) {
      if (this.search === '') {
        this.isOpen = false;
        return;
      }

      this.filterResults();
      this.isOpen = this.results.length > 0 ? true : false;
    },
    handleFocus(event) {
      if (this.search === '') {
        this.isOpen = false;
        return;
      }

      this.filterResults();
      this.isOpen = this.results.length > 0 ? true : false;
    },
    handleBlur(event) {
      
    },
    handleClick(result) {
      this.search = '';
      this.isOpen = false;
      this.$emit('click', result._id);
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.arrowCounter = -1
        this.isOpen = false;
      }
    },
    filterResults() {
      this.results = this.items.filter(
        (item) => item.username.toLowerCase().indexOf(this.search?.toLowerCase()) > -1,
      );
      return this.results;
    },
    onArrowDown(event) {
      event.preventDefault();
      if (this.arrowCounter < this.results.length - 1) {
        const autocompleteResults = document.querySelector('.autocomplete-results');
        this.arrowCounter++;
        this.search = this.results[this.arrowCounter]?.username ?? '';
        if (this.arrowCounter >= 5)
          autocompleteResults.scrollTop += 50;
      }
    },
    onArrowUp(event) {
      event.preventDefault();
      if (this.arrowCounter >= 0) {
        const autocompleteResults = document.querySelector('.autocomplete-results');
        this.arrowCounter--;
        this.search = this.results[this.arrowCounter]?.username ?? '';
        autocompleteResults.scrollTop -= 50;
      }
    },
    onEnter(event) {
      event.preventDefault();
      //this.search = this.results[this.arrowCounter].username;
      this.search = '';
      this.$emit('click', this.results[this.arrowCounter]._id);
      this.arrowCounter = -1;
      this.isOpen = false;
    },
  },
}
</script>

<style scoped>
.user-image {
  width: 32px;
  height: 32px;
  object-fit: cover;
}

.scrollbar {
  scrollbar-color: #ffb800 #6d6f7d !important;
  scrollbar-width: thin !important;
}

.scrollbar::-webkit-scrollbar {
  width: 8px;
  border-radius: 1em;
  background-color: #6d6f7d;
  border-radius: 1em;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 1em;
  background-color: #6d6f7d;
  background: #ffb800;
  border-radius: 1em;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  visibility: visible;
  background: #ffb800;
}

.autocomplete-results {
  padding: 0;
  max-height: 250px;
  overflow: auto;
  min-height: 50px;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
}

.autocomplete-result {
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}
.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #232323;
}
</style>
