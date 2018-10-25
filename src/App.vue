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
  --height: 50px;
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

.banner {
  background: rgba(31, 32, 65, 0.5);
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 24px;
  color: #ffffff;
}

.btitle {
  font-family: Montserrat;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 20px;
  color: #ffffff;
  background-color: #9C27B0;
  border: 1px solid rgba(31, 32, 65, 0.25);
  box-sizing: border-box;
  border-radius: 4px;
  margin: 20px;
}

.ibox {
  margin-left: 20px;
  margin-right: 20px;
  height: 44px;
  border: 1px solid rgba(31, 32, 65, 0.25);
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 18px;
  color: rgba(31, 32, 65, 0.75);
}


.error {
  margin-left: 20px;
  color: #9C27B0;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
}

.ilabel {
  margin-left: 20px;
  margin-right: 20px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 12px;
  text-transform: uppercase;
  color: #1f2041;
}

</style>
