<template>
  <div id="app">
    <ion-app>
      <menu-left />
        <div class="ion-page" main>
          <ion-alert-controller></ion-alert-controller>
          <Header />
          <router-view/>
        </div>
    </ion-app>
    <ion-menu-controller></ion-menu-controller>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import MenuLeft from '@/components/MenuLeft.vue';

export default {
  name: 'App',
  components: {
    Header,
    MenuLeft,
  },
  mounted() {
    this.$store.dispatch('connection/initConnection', null);
  },
};
</script>

<style>
.ibutton {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 25px;
  --background: #9C27B0;
  --box-shadow: 0px 2px 2px rgba(156, 39, 176, 0.2);
  --border-radius: 3px;
  --color: #ffffff;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  text-transform: uppercase;
}

</style>
