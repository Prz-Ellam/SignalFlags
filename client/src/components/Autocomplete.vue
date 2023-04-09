<template>
  <div class="autocomplete-container">
    <input
      type="search"
      name="search"
      autocomplete="off"
      class="bg-secondary form-control shadow-none text-white rounded-4 mb-1"
      placeholder="Buscar personas..."
      v-model="search"
      
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul
      class="autocomplete-results scrollbar bg-secondary rounded-3 position-absolute w-100"
      v-if="isOpen"
    >
      <li v-if="isLoading" class="loading">
        Loading results...
      </li>
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        <div class="d-flex align-items-center">
          <div class="text-start w-100 rounded-3">
            <div class="p-1">
              <img
                class="img-fluid rounded-circle user-image"
                :src="`/api/v1/images/${result.avatar}`"
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
      this.search = result
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
    filterResults() {
      this.results = this.items.filter(
        (item) => item.username.toLowerCase().indexOf(this.search.toLowerCase()) > -1,
      );
      return this.results;
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
      this.search = this.results[this.arrowCounter];
      this.arrowCounter = -1;
      this.isOpen = false;
    },
  },
}
</script>

<style scoped>
.autocomplete-container {
  position: relative;
}

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
