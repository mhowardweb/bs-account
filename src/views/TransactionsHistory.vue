<template>
  <ion-content>
    <ion-list-header justify-content-center padding class="banner">Transactions</ion-list-header>
      <ion-grid>
        <ion-row >
          <ion-col><ion-label class="ilabel">Select Account: </ion-label></ion-col>
          <ion-col class="ibox">
            <ion-select
              :value="selectedOption"
              @ionChange="selectedOption= $event.target.value"
              placeholder="Select One">
              <ion-select-option :value="item.id" v-for="item in accounts" :key="item.id">{{item.name}}</ion-select-option>
            </ion-select>
          </ion-col>
        </ion-row>

        <ion-row padding>
          <ion-label v-show="selectedOption" class="selected-account">Selected Account: {{account.name}}</ion-label>
        </ion-row>
        <ion-item-divider></ion-item-divider>
      </ion-grid>

      <LoadingContainer :loading="pending">
      <ion-label class="label"
        v-show="error || !filteredOperations.length">
        <ion-text
          v-show="!filteredOperations.length">
          No transactions yet
        </ion-text>
        <ion-text
          v-show="error">
          Error when fetching user's transactions
        </ion-text>
      </ion-label>
      <TransactionsItem
        v-for="item in filteredOperations"
        :item="item"
        :key="item.id"
        :user-id="userId"/>
    </LoadingContainer>

  </ion-content>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import TransactionsItem from '@/components/transactions/TransactionsItem.vue';
import Loader from '@/components/Loader.vue';
import LoadingContainer from '@/components/LoadingContainer.vue';

export default {
  components: {
    TransactionsItem,
    Loader,
    LoadingContainer,
  },
  props: {
    limit: {
      type: Number,
      required: false,
      default: 100,
    },
  },
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
  },
  computed: {
    ...mapGetters({
      // userId: 'acc/getAccountUserId',
      operations: 'operations/getOperations',
      pending: 'operations/isFetching',
      error: 'operations/isError',
    }),
    ...mapState({
      accounts: state => state.accounts,
      userId: state => state.user.account.id,
    }),
    sortedOperations() {
      return this.operations.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    },
    filteredOperations() {
      if (!this.account.nameId) return [];
      if (this.limit) return this.sortedOperations.slice(0, this.limit);
      return this.sortedOperations;
    },
  },
};
</script>

<style scoped>
.label {
  font-family: Montserrat;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 24px;
  color: #ffffff;
  background-color: #9C27B0;
  margin: 20px;
  padding: 25px;
}

.selected-account {
  font-family: Montserrat;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
  color: #ffffff;
  background-color: #6fcf97;
  margin: 0px;
  padding: 25px;
}
</style>
