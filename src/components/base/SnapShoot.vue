<template>
    <div>
        <button class="button" @click="showModal">Show Picture</button>
        <div class="modal" :class="{'is-active': showModalFlag}"></div>
    </div>
    <div class="modal" :class="{'is-active': showModalFlag}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <button class="delete" aria-label="close" @click="cancelModal">></button>
            <p class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" :alt="data.title">
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SnapShoot',

        data (){
            return {
                showModalFlag: false,
                okPressed: false,
                picture: "path for picture" 
            }
        },
        
        methods: {
        showModal() {
          this.okPressed = false;
          this.showModalFlag = true;
        },
        okModal() {
          this.okPressed = true;
          this.showModalFlag = false;
        },
        cancelModal() {
          this.okPressed = false;
          this.showModalFlag = false;
        }
      },

        props: {
            data: Promise
        }
    }
</script>