<template>
    <div class="adminHead"> 
            <RouterLink to="/" class="returnHome">Home</RouterLink>
    </div>
</template>

<script>
export default{
    name:'AdminHeader'
}
</script>

<style>
    .adminHead{
        border-bottom: 1px solid black;
        color:rgb(56, 28, 28);
        padding:15px 0;
    }
    .returnHome{
        text-decoration: none;
        color:rgb(68, 68, 68);
        font-weight: bold;
        font-size: 1.8rem;
        transition: color 0.3s;
    }

    .returnHome:hover{
        color:rgb(6, 6, 158);
    }
</style>