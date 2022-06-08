<template>
  <!-- Bind 'submit' event to emit 'onSubmit' event -->
  <form action="*" class="base-form-component">
    <h2 class="title is-size-4">{{cmpFormvalue.title}}</h2>

    <!-- Display DOM loop: v-for -->
    <fieldset 
      class="mb-4"
      v-for="(item, idx) in cmpFormvalue.fieldsets" 
      :key="`item-${idx}`"
    >
      <label 
        class="label"
        :for="`item-${idx}`" 
        v-text="item.label"
      />

      <input 
        class="input"
        :type="item.type" 
        :id="`item-${idx}`" 
        :name="`item-${idx}`"
        :required="item.required"
        :min="item.min"
      >
    </fieldset>

    <BaseCallToAction 
      :item="{
        type: `submit`,
        content: cmpFormvalue.submit,
        isfull: true,
        isprimary: true,
      }"
    />
  </form>
</template>


<script>
/* 
  [IMPORT] Modules/components
*/
  import BaseCallToAction from './BaseCallToAction.vue';
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'BaseForm',

    /* 
      [VUE] Props
      Data binding from parent component
    */
      props: {
        formvalue: {
          type: Object,
          required: true,
          default: () => {}
        }
      },
    //

    /* 
      [VUE] Computed
      Used to have version of property value
    */
      computed: {
        cmpFormvalue: function(){ return this.formvalue }
      },
    //

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseCallToAction
      }
    //
  }
//
</script>