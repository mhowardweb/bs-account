<template>
  <ion-content>
      <ion-alert-controller></ion-alert-controller>
        <ion-list-header justify-content-center padding class="banner">Transactions</ion-list-header>
          <ion-grid>
            <ion-row >
              <ion-col><ion-label class="ilabel">Select Account: </ion-label></ion-col>
              <ion-col class="ibox">
                <ion-select
                  :value="selectedOption"
                  @ionChange="selectedOption= $event.target.value"
                  placeholder="Select">
                  <ion-select-option :value="item.id" v-for="item in accounts" :key="item.id">{{item.name}}</ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>
            <ion-row padding>
              <ion-label>Selected Account: {{account.name}}</ion-label>
            </ion-row>
          </ion-grid>

      <ion-grid class="">
      <ion-row>
        <ion-col size="3.5" class="ttitle">Type</ion-col>
        <ion-col size="7" class="ttitle">Details</ion-col>
      </ion-row>
      <ion-row  v-for="(item, index) in transactions" :key="index">
        <ion-col class="type">
         <ion-chip class="chip"><ion-label> {{ item.type | transactionType }}</ion-label></ion-chip>
        </ion-col>
        <ion-col size="6" class="details">From: {{ item.payload.from }} To: {{ item.payload.to }} Amount: {{item.payload.amount}}</ion-col>
        <ion-col size="auto" text-right> <ion-icon size="large" style="color: #9C27B0" @click="displayDetails(item)" name="add-circle-outline"></ion-icon> </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content >
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Edit',
  data() {
    return {
      account: {
        name: null,
        details: null,
        id: '',
        nameId: '',
      },
      selectedOption: null,
    };
  },
  computed: {
    ...mapState({
      accounts: state => state.accounts,
      userId: state => state.user.account.id,
    }),
    ...mapGetters({
      transactions: 'operations/getOperations',
    }),
  },
  watch: {
    selectedOption(id) {
      if (id) {
        const selectedAccount = this.accounts.find(element => element.id === id);
        this.account.name = selectedAccount.name || null;
        this.account.details = selectedAccount.details || null;
        this.account.id = id || null;
        this.account.nameId = selectedAccount.nameId || null;
        this.getData();
      }
    },
  },
  methods: {
    ...mapActions({
      updateAccount: 'updateAccount',
      getTransactions: 'operations/fetchUserOperations',
    }),
    async getData() {
      const limit = 100;
      await this.getTransactions({ userId: this.account.nameId, limit });
      // this.$router.push('/');
    },
    async displayDetails(item) {
      const alertController = document.querySelector('ion-alert-controller');
      await alertController.componentOnReady();

      const alert = await alertController.create({
        subHeader: 'Transaction Details',
        inputs: [
          {
            disabled: true,
            value: `Date: ${item.date}`,
          },
          {
            disabled: true,
            value: `ID: ${item.id}`,
          },
          {
            disabled: true,
            value: `User: ${item.otherUserName}`,
          },
          {
            disabled: true,
            value: `Type: ${item.type}`,
          },
          {
            disabled: true,
            value: `From: ${item.payload.from}`,
          },
          {
            disabled: true,
            value: `To: ${item.payload.to}`,
          },
        ],
        buttons: ['OK'],
      });
      return await alert.present();
    },
  },
};
</script>

<style scoped>
.chip {

  text-align: center;
  width: 125px;
  height: 39px;;
  background-color: #6fcf97;
}
.type {
  padding: 0px;
  margin-left: 20px;
}

.details {
  padding-left: 10px;
  text-align: left;
  height: 36px;
  border: 1px solid rgba(31, 32, 65, 0.25);
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: rgba(31, 32, 65, 0.75);
}

.ttitle {
  font-family: Montserrat;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
  color: #ffffff;
  background-color: #9C27B0;
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>
