<template>
  <div class="post d-flex justify-content-between">
    <div>
      <div class="mb-2" v-if="postItem.post_cats && postItem.post_cats.length">
        <router-link v-for="cat in postItem.post_cats" :key="cat.id" :to="{path: `/cat/${cat.id}`}"
                     class="badge bg-light text-dark">{{ cat.category_name }}
        </router-link>
      </div>
      <router-link :to="`/post/${postItem.id}`" class="post-title h2">{{ postItem.post_title }}</router-link>
      <div class="mt-2" v-text="truncText(postItem.post_content)"></div>

      <p class="mt-3" v-if="postItem.tags && postItem.tags.length">
        <span class="h6 text-dark" v-for="tag in postItem.tags" :key="tag.id">#{{ tag.tag_name }} </span>
      </p>
    </div>

    <div class="flex-shrink-0 pl-5 mt-3">
      <router-link :to="{path: `/post-edit/${postItem.id}`, params: {id: postItem.id}}"
                   class="btn btn-outline-success mr-3">Update
      </router-link>
      <b-button @click="deleteModalShow = !deleteModalShow" v-b-modal="`modal-${postItem.id}`" variant="danger">Delete
      </b-button>
    </div>

    <b-modal v-model="deleteModalShow" title="Delete post">
      <p class="my-4">Are you sure you want to delete <strong>{{ postItem.post_title }}</strong>?</p>
      <template #modal-footer>
        <b-button variant="danger" @click="deleteItem(postItem.id)">Delete</b-button>
        <b-button variant="primary" @click="deleteModalShow = !deleteModalShow">Cancel</b-button>
      </template>
    </b-modal>

  </div>
</template>

<script>
import api from '@/api'
import url from '@/api/url';

export default {
  name: "PostItem",
  props: ['postItem', 'updatePosts'],

  data() {
    return {
      deleteModalShow: false
    }
  },

  methods: {
    deleteItem(id) {
      api.deleteContent(url.posts, id).then(() => {
        this.deleteModalShow = false;
        this.updatePosts();
      });
    },
    truncText(text) {
      if (text.length > 230) {
        text = text.substr(0, 230) + '...';
      }
      return text;
    }
  },
}
</script>

<style lang="scss">
.post {
  border-bottom: 1px solid #C0C0C0;
  padding: 15px 0;
  margin: 10px 0;
}
</style>
