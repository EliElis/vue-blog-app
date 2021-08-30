<template>
  <div>
    <div class="container d-flex justify-content-between align-items-center mt-4 mb-4">
      <router-link :to="{name: 'Home'}" class="header-logo">
        <h1>A Sample Blog</h1>
      </router-link>

      <router-link v-if="currentPath !== 'New Post'" class="btn btn-outline-primary" :to="{name: 'New Post'}">Add post
      </router-link>
      <router-link v-else class="btn btn-outline-danger" :to="{name: 'Home'}">Cancel</router-link>
    </div>
    <router-view :key="$route.path"/>
  </div>

</template>

<script>
export default {
  data() {
    return {
      currentPath: this.$router.history.current.name,
      prevPath: '',
    }
  },
  watch: {
    $route(to, from) {
      this.currentPath = to.name;
      this.prevPath = from.name;
    },
  },
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/src/index";

.header-logo {
  color: #101622;

  &:hover {
    color: #101622;
    text-decoration: none;
  }
}
</style>