<template>
  <ion-header>
    <ion-toolbar style="header">
      <ion-buttons slot="start">
          <ion-menu-button  @click="openStart" auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-title>Bitshares Accounts</ion-title>
      <ion-buttons slot="end">
        <ion-icon size="large" name="square" class="indicator" :class="{'green': connected}" ></ion-icon>
      </ion-buttons>

    </ion-toolbar>
  </ion-header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  methods: {
    openStart() {
      document.querySelector('ion-menu-controller').open('start');
    },
  },
  computed: {
    ...mapGetters({
      connected: 'connection/isReady',
    }),
  },
};
</script>

<style scoped>
.header {
  --ion-color-primary-contrast: #ffffff;
  --ion-toolbar-background-color: #ffffff;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 10px;
  text-transform: uppercase;
  color: #1f2041;
}

.indicator {
  color: crimson;

}

.green {
  color: green;
}
</style>

