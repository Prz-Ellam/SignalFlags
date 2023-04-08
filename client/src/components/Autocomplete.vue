<template>
  <div>
    <input
      type="search"
      name="search"
      autocomplete="off"
      class="bg-secondary form-control shadow-none text-white rounded-4 mb-1"
      placeholder="Buscar personas..."
      v-model="search"
      v-on:keyup="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul
      class="autocomplete-results scrollbar bg-secondary rounded-3 position-absolute start-25"
      style="width: 28.5%; max-width: 29%;"
      v-show="isOpen"
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
        <div class="d-flex">
          <div class="text-start w-100 rounded-3">
            <div class="p-1">
              <img
                class="img-fluid rounded-circle user-image"
                src="https://i.kym-cdn.com/photos/images/facebook/001/884/907/c86.jpg"
                alt="Perfil"
              />
              <span class="h5 ms-2 me-2">{{ result }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ChatContact from '../components/ChatContact.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'

export default {
  name: 'SearchAutocomplete',
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
      arrowCounter: -1,
    }
  },
  components: {
    ChatContact,
  },
  props: {
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  watch: {
    items: function (value, oldValue) {
      if (this.isAsync) {
        this.results = value
        this.isOpen = true
        this.isLoading = false
      }
    },
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
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter]
      this.arrowCounter = -1
      this.isOpen = false
    },
  },
}

let items = [
  'Esmeralda Rodriguez',
  'Roberto Arriaga',
  'Saul Goodman',
  'James Lee',
  'Karina Smith',
  'Leonardo',
  'Oscar Villanueva',
]
</script>

<style scoped>
.user-image {
  width: 38px;
  height: 38px;
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
  max-height: 50%;
  overflow: auto;
  min-height: 50px;
  z-index: 10;
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
