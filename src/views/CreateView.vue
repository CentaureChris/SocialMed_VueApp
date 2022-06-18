<template>
  <section class="snapshoot-view-component section">
      <template v-if="$route.params.type === 'snapshoot'">
        <!-- Display video stream -->
        <button @click="initVideo()">start video</button>
        <video 
          ref="webcamhandeler"
          playsinline
          autoplay
          @canplay="initCanvas()"
        />
        <button @click="takePicture()">Take picture</button> 
        <canvas id="photoTaken" ref="canvas"></canvas>
        <button class="camera-download">
          <a id="downloadPhoto" download="VueRocksPhoto.jpg" role="button" @click="downloadImage">
            Download
          </a>
        </button>
        <article class="box">
          <BaseForm 
            class="mb-4"
            :formvalue="cmpSnapshootForm"
            @onSubmit="onSubmit($event)"
          />
        </article>
      </template>
      <template v-if="$route.params.type === 'album'">
        <article class="box">
          <BaseForm 
            class="mb-4"
            :formvalue="cmpAlbumForm"
            @onSubmit="onSubmit($event)"
          />
        </article>
      </template>
  </section>
  
</template>

<script>
/* eslint-disable no-unused-vars */

/* 
  [IMPORT] Modules/components 
*/
  import { dexieDb } from "@/services/dexie.service"

  import BaseForm from '../components/base/BaseForm.vue';
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'SnapshootView',

     /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseForm
      },
    //

    data(){
      return {
        video: undefined,
        canvas: null,
        videostream: undefined,
        // Form values
        cmpSnapshootForm: {
          title: `Add new snapshoot`,
          submit: `Save`,
          fieldsets: [
            {
              label: `Title`,
              type: `text`,
              name: `title`,
              required: true,
              min: 5,
              value: null
            },
            {
              label: `Caption`,
              type: `text`,
              name: `caption`,
              required: false,
              min: false,
              value: null
            },
            {
              label: ``,
              type: `hidden`,
              name: `capture`,
              required: false,
              min: false,
              value: null
            }
          ]
        },
        cmpAlbumForm: {
          title: `Add new album`,
          submit: `Save`,
          fieldsets: [
            {
              label: `Title`,
              type: `text`,
              name: `title`,
              required: true,
              min: 5,
              value: null
            },
          ]
        },
      }
    },

    methods: {
      async initVideo(){
        // Bind video HTML tag
        this.video = this.$refs.webcamhandeler;

        // Bind webcam stream
        this.videostream = await this.getWebcamPermission();

        // Add stream in video tag
        this.video.srcObject = this.videostream;
      },

      getWebcamPermission: function(){
        return new Promise( (resolve, reject) => {
          // Check if navigator have medieDevices
          if( 'mediaDevices' in navigator ){
            // Get media devices from navigator
            navigator.mediaDevices.getUserMedia({ audio: false, video: true })
            .then( navigatorStreamSuccess => {
              // Save stream in the store for security
              return resolve(navigatorStreamSuccess)
            })
            .catch( navigatorStreamError => {
              console.log(navigatorStreamError)
            })
          }
          else{ 
            return reject(`Impossible to take snapshoot with your navigator.`)
          }
        })
      },
      takePicture: function(){
        let context = this.canvas.getContext("2d")
        context.drawImage(this.video,0,0,this.video.videoWidth,this.video.videoHeight)
        console.log(context)
        // this.$emit('picture-taken',this.canvas.toDataUrl('image/png'))
        const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg");
        // download.setAttribute("href", canvas);
        // localStorage.setItem('pictureCaptured',JSON.stringify(canvas))
      },

      initCanvas: function(){
        this.canvas.setAttribute('width',this.video.videoWidth)
        this.canvas.setAttribute('height',this.video.videoHeight)
      },
      downloadImage: function () {
        const download = document.getElementById("downloadPhoto");
        const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg");
        download.setAttribute("href", canvas);
      },
      
      // Define method to bind form 'submit' event
      onSubmit: async function(event){
        if( this.$route.params.type === 'snapshoot' ){
          // TODO: find a way to add 'author' ID in snapshoot
          event.author = this.$store.getters.userinfo.id;
          event.album = this.$route.params.id
          event.capture = document.getElementById("photoTaken").toDataURL("image/jpeg")
          // console.log(event.capture)
          // Dispatch store action
          this.$store.dispatch('pushSnapshootOperation', event)
            this.cmpSnapshootForm.fieldsets[0].value = null
            this.cmpSnapshootForm.fieldsets[1].value = null
          this.$toast.success('You added a new snapshoot')
        }
        else if( this.$route.params.type === 'album' ){
          // Add user id
          event.author = this.$store.getters.userinfo.id;
          // Dispatch store action
          // console.log(event)
          let table = await dexieDb.albums.toArray()
          let checkAlbum = table.some(el=>el.title === event.title)

          if( checkAlbum === false){
            this.$store.dispatch('saveAlbumOperation', event)
            this.cmpAlbumForm.fieldsets[0].value = null
          }else{
            this.$toast.warning(`Album ${event.title} already exist`)
          }
        }
      },
    },

    mounted: function(){
      // Check param type to init webcam
      // if( this.$route.params.type === 'snapshoot' ){
      //   this.initVideo()
      // }
      this.video = this.$refs.webcamhandeler
      this.canvas = this.$refs.canvas
    }
    
  }
//
</script>