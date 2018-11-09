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
          <ion-column>
            <vc-donut
              background="white" foreground="grey"
              :size="200" unit="px" :thickness="20"
              hasLegend legendPlacement="bottom"
              :sections="sections" :total="100">
              <h1 style="margin: 0;">100%</h1>
            </vc-donut>
          </ion-column>
        </ion-row>

      <ion-row  style="margin-left: 10px; margin-right: 10px;">
        <ion-col size="3" class="htitle" @click="sortBy('ticker')"><ion-icon style="font-size: 12px" name="git-compare"></ion-icon> Ticker</ion-col>
        <ion-col size="3" class="htitle" @click="sortBy('tokens')">Tokens</ion-col>
        <ion-col size="3" class="htitle">$Value</ion-col>
        <ion-col size="3" class="htitle">Share</ion-col>
      </ion-row>
      <ion-row style="margin-left: 10px; margin-right: 10px;" v-for="(item, index) in filteredAndSortedData" :key="index">
        <template v-if="item.tokens > 0.9">
          <ion-col size="3" class="balances">{{ item.ticker }}</ion-col>
          <ion-col size="3" class="balances">{{ item.tokens }}</ion-col>
          <ion-col size="3" class="balances">{{ item.fiatValue }}</ion-col>
          <ion-col size="3" class="balances">{{ item.share }}%</ion-col>
        </template >
      </ion-row>

    </ion-grid>
  </ion-content>
</template>

<script>
import { mapGetters } from 'vuex';
import { clearTimeout } from 'timers';

export default {
  name: 'Balances',
  data() {
    return {
      filterValue: '',
      sortKey: 'symbol',
      sortAsc: true,
      search: '',
      sort: {
        field: 'fiatValue',
        type: 'desc',
      },
      sections: [],
    };
  },
  mounted() {
    this.calcSections();
  },
  methods: {
    sortBy(sortKey) {
      this.sortAsc = (this.sortKey === sortKey) ? !this.sortAsc : false;
      this.sortKey = sortKey;
    },
    updateFilter() {
      this.filterValue = this.$refs.filter.value;
    },
    calcSections() {
      let donutData = this.items;
      console.log(donutData);
      donutData = donutData.filter(item => item.tokens > 0.9);
      for (let i = 0; i < donutData.length; i++) {
        donutData[i].value = donutData[i].share;
        delete donutData[i].share;
        donutData[i].label = donutData[i].ticker;
        delete donutData[i].ticker;
      }

      this.sections = donutData;
      return this.sections;
    },
  },
  computed: {
    ...mapGetters({
      userName: 'user/getUserName',
      items: 'portfolio/getItems',
    }),
    filteredAndSortedData() {
      // Apply filter first
      let result = this.items;
      if (this.filterValue) {
        result = result.filter(item => item.ticker.includes(this.filterValue.toUpperCase()));
      }
      // Sort the remaining values
      const ascDesc = this.sortAsc ? 1 : -1;
      if (this.sortKey === 'ticker') {
        return result.sort((a, b) => ascDesc * a.ticker.localeCompare(b.ticker));
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

.htitle {
  font-family: Montserrat;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  color: #ffffff;
  background-color: #9C27B0;
  border: 1px solid rgba(31, 32, 65, 0.25);
  box-sizing: border-box;
  margin: 0px;
}

.balances {
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 12px;
  text-align: center;
  color: #1f2041;
  background: #FFFFFF;
  border: 1px solid rgba(31, 32, 65, 0.25);
  box-sizing: border-box;
  margin: 0px;
}
</style>
