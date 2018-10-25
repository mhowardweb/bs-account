<template>
  <ion-menu side="start">
    <ion-header>
      <ion-toolbar class="mtoolbar">
        <ion-title class="mtitle">Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content padding>
      <ion-list>
        <ion-item button detail @click="goHome()" lines="full">
          <ion-icon style="color: #6fcf97" name="home" slot="start"></ion-icon>
          <ion-label class="moption">Accounts</ion-label>
        </ion-item>

        <ion-item button detail @click="goAdd()" lines="full">
          <ion-icon style="color: #6fcf97" name="add-circle" slot="start"></ion-icon>
          <ion-label class="moption">Add Account</ion-label>
        </ion-item>

        <ion-item button detail @click="goEdit()" lines="full">
          <ion-icon style="color: #6fcf97" name="paper" slot="start"></ion-icon>
          <ion-label class="moption">Edit Account</ion-label>
        </ion-item>

        <ion-item button detail @click="goDelete()" lines="full">
          <ion-icon style="color: #6fcf97" name="trash" slot="start"></ion-icon>
          <ion-label class="moption">Delete Account</ion-label>
        </ion-item>
        <ion-item-divider></ion-item-divider>

        <ion-item button detail @click="goBalances()" lines="full">
          <ion-icon style="color: #6fcf97" name="cash" slot="start"></ion-icon>
          <ion-label class="moption">Balances</ion-label>
        </ion-item>

        <ion-item button detail @click="goTransactions()" lines="full">
          <ion-icon style="color: #6fcf97" name="repeat" slot="start"></ion-icon>
          <ion-label class="moption">Transactions</ion-label>
        </ion-item>
        <ion-item-divider></ion-item-divider>

        <ion-item button detail @click="goSettings()" lines="full">
          <ion-icon style="color: #6fcf97" name="cog" slot="start"></ion-icon>
          <ion-label class="moption">Settings</ion-label>
        </ion-item>
      </ion-list>

    </ion-content>

    <ion-footer>
      <ion-toolbar class="mtoolbar"/>
    </ion-footer>
</ion-menu>

</template>

<script>
export default {
  name: 'MenuLeft',
  methods: {
    goHome() {
      this.$router.push('/');
      document.querySelector('ion-menu-controller').close('start');
    },
    goAdd() {
      this.$router.push('add');
      document.querySelector('ion-menu-controller').close('start');
    },
    goEdit() {
      this.$router.push('edit');
      document.querySelector('ion-menu-controller').close('start');
    },
    goDelete() {
      this.$router.push('delete');
      document.querySelector('ion-menu-controller').close('start');
    },
    goBalances() {
      this.$router.push('balances');
      document.querySelector('ion-menu-controller').close('start');
    },
    goTransactions() {
      this.$router.push('transactions');
      document.querySelector('ion-menu-controller').close('start');
    },
    goSettings() {
      document.querySelector('ion-menu-controller').close('start');
    },
  },
};
</script>

<style scoped>
.mtitle {
  font-family: Montserrat;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  text-transform: uppercase;
  color: #ffffff;
}
.moption {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  line-height: 24px;
  font-size: 18px;
  color: rgba(31, 32, 65, 0.75);
}

.mtoolbar {
  --ion-toolbar-background-color: #9C27B0;
}
</style>
