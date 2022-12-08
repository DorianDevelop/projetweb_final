<template>
    <div class="dashboard_container">
        <h1>A.D.M.I.N</h1>
    </div>
</template>

<script>
import { accountServices } from '@/_services'

export default{
    name:'Dashboard',
    methods:{
        logout(){
            accountServices.logout();
        }
    }
}
</script>

<style>
.dashboard_container{
    height: 100vh;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 2.5rem;
    color: var(--second_color);
}
</style>