<template>
    <div>
    <div class="articles_container" >
            <div v-for="(article, index) in articles" v-bind:key="article.id">
                <div class=article_card @mousemove="onMousemove($event, index)">
                    <h2 class="art_title">{{article.title}}</h2>
                    <p class="art_content">
                        {{ article.description }}
                    </p>
                    <div class="art_bottom">
                        <p class="art_date">{{ dateAndHourFormat[index] }}</p>
                        <div class="icon_like" @click="likeAnArticle(article.id)" v-if="!adminLooking && logged">
                            <div v-if="idOfLikedArticles.includes(article.id)">
                                <i class="fa-solid fa-heart"></i>
                            </div>
                            <div v-else>
                                <i class="fa-regular fa-heart"></i>
                            </div>
                        </div>
                        
                        <p class="art_author">{{ authorName[index] }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="palettes">
            <div class="second_color" @click="palette_black_white"></div>
            <div class="first_color" @click="palette_purple_black"></div>
        </div>
        <form class="research_div" @submit.prevent="searching" autocomplete="off">
            <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            <input type="text" name="research" id="research" class="research" placeholder="Search" v-model="search">
        </form>
    </div>
</template>

<script>
import { articlesService, accountServices } from '@/_services'

export default{
    name:'Home',
    data(){
        return{
            articles:[],
            authorName:[],
            idOfLikedArticles:[],
            adminLooking: false,
            logged: false,
            search:''
        }
    },
    async mounted(){
        this.articles = await articlesService.getAllArticles()
        this.logged = await accountServices.isLogged()

        let author_id_list = [];
        this.articles.forEach(async a => {
            if(author_id_list.includes(a.author_id)){
                let index = author_id_list.indexOf(a.author_id)
                this.authorName.push(authorName[index])
            }
            else
                await this.getAuthorName(a.author_id)
        })

        await this.getLiked();
    },
    computed:{
        dateAndHourFormat(){
            return this.articles.map(u => u.created_on.split('T')[0].split('-').reverse().join('/'))
        }
    },
    methods: {
        async getLiked(){
            let userId = await accountServices.getUserId()

            if(userId == 0){
                this.adminLooking = true
                return null
            }

            this.idOfLikedArticles.splice(0)
            let datas = await articlesService.getLikedArticleFrom(userId)
            datas.forEach(e => {
                this.idOfLikedArticles.push(e.id)
            })
        },
        async likeAnArticle(id){
            let userId = await accountServices.getUserId()

            if(this.idOfLikedArticles.includes(id)){
                articlesService.deleteLikedArticle({"userId" : userId, "articleId" : id})
            }else{
                articlesService.addLikedArticle({"userId" : userId, "articleId" : id})
            }

            this.getLiked()
        },
        async getAuthorName(id){
            let user = await accountServices.getOneUserDatas(id);
            this.authorName.push(user.pseudo)
        },
        onMousemove(e, index) {
            let article = document.getElementsByClassName("article_card")[index];

            let centerX = article.getBoundingClientRect().x + window.scrollX + article.getBoundingClientRect().width/2
            let centerY = article.getBoundingClientRect().y + window.scrollY + article.getBoundingClientRect().height/2

            let xPos = (centerX - e.pageX);
            xPos = xPos * (15 / (article.getBoundingClientRect().width/2));
            let yPos = (centerY - e.pageY);
            yPos = yPos * (15 / (article.getBoundingClientRect().height/2));

            article.style.boxShadow = xPos + "px " + yPos + "px 4px var(--opacity_second_color)"
        },
        async searching(){
            this.articles = await articlesService.getSearchedArticles({"search" : this.search})

            let author_id_list = [];
            this.articles.forEach(async a => {
                if(author_id_list.includes(a.author_id)){
                    let index = author_id_list.indexOf(a.author_id)
                    this.authorName.push(authorName[index])
                }
                else
                    await this.getAuthorName(a.author_id)
            })
        },
        palette_black_white(){
            var r = document.querySelector(':root');
            r.style.setProperty('--first_color', '#24272B');
            r.style.setProperty('--darker_first_color', '#111314');
            r.style.setProperty('--second_color', '#2bb1dd');
            r.style.setProperty('--darker_second_color', '#154f63');
            r.style.setProperty('--back', '#F2F2F2');
            r.style.setProperty('--opacity_second_color', '#9b9b9b63');
        },
        palette_purple_black(){
            var r = document.querySelector(':root');
            r.style.setProperty('--first_color', '#7d5ba6ff');
            r.style.setProperty('--darker_first_color', '#543d70');
            r.style.setProperty('--second_color', '#c6d4ffff');
            r.style.setProperty('--darker_second_color', '#777e96');
            r.style.setProperty('--back', '#272727ff');
            r.style.setProperty('--opacity_second_color', '#c7d5ff17');
        }
    },
}
</script>

<style>
.articles_container{
    display: grid;
    grid-template-columns: auto auto auto;
    grid-row: auto auto auto;
    grid-column-gap: 50px;
    
    row-gap: 75px;
    justify-content: center;
    padding: 150px 0;
}

.article_card{
    width:350px;
    height: 500px;
    background: var(--first_color);
    box-shadow: 15px 15px 4px var(--opacity_second_color);
    transition: box-shadow 0.1s;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;
    padding: 10px 20px;

    font-family: Arial;
    position: relative;
}

.art_title{
    color:var(--second_color);
    width: 100%;
    
    font-weight: 400;
    font-size: 30px;
    padding: 4px 0;
}

.art_title::after{
    content: '';
    width: 220px;
    height: 1px;
    display: block;
    margin:10px auto;

    background: var(--second_color);
}

.art_content{
    color:var(--second_color);
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;

    height: 78%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.art_bottom{
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    color: var(--second_color);
    padding: 10px 20px;
}

.icon_like{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
}

.palettes{
    position: fixed;
    bottom: 30px;
    left:30px;
    display: flex;
    align-items: center;
    gap: 15px;
}

.palettes div{
    width: 25px;
    height: 25px;
    border-radius: 100%;
    cursor: pointer;
}

.palettes div:active{
    opacity: 0.5;
}

.first_color{
    background: linear-gradient(120deg, rgba(125,91,166,1) 0%, rgba(39,39,39,1) 75%);
}

.second_color{
    background: linear-gradient(120deg, rgba(242,242,242,1) 0%, rgba(36,39,43,1)75%);
}

.research_div{
    position: fixed;
    right:50px;
    bottom: 50px;
}

.research_div button{
    position: absolute;
    font-size: 16px;
    right:7px;
    top:50%;
    transform: translateY(-50%);
    color:var(--opacity_second_color);
    background: none;
    border: none;
    cursor: pointer;
}

.research_div button:active{
    color:var(--first_color);
    opacity: 0.5;
}

.research{
    border:1px solid var(--first_color);
    background: var(--back);
    height: 30px;
    width: 250px;
    border-radius: 10px;
    padding:3px 10px;
    text-align: left !important;
}

</style>