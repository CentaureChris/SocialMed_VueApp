<template>
  <section class="snapshoot-view-component section">
      <template v-if="$route.params.type === 'snapshoot'">
        <!-- Display video stream -->
        <!-- <button @click="initVideo()">start video</button> -->
        <!-- <video 
          ref="webcamhandeler"
          playsinline
          autoplay
          @canplay="initCanvas()"
        />
        <button @click="takePicture()">Take picture</button> 
        <canvas ref="canvas"></canvas> -->
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
/* 
  [IMPORT] Modules/components 
*/
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
      },

      initCanvas: function(){
        this.canvas.setAttribute('width',this.video.videoWidth)
        this.canvas.setAttribute('height',this.video.videoHeight)
      },
      
      // Define method to bind form 'submit' event
      onSubmit: function(event){
        if( this.$route.params.type === 'snapshoot' ){
          // TODO: find a way to add 'author' ID in snapshoot
          event.author = this.$store.getters.userinfo.id;
          // Dispatch store action
              this.$store.dispatch('pushSnapshootOperation', event)
        }
        else if( this.$route.params.type === 'album' ){
          // Add user id
          event.author = this.$store.getters.userinfo.id;
          // Dispatch store action
          // console.log(event)
          this.$store.dispatch('saveAlbumOperation', event)
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