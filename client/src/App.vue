<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  
  <RouterView />

</template>

<style>
*{
  margin: 0;
  padding: 0;
}

:root {
  --back: #F2F2F2;
  --first_color: #24272B;
  --second_color: #2bb1dd;
  --darker_first_color: #111314;
  --darker_second_color: #154f63;
  --opacity_second_color: #9b9b9b63;
}

body{
  background: var(--back);
}

.site_icon>svg{
    width: 60px;
    height: 80px;
    cursor: pointer;
}

.site_icon>svg>path,
.site_icon>svg>rect{ /*target the image with css*/
  fill: var(--first_color);
}
</style>
