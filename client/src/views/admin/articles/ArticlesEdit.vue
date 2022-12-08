<template>
    <div class="edit_article_container">
        <form class="edit_article_form" @submit.prevent="edit" autocomplete="off">
            <label for="title">Title</label>
            <input type="title" name="title" v-model="article.title" maxlength="20" class="add_article_title" required>
            <label for="description">Description (500 max)</label>
            <textarea name="description" required v-model="article.description" cols="50" rows="10" maxlength="500" class="add_article_textarea" ></textarea>
            <button type="submit" class="edit_article_btn">Modify</button>
        </form>
    </div>
</template>

<script>
import { articlesService } from '@/_services'

export default{
    name:'ArticleEdit',
    props: ['id'],
    data(){
        return{
            article:{
                title : '',
                description : '',
            }
        }
    },
    async mounted() {
        let data = await articlesService.getOneArticleData(this.id)
        this.article.title = data.title
        this.article.description = data.description
    },
    methods: {
        async edit(){
            await articlesService.edit(this.id, this.article)

            this.$router.push('/admin/articles/index')
        }
    },
}
</script>

<style>
.edit_article_container{
    width: 100%;
    height: 100vh;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:25px;
}

.edit_article_form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.edit_article_form label{
    margin-top: 35px;
    margin-bottom:10px; 
    color: var(--second_color);
}

.edit_article_textarea, .edit_article_title{
    border: none;
    background: var(--first_color);
    color: var(--second_color);
    text-align: center;
    border-radius:5px;
    font-size: 20px;
    box-sizing: border-box;
    padding: 5px 5px;
}

.edit_article_textarea, .edit_article_title{
    outline: none !important;
}

.edit_article_textarea{
    max-width: 750px; 
    max-height: 350px; 
}

.edit_article_btn{
    border:none;
    color: var(--second_color);
    background: var(--first_color);
    margin-top:50px;
    border-radius:25px;
    font-size: 20px;

    padding: 10px 50px;
    cursor: pointer;
}

.edit_article_btn:active{
    background: var(--darker_first_color);
}

</style>