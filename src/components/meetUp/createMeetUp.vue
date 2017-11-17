<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h4 class="secondary--text">Create a new Meetup</h4>
            </v-flex>
        </v-layout>
         <v-layout row>
            <v-flex xs12 >
               <v-form @submit.prevent="onCreateMeetUp">
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                        label="Title"
                        name="title"
                        id="title"
                        v-model="title"
                        required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                        label="Location"
                        name="location"
                        id="location"
                        v-model="location"
                        required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                        label="Image Url"
                        name="title"
                        id="imageUrl"
                        v-model="imageUrl"
                        required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                 <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                    <img :src="imageUrl" height="100">
                        <v-text-field
                        label="Description"
                        name="description"
                        id="description"
                        v-model="description"
                        multi-line
                        required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-btn class="primary"
                        :disabled="!formisValid"
                        type="submit">
                        Create Meetup
                        </v-btn>
                    </v-flex>
                </v-layout>
               </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: ''
    }
  },
  computed: {
    formisValid () {
      return this.title !== '' && this.location !== '' && this.description !== '' && this.imageUrl !== ''
    }
  },
  methods: {
    onCreateMeetUp () {
      if (!this.formisValid) {
        return
      }
      const meetUpData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: new Date()
      }

      this.$store.dispatch('createMeetUp', meetUpData)
      this.$router.push('/meetUp')
    }
  }
}
</script>