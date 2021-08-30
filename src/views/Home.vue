<template>
  <div class="container mb-4" v-if="posts">
    <searchForm @searchByQuery="searchByQuery"/>

    <div class="list-group list-group-horizontal cats" v-if="cats">
      <router-link :to="{name: 'Home'}" class="list-group-item list-group-item-action list-group-item-secondary"
                   :class="currentPath === 'Home'? 'active' : ''">View all
      </router-link>
      <router-link :to="{path: `/cat/${cat.id}`}" active-class="active"
                   class="list-group-item list-group-item-action list-group-item-secondary"
                   v-for="cat in cats" :key="cat.id">{{ cat.category_name }}
      </router-link>
    </div>

    <template v-if="currentPosts && currentPosts.length > 0">
      <postItem v-for="post in currentPosts" :key="post.id" :post-item="post" :update-posts="getAllData"/>
    </template>

    <div v-if="noSearchResults" class="mt-4">
      <p class="h3">Sorry, no posts matched your criteria.</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import searchForm from '@/components/SearchForm.vue'
import postItem from '@/components/PostItem.vue'
import mixins from '@/mixins'

export default {
  name: 'Home',
  components: {
    searchForm,
    postItem,
  },
  mixins: [mixins],
  data() {
    return {
      currentPath: this.$router.history.current.name,
      currentCat: null,
      catPosts: [],
      currentPosts: [],
      noSearchResults: false,
    }
  },
  computed: {
    ...mapState(['posts', 'cats', 'tags'])
  },
  methods: {
    ...mapActions(['getPosts', 'getCats', 'getTags']),
    getCurrentPosts() {
      if (!this.currentCat) {
        this.currentPosts = this.posts;
      } else {
        const catObj = this.cats.find(el => el.id === +this.currentCat);
        let postIDs = mixins.relatedItemsId(catObj.blogs);
        this.currentPosts = mixins.getItemsByIDs(postIDs, this.posts)
      }
    },
    stringIncludes(str, query) {
      return str.toLowerCase().includes(query.toLowerCase());
    },
    taxonomyIncludes(tax, property, query) {
      if (tax) {
        return tax.find(el => {
          return this.stringIncludes(el[property], query)
        })
      }
    },
    searchByQuery(searchQuery) {
      this.getCurrentPosts();
      if (searchQuery) {
        this.noSearchResults = false;
        this.currentPosts = this.currentPosts.filter(item => {
          if (this.stringIncludes(item.post_title, searchQuery) || this.stringIncludes(item.post_content, searchQuery) ||
              this.taxonomyIncludes(item.post_cats, 'category_name', searchQuery) ||
              this.taxonomyIncludes(item.tags, 'tag_name', searchQuery)) {
            return item;
          }
        })
        if (this.currentPosts.length === 0) {
          this.noSearchResults = true;
        }
      }
    },
    getAllData() {
      this.getPosts(() => {
        this.getCats(() => {
          this.currentCat = this.$route.params.id;
          this.getCurrentPosts();
        })
      });
      this.getTags();
    }
  },
  created() {
    this.getAllData();
  },
  watch: {
    $route(to) {
      this.currentPath = to.name;
    },
  },
}
</script>
