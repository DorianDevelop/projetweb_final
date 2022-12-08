<template>
    <div class="already">
        <h1>You're already connected, do you want to log out ?</h1>
        <button @click="logout" class="btn-logout">Log out</button>
    </div>
</template>

<script>
import { accountServices } from '@/_services'

export default{
    name:'AlreadyLogged',
    methods: {
        logout(){
            accountServices.logout();
            this.$router.push('/')
        }
    },
}
</script>

<style>
    .already{
        font-family: Arial, Helvetica, sans-serif;
        width: 100%;
        height:100vh;
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        gap:100px;
    }

    .already button{
        font-size: 2rem;
        padding: 0.5rem 0.5rem;
    }
</style>