<template>
    <div class="textaudio">
        <div id="textaudio1" @click="toPlay"></div>
    </div>
</template>

<script>
import audio  from './wx-audio.js'
    export default {
        mixins: ['audio'],
        props: ['brightVoice'],
        watch: {
            brightVoice(e) {
                console.log(e)
                if( e ){
                    this.wxAudio = new Wxaudio({
                        ele: '#textaudio1',
                        // title: '顾问说',
                        // disc: 'Break Me Up',
                        src: e,
                        width: '320px'
                    });
                }
                
            }
        },
        data() {
            return{
                wxAudio: null,
                play: false
            }
        },
        methods: {
            toPlay() {
                if( this.wxAudio ){
                    if( this.play ){
                        this.wxAudio.audioPause()
                        this.play = false
                    }else{
                        this.wxAudio.audioPlay()
                        this.play = true
                    }
                }
                
                
            }
        },
        mounted() {
            // this.wxAudio = new Wxaudio({
            //     ele: '#textaudio1',
            //     // title: 'Jar Of Love',
            //     // disc: 'Break Me Up',
            //     src: 'http://jq22.qiniudn.com/ocean_drive_01.mp3',
            //     width: '320px'
            // });
            // function play() {
            //     wxAudio.audioPlay()
            // }
            console.log(this.brightVoice)
            if( this.brightVoice ){
                this.wxAudio = new Wxaudio({
                    ele: '#textaudio1',
                    // title: '顾问说',
                    // disc: 'Break Me Up',
                    src: this.brightVoice,
                    width: '320px'
                });
            }
        }
    }
</script>

<style scoped>
@import './wx-audio.css';
.textaudio{
    display: inline-block;
}
</style>