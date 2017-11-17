<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h6 class="primary--text">{{meetUps.title}}</h6>
                    </v-card-title>
                   <v-card-media 
                   :src="meetUps.imageUrl" height="400px"></v-card-media>
                    <v-card-text>
                        <div class="info--text">
                            {{meetUps.date}} - Where it takes place
                        </div>
                        <div>The "Land of the Rising Sun" is a country where the past meets the future. Japanese culture stretches back millennia, yet has also been quick to adopt and created the latest modern fashions and trends.
Japan is often difficult to understand for those educated in the west. It can seem full of contradictions. Many Japanese corporations dominate their industries, yet if you read the financial news it seems like Japan is practically bankrupt. Cities are as modern and high tech as anywhere else, but tumbledown wooden shack.
                        </div>
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
        }
      }
    }
</script>