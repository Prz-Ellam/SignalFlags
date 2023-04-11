<template>
<<<<<<< HEAD
  <div class="autocomplete-container">
=======
  <div>
>>>>>>> bk/autocompleteVer2
    <input
      type="search"
      name="search"
      autocomplete="off"
      class="bg-secondary form-control shadow-none text-white rounded-4 mb-1"
      placeholder="Buscar personas..."
      v-model="search"
<<<<<<< HEAD
      
=======
      v-on:keyup="onChange"
>>>>>>> bk/autocompleteVer2
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul
<<<<<<< HEAD
      class="autocomplete-results scrollbar bg-secondary rounded-3 position-absolute w-100"
      v-if="isOpen"
=======
      class="autocomplete-results scrollbar bg-secondary rounded-3 position-absolute start-25"
      style="width: 28.5%; max-width: 29%;"
      v-show="isOpen"
>>>>>>> bk/autocompleteVer2
    >
      <li v-if="isLoading" class="loading">
        Loading results...
      </li>
      <li
        v-for="(result, i) in results"
        :key="result._id"
        @click="$event => { setResult(result); $emit('click', result._id) }"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        <div class="d-flex align-items-center">
          <div class="text-start w-100 rounded-3">
            <div class="p-1">
              <img
                class="img-fluid rounded-circle user-image"
<<<<<<< HEAD
                :src="`/api/v1/images/${result.avatar}`"
=======
                src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg"
>>>>>>> bk/autocompleteVer2
                alt="Perfil"
              />
              <span class="h6 ms-2 me-2">{{ result.username }}</span>
            </div>
          </div>
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
      arrowCounter: -1,
      isLoading: false
    }
  },
  props: {
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  emits: [
    'click'
  ],
  watch: {
      search: function(val, oldVal) {
        if (val == '') {
          this.isOpen = false;
          return;
        }

        this.filterResults();
        if (this.results.length > 0) {
          this.isOpen = true
        } else {
          this.isOpen = false
        }
      }
    },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    setResult(result) {
      this.search = result.username
      this.isOpen = false
    },
    sendAlert(num) {
      console.log(num)
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.arrowCounter = -1
        this.isOpen = false
      }
    },
<<<<<<< HEAD
    filterResults() {
      this.results = this.items.filter(
        (item) => item.username.toLowerCase().indexOf(this.search?.toLowerCase()) > -1,
      );
      return this.results;
=======
    onChange() {
      this.$emit('input', this.search)

      if (this.isAsync) {
        this.isLoading = true
      } else {
        if (this.filterResults().length > 0) {
          this.isOpen = true
        } else {
          this.isOpen = false
        }
      }
    },
    filterResults() {
      this.results = items.filter(
        (item) => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1,
      )
      return this.results
>>>>>>> bk/autocompleteVer2
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter() {
      console.log('Enter');
      this.search = this.results[this.arrowCounter].username;
      this.arrowCounter = -1;
      this.isOpen = false;
    },
  },
}
</script>

<style scoped>
<<<<<<< HEAD
.autocomplete-container {
  position: relative;
}

.user-image {
  width: 32px;
  height: 32px;
=======
.user-image {
  width: 38px;
  height: 38px;
>>>>>>> bk/autocompleteVer2
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
  max-height: 300px;
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
