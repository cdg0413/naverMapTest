<template>
    <div class="mapWrap">
        <div class="mapArea"></div>
    </div>
</template>
<script>
import '@/styles/Home.css';
import { supabase } from '@/api/supabase';

export default {
    name: 'Home',
    data() {
        return {};
    },
    mounted() {
        this.getList();
    },
    methods: {
        async getList() {
            const { data, error } = await supabase.from('Location').select('*');

            if (error) {
                console.error(error);
                return;
            }

            console.log('data: ', data);
        },
    },
};
</script>
