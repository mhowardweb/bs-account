<template>
  <ion-content>
      <ion-alert-controller></ion-alert-controller>
      <ion-list padding>
        <ion-list-header text-center class="banner">Transactions</ion-list-header>

          <ion-grid class="igrid">
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
          </ion-grid>
        </ion-list>

      <ion-label>Selected Account: {{account.nameId}}</ion-label>
      <ion-grid class="listbox">
      <ion-row>
        <ion-col class="btitle">Type</ion-col>
        <ion-col class="btitle">Details</ion-col>
      </ion-row>
      <ion-row  v-for="(item, index) in transactions" :key="index">
        <ion-col class="date">
         <ion-chip color="primary"><ion-label> {{ item.type }}</ion-label></ion-chip>
        </ion-col>
        <ion-col class="daybox">{{ item.otherUserName }}</ion-col>
        <ion-col text-right> <ion-icon size="large" style="color: red" @click="displayDetails(item)" name="add-circle-outline"></ion-icon> </ion-col>
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
.banner {
  background: rgba(31, 32, 65, 0.5);
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 24px;
  color: #ffffff;
}

.ibutton {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 25px;
  --background: linear-gradient(180deg, #6fcf97 0%, #66d2ea 100%);
  border-radius: 22px;
  --color: #ffffff;
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  text-transform: uppercase;
}

.grid {
  width: 320px;
  height: 64.44px;
}
.ibox {
  width: 360px;
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

.ilabel {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 12px;
  text-transform: uppercase;
  color: #1f2041;
}
</style>
