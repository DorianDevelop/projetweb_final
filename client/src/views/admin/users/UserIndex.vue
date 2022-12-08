<template>
    <div class="list_users_container">
        <table class="list_users">
            <thead>
            <th class="index">Index</th>
            <th>Id</th>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Date creation</th>
            <th>Edit</th>
            <th>Delete</th>
            </thead>

            <tbody>
            <tr v-for="(user, index) in users" v-bind:key="user.id">
                <td class="index">{{ index }}</td>
                <td>{{ user.id }}</td>
                <td>{{ user.pseudo }}</td>
                <td>{{ user.email }}</td>
                <td>{{ dateFormat[index] }}</td>
                <td><router-link :to="`/admin/users/edit/${user.id}`"><i class="fa-solid fa-pen-to-square"></i></router-link></td>
                <td><button v-on:click="supp(user.id)" class="icon_btn"><i class="fa-solid fa-trash-can td_function"></i></button></td>
            </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
import { accountServices } from '@/_services'

export default{
    name:'UserIndex',
    data(){
        return{
            users : []
        }
    },
    computed:{
        dateFormat(){
            return this.users.map(u => u.created_on.split('T')[0].split('-').reverse().join('/'))
        }
    },
    methods: {
        async createPage(){
            this.users = await accountServices.getAllUsers()
            this.users.splice(0, 1);
        },
        async supp(index){
            await accountServices.deleteUser(index)

            await this.createPage();
        }
    },
    async mounted() {
        await this.createPage();
    },
}
</script>

<style>
.list_users_container{
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

.list_users {
    table-layout:fixed;
    margin: 15px auto;
}

.list_users {
    color: var(--second_color);
    background: var(--first_color);
    font-size: 12pt;
    border-collapse: collapse;
}

.list_users .table_tiltes th, .list_users tfoot th {
    color: var(--darker_second_color);
    background: var(--darker_first_color);
}

.list_users caption {
    padding:.6em;
}

.list_users th, .list_users td {
    padding: .6em;
    border: 1px solid var(--darker_second_color);
}
</style>