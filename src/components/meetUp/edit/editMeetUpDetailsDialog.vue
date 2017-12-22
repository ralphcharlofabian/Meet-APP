<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container >
                <v-layout row wrap>
                    <v-flex xs12>
                  <v-card-title>
                       Edit Meetup
                    </v-card-title>   
                </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout>
                      <v-flex xs12>
                        <v-card-text>
                      <v-text-field
                        label="Title"
                        name="title"
                        id="title"
                        required
                        v-model="editedTitle">
                        </v-text-field>
                         <v-text-field
                        label="Description"
                        name="description"
                        id="description"
                        multi-line
                        required
                        v-model="editedDescription">
                        </v-text-field>
                        </v-card-text>  
                </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat class="blue--text darken-1" @click="editDialog = false">
                                Close
                            </v-btn>
                             <v-btn flat class="blue--text darken-1" @click="onSaveChanges">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['meetUp'],
  data () {
    return {
      editDialog: false,
      editedTitle: this.meetUp.title,
      editedDescription: this.meetUp.description
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetUpData', {
        id: this.meetUp.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
}
</script>