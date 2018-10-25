<template>
  <ion-content>
    <input v-model="filterText">
    <ion-label class="title">Balances for {{userName}}</ion-label>
    <ion-grid class="listbox">
      <ion-row>
        <ion-col @click="sortBy('symbol')" class="btitle">Coin</ion-col>
        <ion-col @click="sortBy('token')" class="btitle">Amount</ion-col>
      </ion-row>
      <ion-row v-for="(item, index) in balancesAsArray" :key="index">
        <ion-col v-if="item.tokens > 0.9" class="date">{{ item.symbol }}</ion-col>
        <ion-col v-if="item.tokens > 0.9" class="daybox">{{ item.tokens }}</ion-col>
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
      filterText: '',
      sortKey: 'symbol',
      reverse: false,
      search: '',
      columns: ['Coin', 'Amount'],
    };
  },
  methods: {
    sortBy(sortKey) {
      console.log('clicked', sortKey, this.reverse);
      this.reverse = (this.sortKey === sortKey) ? !this.reverse : false;
      this.sortKey = sortKey;
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
    filteredData() {
      return this.balancesAsArray.filter(element => element.match(this.filterText));
    },
    sortedData() {
      return this.userBalances.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
    },
  },
};
</script>

<style scoped>
.box {
  margin-top: 20px;
  width: 360px;
  height: 100%;
  background: linear-gradient(180deg, #6fcf97 0%, #66d2ea 100%);
  border-radius: 4px;
}

.date {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  line-height: 24px;
  font-size: 16px;
  color: #000000;
  text-align: left;
}

.listbox {
  margin-top: 20px;
  width: 360px;
  height: 90%;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
  border-radius: 4px;
}

.daybox {
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 19px;
  text-align: center;

  color: #1f2041;
}

.circle {
  padding: 4px;
  width: 44px;
  height: 44px;
  border-radius: 24px;
  border: 2px solid #bc9cff;
  color: #bc9cff;
  box-sizing: border-box;
  font-family: Material Icons;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  text-align: center;
}

.icon {
  padding: 5px;
  margin-left: 25px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid #6fcf97;
  box-sizing: border-box;
  font-family: Material Icons;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  color: #6fcf97;
}

.title {
  font-family: Quicksand;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 19px;
  color: #6fcf97;
}

.btitle {
  width: 360px;
  height: 29px;
  margin: 0 2px 0 2px;
  font-family: Quicksand;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 19px;
  color: #ffffff;
  border-radius: 4px;
  background: linear-gradient(180deg, #bc9cff 0%, #8ba4f9 100%);
}

.dtitle {
  font-family: Quicksand;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 42px;
  text-align: center;

  color: #bc9cff;
}

.htitle {
  font-family: Montserrat;
  margin-left: 20px;
  text-align: left;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 16px;
  color: #ffffff;
}

.hnumber {
  margin-right: 20px;
  font-family: Montserrat;
  text-align: right;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 16px;
  color: #ffffff;
}

.line {
  text-align: center;
  margin-bottom: 20px;
  margin-left: 25px;
  margin-right: 25px;
  height: 2px;
  background: rgba(31, 32, 65, 0.1);
}
</style>
