<template>
    <div class="login_container" v-if="!isLogged">
        <router-link to="/">
            <div class="site_icon">
                <svg width="219" height="294" viewBox="0 0 219 294" xmlns="http://www.w3.org/2000/svg">
                    <path d="M75 21L124.363 82.5H25.6366L75 21Z"/><path d="M162 82.5L112.637 21L211.363 21L162 82.5Z"/><rect y="21" width="75" height="253"/><path d="M75 274L103.579 216.25H46.4212L75 274Z"/><path d="M142 215.9L113.421 274.01H170.579L142 215.9Z"/><path d="M87.6818 209V92.6364H136.205C144.917 92.6364 152.208 93.8674 158.08 96.3295C163.989 98.7917 168.42 102.239 171.375 106.67C174.367 111.102 175.864 116.235 175.864 122.068C175.864 126.5 174.936 130.458 173.08 133.943C171.223 137.39 168.667 140.25 165.409 142.523C162.152 144.795 158.383 146.386 154.102 147.295V148.432C158.799 148.659 163.136 149.928 167.114 152.239C171.129 154.549 174.348 157.769 176.773 161.898C179.197 165.989 180.409 170.837 180.409 176.443C180.409 182.693 178.818 188.28 175.636 193.205C172.455 198.091 167.852 201.955 161.83 204.795C155.807 207.598 148.496 209 139.898 209H87.6818ZM115.807 186.33H133.193C139.292 186.33 143.78 185.174 146.659 182.864C149.576 180.553 151.034 177.333 151.034 173.205C151.034 170.212 150.333 167.636 148.932 165.477C147.53 163.28 145.542 161.595 142.966 160.42C140.39 159.208 137.303 158.602 133.705 158.602H115.807V186.33ZM115.807 140.477H131.375C134.443 140.477 137.17 139.966 139.557 138.943C141.943 137.92 143.799 136.443 145.125 134.511C146.489 132.58 147.17 130.25 147.17 127.523C147.17 123.621 145.788 120.553 143.023 118.318C140.258 116.083 136.527 114.966 131.83 114.966H115.807V140.477Z"/>
                </svg>
            </div>
        </router-link>
        <form class="login_form" @submit.prevent="login">
            <div>
                <label for="email">Email :</label>
                <input type="email" name="email" id="email" v-model="user.email" required>
            </div>
            <div>
                <label for="password">Mot de passe :</label>
                <input type="password" name="password" id="password" v-model="user.password" required>
            </div>
            <button type="submit" class="connexion_btn">Connexion</button>
        </form>
        <router-link to="/register" class="register_login_btn">Register</router-link>
    </div>
    <div v-else>
        <AlreadyLogged/>
    </div>
</template>

<script>
import { accountServices } from '@/_services'
import AlreadyLogged from '@/components/AlreadyLogged.vue'

export default{
    name:'Login',
    components:{
        AlreadyLogged,
    },
    data(){
        return{
            user:{
                email: '',
                password: ''
            },
            isLogged: false
        }
    },
    async mounted() {
        this.isLogged = await accountServices.isLogged()
    },
    methods:{
        async login(){
            await accountServices.login(this.user)
                .then(res => res.data.data)
                .then(data => {
                    accountServices.saveToken(data.token)
                })
                .catch(err => console.log(err))
            
            this.$router.push('/')

        }
    }
}
</script>

<style>
.login_container{
    height: 100vh;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: Arial;

    color: var(--second_color);
}

.login_link_home{
    position: absolute;
    left: 50%;
    top:15px;
    transform: translateX(-50%);

    width:100px;
}

.login_form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    gap:35px;
}

.login_form div{
    position: relative;
}

.login_form div label{
    position: absolute;
    left:calc(-100% - 15px);
    text-align: right;
    width: 100%;

    font-size: 20px;
}

.login_form div input{
    border:none;
    background: var(--second_color);
    font-size: 16px;
    padding:4px 25px;
    text-align: center;
    border-radius:15px;
}

.login_form div input:focus{
    outline: none;
}

.connexion_btn{
    color:var(--back);
    background: var(--second_color);
    padding:10px 40px;
    border:none;
    border-radius: 15px;
    font-size:20px;

    cursor: pointer;
}

.connexion_btn:active{
    background: var(--darker_second_color);
}

.register_login_btn{
    text-decoration: none;
    color:var(--second_color);
    background: var(--first_color);
    padding:10px 40px;
    border:none;
    border-radius: 15px;
    font-size:12px;

    position: absolute;
    right:50px;
    bottom:50px;

    cursor: pointer;
}

.register_login_btn:active{
    background: var(--darker_first_color);
}

.login_container .site_icon>svg{
    width: 120px !important;
    height: 160px !important;
    margin-top: -200px;
    margin-bottom: 100px;
}
</style>