<template>
  <ion-content>
    <ion-list-header justify-content-center padding class="banner">Bitshares Accounts</ion-list-header>
    <ion-grid class="listbox">

      <ion-row v-for="(item, index) in accounts" :key="index">
        <ion-col @click="handleBalance(item.name)" class="pill">
          <ion-icon name="key"></ion-icon>
          <ion-label>{{item.name}}</ion-label>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'home',
  data() {
    return {

    };
  },
  methods: {
    async handleBalance(data) {
      await this.$store.dispatch('assets/fetchDefaultAssets', null);
      await this.$store.dispatch('user/fetchUser', data);
      this.$router.push('balances');
    },
  },
  computed: {
    ...mapState({
      accounts: state => state.accounts,
    }),
  },
};
</script>

<style scoped>
.pill {
  margin-bottom: 10px;
  height: 104px;
  background: #9C27B0;
  box-shadow: 0px 4px 20px rgba(156, 39, 176, 0.45);
  border-radius: 3px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
  font-size: 24px;
  color: #FFFFFF;
  text-align: center;
  text-transform: uppercase;
}

ion-icon {
  font-size: 48px;
}

.listbox {
  margin-top: 20px;
  width: 360px;
  height: 90%;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
  border-radius: 4px;
}
</style>
