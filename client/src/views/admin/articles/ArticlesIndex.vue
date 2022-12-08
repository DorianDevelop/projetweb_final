<template>
    <div class="list_admin_articles_container">
        <router-link to="/admin/articles/add" class="add_article">New Poste</router-link>
        <table class="admin_list_articles">
            <thead>
            <th class="index">Index</th>
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
                <td><router-link :to="`/admin/articles/edit/${article.id}`"><i class="fa-solid fa-pen-to-square"></i></router-link></td>
                <td><button v-on:click="supp(article.id)" class="icon_btn"><i class="fa-solid fa-trash-can td_function"></i></button></td>
            </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
import { articlesService } from '@/_services'

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
            this.articles = await articlesService.getAllArticles()
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
.list_admin_articles_container{
    min-height: 100vh;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    gap:65px;
    color: var(--second_color);
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

.admin_list_articles {
    table-layout:fixed;
    margin: 15px auto;
}

.admin_list_articles {
    color: var(--second_color);
    background: var(--first_color);
    font-size: 12pt;
    border-collapse: collapse;
}

.admin_list_articles .table_tiltes th, .admin_list_articles tfoot th {
    color: var(--darker_second_color);
    background: var(--darker_first_color);
}

.admin_list_articles caption {
    padding:.6em;
}

.admin_list_articles th, .admin_list_articles td {
    padding: .6em;
    border: 1px solid var(--darker_second_color);
}
</style>