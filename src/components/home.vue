<template>
    <v-container>
     <v-layout  row wrap>
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item v-for="meetUp in meetUps"
                    :src="meetUp.imageUrl"
                    :key="meetUp.id">
                    <div class="title">
                    {{meetUp.title}}
                    </div>
                    </v-carousel-item>
                </v-carousel>
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
  data () {
    return {
      meetUps: [
        {imageUrl: 'http://japan-magazine.jnto.go.jp/jnto2wm/wp-content/uploads/1608_special_TOTO_main.jpg', title: 'Meetup in Japan', id: '1'},
        {imageUrl: 'https://wanderworld360.com/wp-content/uploads/2016/07/the-merlion-singapore-wallpaper.jpg', title: 'Meetup in Singapore', id: '2'},
        {imageUrl: 'https://www.luxresorts.com/media/2601563/Maldives_Hotels_Resorts_LUX_Maldives_Spa_WellBeing.jpg', title: 'Meetup in Maldives', id: '3'},
        {imageUrl: 'https://media.timeout.com/images/103812417/image.jpg', title: 'Meetup in Hong Kong', id: '4'},
         {imageUrl: 'http://www.lastminute.com/hotels/img/city/Paris-FR.jpg', title: 'Meetup in Paris', id: '5'}
      ]
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