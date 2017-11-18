<template>
    <v-container>
     <v-layout  row wrap v-if="!loading">
            <v-flex xs12>
                <v-carousel style="cursor:pointer;">
                    <v-carousel-item v-for="meetUp in meetUps"
                    :src="meetUp.imageUrl"
                    :key="meetUp.id"
                    @click="onLoadMeetUp(meetUp.id)">
                    <div class="title">
                    {{meetUp.title}}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular 
                indeterminate 
                v-bind:size="70" 
                color="primary--text"
                v-if="loading"
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-5">
            <v-flex xs12 class="text-xs-center">
                <h6>JOIN OUR AWESOME MEETUPS AND TOGETHER LETC CHANGE THE WORLD!!</h6>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large router to="/meetUp" dark class="blue accent-1">Explore Meetups</v-btn>
            </v-flex>
             <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large router to="/createMeetUps" dark class="blue accent-1">Organize Meetups</v-btn>
            </v-flex>
        </v-layout>
       
    </v-container>
</template>

<script>
export default {
  computed: {
    meetUps () {
      return this.$store.getters.featuredMeetUps
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetUp (id) {
      this.$router.push('/MeetUp/' + id)
    }
  }
}
</script>

<style scoped>
    .title{
        position: absolute;
        bottom: 50px;
        background-color: rgba(0,0,0,0.5);
        color: white;
        font-size:2em;
    }
</style>