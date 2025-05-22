<template>
    <div class="controlWrap">
        <div class="controlBox">
            <button class="addBtn" @click="openPostcode">위치추가</button>
            <div class="selectedLocation" v-if="lat && lon && addr">
                <p class="locationTxt">{{ addr }}</p>
                <p class="center">
                    <button class="addBtn add" @click="addLocation">추가</button>
                </p>
                <p class="complete blue" :class="{ animation: isCompleteVisible }">추가되었습니다.</p>
                <p class="complete red" :class="{ animation: isFailVisible }">실패하였습니다.</p>
            </div>
        </div>

        <div class="modalWrap" v-if="isModalOpen" @click="closePostcode">
            <div class="modal">
                <div class="modalContent" ref="modalContent"></div>
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
            isModalOpen: false,
            isCompleteVisible: false,
            isFailVisible: false,
            addr: '',
            lat: '',
            lon: '',
        };
    },
    watch: {
        lat: {
            handler(newVal) {
                console.log('lat: ', newVal);
            },
        },
        lon: {
            handler(newVal) {
                console.log('lon: ', newVal);
            },
        },
        addr: {
            handler(newVal) {
                console.log('addr: ', newVal);
            },
        },
    },
    methods: {
        async addLocation() {
            const { data, error } = await supabase.from('Location').insert({
                lat: this.lat,
                lon: this.lon,
                status: '1',
                addr: this.addr,
            });

            if (error) {
                console.error(error);
                this.triggerCompleteAnimation(false);
                return;
            }

            console.log('addLocation: ', data);
            this.triggerCompleteAnimation(true);
            setTimeout(()=> {
                this.lat = '';
                this.lon = '';
                this.addr = '';
            },1800)
        },

        openPostcode() {
            this.isModalOpen = true;
            console.log('openPostcode');
            //nextTick을 붙여야 모달 안에 로드됨.
            this.$nextTick(() => {
                new daum.Postcode({
                    oncomplete: (data) => {
                        console.log(data);
                        this.addr = data.address;
                        this.getCoordinates();
                        this.closePostcode();
                    },
                }).embed(this.$refs.modalContent);
            });
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

        closePostcode() {
            this.isModalOpen = false;
        },

        // 위도 & 경도
        async getCoordinates() {
            try {
                const address = this.addr;

                naver.maps.Service.geocode({ query: address }, async (status, response) => {
                    if (status !== naver.maps.Service.Status.OK) {
                        alert('요청에 실패했습니다.');
                        return;
                    }

                    const result = response.v2.addresses;
                    if (result.length > 0) {
                        const { x: longitude, y: latitude } = result[0];
                        this.lat = latitude; // 위도
                        this.lon = longitude; // 경도
                    } else {
                        alert('주소를 찾을 수 없습니다.');
                        return;
                    }
                });
            } catch (error) {
                console.error('error:', error);
            }
        },
    },
};
</script>
