<template>
    <v-container>
         <v-layout row wrap 
                v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular 
                indeterminate 
                v-bind:size="70" 
                color="primary--text"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h6 class="primary--text">{{meetUps.title}}</h6>
                        <template v-if="userIsCreator">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-details-dialog :meetUp="meetUps"></app-edit-meetup-details-dialog>
                        </template>
                    </v-card-title>
                   <v-card-media 
                   :src="meetUps.imageUrl" height="400px"></v-card-media>
                    <v-card-text>
                        <div class="info--text">
                            {{meetUps.date | date}} - {{meetUps.location}}
                        </div>
                        <div>
                             <app-edit-meetup-date-dialog :meetUp="meetUps" v-if="userIsCreator"></app-edit-meetup-date-dialog>
                            <app-edit-meetup-time-dialog :meetUp="meetUps" v-if="userIsCreator"></app-edit-meetup-time-dialog>
                        
                        </div>
                        <div>{{meetUps.description}}</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="primary">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
      props: ['id'],
      computed: {
        meetUps () {
          return this.$store.getters.loadedMeetUp(this.id)
        },
        userIsAuthenticated () {
          return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator () {
          if (!this.userIsAuthenticated) {
            return false
          }
          return this.$store.getters.user.id === this.meetUps.creatorId
        },
        loading () {
          return this.$store.getters.loading
        }
      }
    }
</script>