<template>
    <div class="public_layout">
        <header>
            <PublicNav/>
        </header>
        <RouterView class="other"/>
    </div>
</template>

<script>
import PublicNav from '@/components/PublicNav.vue'

export default{
    name:'PublicLayout',
    components: {
        PublicNav
    }
}
</script>

<style>
    .public_layout *{
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>