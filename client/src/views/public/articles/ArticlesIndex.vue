<template>
    <div class="list_articles_container">
        <router-link to="/articles/add" class="add_article">New Poste</router-link>
        <table class="list_articles">
  
            <thead class="table_tiltes">
                <th>Index</th>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date creation</th>
                <th>Edit</th>
                <th>Delete</th>
            </thead>
            <tbody>
            <tr v-for="(article, index) in articles" v-bind:key="article.id" style="height:25px;"> 
                <td class="index">{{ index }}</td>
                <td>{{ article.id }}</td>
                <td>{{ article.title }}</td>
                <td v-if="article.description.length<31">{{ article.description}}</td>
                <td v-else>{{ article.description.substring(0,30)+".." }}</td>
                <td>{{ dateFormat[index] }}</td>
                <td><router-link :to="`/articles/edit/${article.id}`" class="icon_btn"><i class="fa-solid fa-pen-to-square"></i></router-link></td>
                <td><button v-on:click="supp(article.id)" class="icon_btn"><i class="fa-solid fa-trash-can td_function"></i></button></td>
            </tr>
            </tbody>

        </table>
        
    </div>
</template>

<script>
import { articlesService, accountServices } from '@/_services'

export default{
    name:'ArticlesIndex',
    data(){
        return{
            articles : []
        }
    },
    computed:{
        dateFormat(){
            return this.articles.map(u => u.created_on.split('T')[0].split('-').reverse().join('/'))
        }
    },
    methods: {
        async createPage(){
            let userId = await accountServices.getUserId();
            this.articles = await articlesService.getAuthorArticles(userId)
        },
        async supp(index){
            await articlesService.deleteArticle(index)

            await this.createPage();
        }
    },
    async mounted() {
        await this.createPage();
    },
}
</script>

<style>
.list_articles_container{
    min-height: 100vh;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap:65px;
    color: var(--second_color);
}
.add_article{
    background: var(--first_color);
    border: none;
    text-decoration: none;
    border-radius: 25px;
    padding: 20px 50px;

    font-size: 20px;
    color:var(--second_color)
}

.add_article:active{
    background: var(--darker_first_color);
}

td a, .td_function{
    text-decoration: none;
    color:var(--second_color);
    cursor:pointer;
}

td a:active, .td_function:active{
    color:var(--darker_second_color)
}

.icon_btn{
    border:none;
    background: none;
}

.list_articles {
    table-layout:fixed;
    margin: 15px auto;
}

.list_articles {
    color: var(--second_color);
    background: var(--first_color);
    font-size: 12pt;
    border-collapse: collapse;
}

.list_articles .table_tiltes th, .list_articles tfoot th {
    color: var(--darker_second_color);
    background: var(--darker_first_color);
}

.list_articles caption {
    padding:.6em;
}

.list_articles th, .list_articles td {
    padding: .6em;
    border: 1px solid var(--darker_second_color);
}
</style>