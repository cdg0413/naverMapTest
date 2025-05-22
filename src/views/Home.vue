<template>
    <div class="mapWrap">
        <div class="mapArea">
            <div id="map" style="width: 100%; height: 100%"></div>
        </div>
    </div>
</template>
<script>
import '@/styles/Home.css';
import { supabase } from '@/api/supabase';
import greenIcon from '@/assets/img/green-icon.svg'
import redIcon from '@/assets/img/red-icon.svg'
import yellowIcon from '@/assets/img/yellow-icon.svg'

export default {
    name: 'Home',
    data() {
        return {
            map: null,
            marker: null,
            greenIcon: greenIcon,
            redIcon: redIcon,
            yellowIcon: yellowIcon,
        };
    },
    mounted() {
        // https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html

        // 지도 초기화
        this.map = new naver.maps.Map('map', {
            center: new naver.maps.LatLng(37.5665, 126.978),
            zoom: 14,
        });

        //최초 마커 생성
        // this.marker = new naver.maps.Marker({
        //     position: new naver.maps.LatLng(37.5665, 126.978),
        //     map: this.map,
        // });

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

        // changeMarker(lat, lng) {
        //     const newPosition = new naver.maps.LatLng(lat, lng);
        //     this.marker.setPosition(newPosition); // 마커 위치만 변경
        //     this.map.setCenter(newPosition); // 지도 중심도 같이 이동
        // },
    },
};
</script>
