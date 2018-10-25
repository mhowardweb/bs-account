<template>
  <ion-content>
    <ion-list-header justify-content-center padding class="banner">Balances for {{userName}}</ion-list-header>
      <ion-grid>
        <ion-row>
           <ion-input
            placeholder="Search for a Coin"
            class="filter"
            ref="filter"
            :value="filterValue"
            @input="updateFilter"
          ></ion-input>
        </ion-row>

      <ion-row>
        <ion-col class="btitle" @click="sortBy('symbol')"><ion-icon style="font-size: 12px" name="git-compare"></ion-icon> Coin</ion-col>
        <ion-col class="btitle" @click="sortBy('tokens')">Amount</ion-col>
      </ion-row>
      <ion-row v-for="(item, index) in filteredAndSortedData" :key="index">
        <ion-col v-if="item.tokens > 0.9" class="symbol">{{ item.symbol }}</ion-col>
        <ion-col v-if="item.tokens > 0.9" class="tokens">{{ item.tokens }}</ion-col>
      </ion-row>

    </ion-grid>
  </ion-content>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Balances',
  data() {
    return {
      filterValue: '',
      sortKey: 'symbol',
      sortAsc: true,
      search: '',

    };
  },
  methods: {
    sortBy(sortKey) {
      console.log('clicked', sortKey, this.sortAsc);
      this.sortAsc = (this.sortKey === sortKey) ? !this.sortAsc : false;
      this.sortKey = sortKey;
    },
    updateFilter() {
      this.filterValue = this.$refs.filter.value;
    },
  },
  computed: {
    ...mapGetters({
      userBalances: 'user/getBalances',
      getAssetById: 'assets/getAssetById',
      getHideList: 'assets/getHideList',
      userName: 'user/getUserName',
    }),
    balancesAsArray() {
      const balances = this.userBalances;
      if (!balances) return [];
      // filter balances that are > 0 and generate array with symbols
      // and precised balances
      let balancesKeys = Object.keys(balances).filter(id => balances[id].balance);
      if (!this.editAssetsMode) {
        balancesKeys = balancesKeys.filter(id => !this.getHideList.includes(id));
      }
      return balancesKeys.map((id) => {
        const asset = this.getAssetById(id);
        const visible = !this.getHideList.includes(id);
        return {
          id,
          symbol: asset.symbol,
          tokens: balances[id].balance / 10 ** asset.precision,
          visible,
        };
      });
    },
    filteredAndSortedData() {
      // Apply filter first
      let result = this.balancesAsArray;
      if (this.filterValue) {
        result = result.filter(item => item.symbol.includes(this.filterValue.toUpperCase()));
      }
      // Sort the remaining values
      const ascDesc = this.sortAsc ? 1 : -1;
      if (this.sortKey === 'symbol') {
        return result.sort((a, b) => ascDesc * a.symbol.localeCompare(b.symbol));
      }
      return result.sort((a, b) => ascDesc * a.tokens.toString().localeCompare(b.tokens.toString()));
    },
  },
};
</script>

<style scoped>
.filter {
  margin: 20px;
  background: #d7fae5;
  border: 1px solid rgba(31, 32, 65, 0.25);
  box-sizing: border-box;
  border-radius: 4px;
  text-transform: uppercase;
}

.symbol {
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 16px;
  text-align: center;
  color: #1f2041;
  background: #FFFFFF;
  border: 1px solid rgba(31, 32, 65, 0.25);
  box-sizing: border-box;
  border-radius: 4px;
  margin: 20px;
}

.tokens {
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 19px;
  text-align: center;
  color: #1f2041;
  background: #FFFFFF;
  border: 1px solid rgba(31, 32, 65, 0.25);
  box-sizing: border-box;
  border-radius: 4px;
  margin: 20px;
}
</style>
