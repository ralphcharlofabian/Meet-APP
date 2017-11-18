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
                <v-layout row >
                    <v-flex xs12 sm6 offset-sm3>
                        <h4>Choose a Date & Time</h4>
                    </v-flex>
                </v-layout>
                 <v-layout row>
                    <v-flex xs12 sm6 offset-sm3 class="mb-2" >
                        <v-date-picker v-model="date" landscape></v-date-picker>
                    </v-flex>
                </v-layout>
                 <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-time-picker v-model="time" format="24hours" landscape color="blue lighten-1"></v-time-picker>
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
      description: '',
      date: new Date(),
      time: new Date()
    }
  },
  computed: {
    formisValid () {
      return this.title !== '' && this.location !== '' && this.description !== '' && this.imageUrl !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
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
        date: this.submittableDateTime
      }

      this.$store.dispatch('createMeetUp', meetUpData)
      this.$router.push('/meetUp')
    }
  }
}
</script>