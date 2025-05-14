<template>
    <div class="controlWrap">
        <div class="controlBox">
            <button class="addBtn">위치추가</button>
            <div class="selectedLocation">
                <p>선택된 위치</p>
                <p class="locationTxt">이 곳에 선택된 위치가 들어감</p>
                <p class="center">
                    <button class="addBtn add" @click="triggerCompleteAnimation(true)">추가</button>
                </p>
                <p class="complete blue" :class="{ animation: isCompleteVisible }">추가되었습니다.</p>
                <p class="complete red" :class="{ animation: isFailVisible }">실패하였습니다.</p>
            </div>
        </div>
    </div>
</template>
<script>
import '@/styles/Add.css';
import { supabase } from '@/api/supabase';

export default {
    data() {
        return {
            isCompleteVisible: false,
            isFailVisible: false,
        };
    },
    mounted() {
        // this.getList();
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
        triggerCompleteAnimation(isSuccess) {
            if (isSuccess) {
                this.isCompleteVisible = true;
            } else {
                this.isFailVisible = true;
            }
            setTimeout(() => {
                if (isSuccess) {
                    this.isCompleteVisible = false;
                } else {
                    this.isFailVisible = false;
                }
            }, 1500);
        },
    },
};
</script>
