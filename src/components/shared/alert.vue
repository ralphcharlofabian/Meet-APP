<template>
 <v-alert color="error" icon="error" dismissible @input="onCLose" :value="true">
      {{text}}
    </v-alert>  
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onCLose () {
      this.$emit('dismissed')
    }
  }
}
</script>
