<template>
  <div class="container">
    <h2 class="mt-2 mb-4">Add new post</h2>
    <editForm :post-item="postItem" :save-post="addPost"/>

    <b-modal v-model="successModal" title="Your post was added">
      <p class="my-4">Do you want to add more posts?</p>
      <template #modal-footer>
        <b-button variant="primary" @click="successModal = !successModal">Cancel</b-button>
        <router-link :to="{name: 'Home'}" class="btn btn-secondary" data-dismiss="modal">Go back to blog</router-link>

      </template>
    </b-modal>
  </div>
</template>

<script>
import editForm from '@/components/EditForm.vue'
import api from '@/api'
import url from '@/api/url'

export default {
  name: "AddPost",
  components: {
    editForm,
  },
  data() {
    return {
      postItem: {
        post_title: null,
        post_content: null,
        post_cats: [],
        tags: [],
      },
      successModal: false,
    };
  },

  methods: {
    addPost(post) {
      api.addContent(url.posts, post, () => {
        this.successModal = true;
        this.postItem = {
          post_title: null,
          post_content: null,
          post_cats: [],
          tags: [],
        };
      });
    },
  },
}
</script>