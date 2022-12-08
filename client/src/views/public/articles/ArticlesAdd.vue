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
import { articlesService, accountServices } from '@/_services'

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
            this.article.author_id = await accountServices.getUserId();
            await articlesService.addArticle(await this.article)

            this.$router.push('/articles')
        }
    }
}
</script>

<style>
.add_article_container{
    height: 100vh;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--second_color);
}

.add_article_form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.add_article_form label{
    margin-top: 35px;
    margin-bottom:10px; 
    color: var(--second_color);
}

.add_article_textarea, .add_article_title{
    border: none;
    background: var(--first_color);
    color: var(--second_color);
    text-align: center;
    border-radius:5px;
    font-size: 20px;
    box-sizing: border-box;
    padding: 5px 5px;
}

.add_article_textarea, .add_article_title{
    outline: none !important;
}

.add_article_textarea{
    max-width: 750px; 
    max-height: 350px; 
}

.add_article_btn{
    border:none;
    color: var(--second_color);
    background: var(--first_color);
    margin-top:50px;
    border-radius:25px;
    font-size: 20px;

    padding: 10px 50px;
    cursor: pointer;
}

.add_article_btn:active{
    background: var(--darker_first_color);
}


</style>