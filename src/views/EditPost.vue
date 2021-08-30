<template>
  <div class="container" v-if="postItem">
    <h2 class="mt-2 mb-4">Update post</h2>
    <editForm :post-item="postItem" :save-post="updatePost"></editForm>

    <b-modal v-model="successModal" title="Your changes are saved">
      <p class="my-4">Go to the homepage?</p>
      <template #modal-footer>
        <b-button variant="primary" @click="successModal = !successModal">Cancel</b-button>
        <router-link :to="{name: 'Home'}" class="btn btn-secondary" data-dismiss="modal">Go back to blog</router-link>
      </template>
    </b-modal>

  </div>
</template>

<script>
import editForm from '@/components/EditForm.vue'
import api from "@/api";
import url from "@/api/url";
import mixins from "@/mixins";

export default {
  name: "EditPost",
  components: {
    editForm,
  },
  data() {
    return {
      postID: this.$route.params.id,
      successModal: false,
      postItem: {
        post_cats: [],
        tags: [],
      },
    }
  },
  mixins: [mixins],
  created() {
    api.getContentType(`${url.posts}/${this.postID}`, (response) => {
      const post = response.data;
      this.postItem.post_title = post.post_title;
      this.postItem.post_content = post.post_content;
      this.postItem.id = post.id;
      this.postItem.post_cats = mixins.relatedItemsId(post.post_cats);
      this.postItem.tags = mixins.relatedItemsId(post.tags);
    })
  },
  methods: {
    updatePost(post) {
      api.updateContent(url.posts, post, () => {
        this.successModal = true;
      })
    }
  }


}
</script>