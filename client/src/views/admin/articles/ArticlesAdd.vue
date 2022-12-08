<template>
    <div class="add_article_container">
        <form class="add_article_form" @submit.prevent="add" autocomplete="off">
            <label for="title">Title</label>
            <input type="title" name="title" v-model="article.title" maxlength="20" class="add_article_title" required>
            <label for="description">Description (500 max)</label>
            <textarea name="description" required v-model="article.description" cols="50" rows="10" maxlength="500" class="add_article_textarea" ></textarea>
            <button type="submit" class="add_article_btn">Add</button>
        </form>
    </div>
</template>

<script>
import { articlesService } from '@/_services'

export default{
    name:'ArticlesAdd',
    data(){
        return{
            article:{
                title: '',
                description: '',
                author_id: ''
            }
        }
    },
    methods:{
        async add(){
            this.article.author_id = 0;
            await articlesService.addArticle(await this.article)

            this.$router.push('/admin/articles/index')
        }
    }
}
</script>
