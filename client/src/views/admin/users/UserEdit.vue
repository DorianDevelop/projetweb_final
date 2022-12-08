<template>
    <div class="account_container">
        <h1 class="acc_name" @click="modify_pseudo = !modify_pseudo" v-if="!modify_pseudo">{{user.pseudo}}</h1>
        <form v-else class="change_form" @submit.prevent="edit">
            <input type="text" v-model="user.pseudo" class="change_pseudo">
            <button type="submit" class="change_pseudo_btn"><i class="fa-solid fa-check"></i></button>
        </form>
        <p class="acc_mail" @click="modify_email = !modify_email" v-if="!modify_email">{{user.email}}</p>
        <form v-else class="change_form" @submit.prevent="edit">
            <input type="text" v-model="user.email" class="change_email">
            <button type="submit" class="change_email_btn"><i class="fa-solid fa-check"></i></button>
        </form>
    </div>
</template>

<script>
import { accountServices } from '@/_services'

export default{
    name:'UserEdit',
    props: ['id'],
    data(){
        return{
            user:{
                pseudo : '',
                email : ''
            },
            modify_email:false,
            modify_pseudo:false
        }
    },
    async mounted() {
        let data = await accountServices.getOneUserDatas(this.id)
        this.user.pseudo = data.pseudo
        this.user.email = data.email
    },
    methods: {
        async edit(){
            await accountServices.edit(this.id, this.user)

            this.$router.push('/admin/users/index')
        }
    },
}
</script>

<style>
</style>