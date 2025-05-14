<template>
    <div>
        <!-- Vue + Vite Template -->
        <ul class="gnb">
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/add">Add</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {};
</script>
