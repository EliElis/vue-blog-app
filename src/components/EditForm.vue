<template>
  <div class="container" v-if="postItem">
    <form action="">
      <div class="mb-3">
        <label for="post_title" class="form-label">Post Title*:</label>
        <input name="post_title" class="form-control" id="post_title" type="text" v-model="postItem.post_title">
      </div>

      <div class="mb-3 row">
        <div class="col-md-6 col-12">
          <label class="form-label">Category:</label>
          <b-form-select v-model="postItem.post_cats" v-if="cats" multiple>
            <b-form-select-option v-for="cat in cats" :value="cat.id" :key="cat.id">{{ cat.category_name }}
            </b-form-select-option>
          </b-form-select>
        </div>

        <div class="col-md-6 col-12" v-if="tags && postItem.tags">
          <label class="form-label">Tag: </label>
          <b-form-select v-model="postItem.tags" multiple>
            <b-form-select-option v-for="tag in tags" :value="tag.id" :key="tag.id">{{ tag.tag_name }}
            </b-form-select-option>
          </b-form-select>
        </div>
      </div>

      <div class="mb-3">
        <label for="post_content" class="form-label">Post Content*:</label>
        <textarea name="post_content" id="post_content" class="form-control" cols="30" rows="10"
                  v-model="postItem.post_content"></textarea>
      </div>

      <b-button variant="primary" @click="postPreSave(postItem)">Save changes</b-button>
      <router-link class="btn btn-danger ml-3" :to="{name: 'Home'}">Cancel</router-link>

      <div v-if="showError" role="alert" class="alert alert-danger mt-4">Please fill Title and Content fields</div>
    </form>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "EditForm",
  props: ['postItem', 'savePost'],

  data() {
    return {
      showError: false,
    };
  },
  computed: {
    ...mapState(['cats', 'tags'])
  },
  methods: {
    ...mapActions(['getCats', 'getTags']),
    postPreSave(post) {
      if (post.post_title && post.post_content) {
        this.showError = false;
        this.savePost(post)
      } else {
        this.showError = true;
      }
    },
  },
  created() {
    this.getCats();
    this.getTags();
  },
}
</script>