<template>
    <div class="admin_layout">
        <header>
            <AdminNav/>
        </header>
        <div class="content">
            <RouterView class="other"/>
        </div>
    </div>
</template>

<script>
import AdminHeader from '@/components/AdminHeader.vue'
import AdminNav from '@/components/AdminNav.vue'

export default{
    name:'AdminLayout',
    components:{
        AdminHeader,
        AdminNav   
    }
}
</script>

<style>
    .admin_layout *{
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>