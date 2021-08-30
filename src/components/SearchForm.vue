<template>
  <form class="d-flex align-items-center mb-4" v-on:submit.prevent="sendQuery(searchQuery)">
    <div class="input-group">
      <input id="search" name="search" type="search" class="form-control" v-model="searchQuery">
      <button type="button" class="btn bg-transparent" style="margin-left: -40px; z-index: 100;" v-if="searchQuery"
              @click="restoreSearch()">
        <b-icon-x></b-icon-x>
      </button>
    </div>
    <button class="btn btn-primary ml-3" type="button" @click="sendQuery(searchQuery)">Search</button>
  </form>
</template>

<script>
export default {
  name: "SearchForm",
  data() {
    return {
      searchQuery: '',
    }
  },
  methods: {
    sendQuery(searchQuery) {
      this.$emit('searchByQuery', searchQuery)
    },
    restoreSearch() {
      this.searchQuery = '';
      this.sendQuery(this.searchQuery);
    }
  }
}
</script>

<style>
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}
</style>