<template >
  <ion-grid>
    <ion-row>
      <ion-col size="3.6">
        <ion-chip :style="typeColor" class="chip">
          <ion-label>
            <ion-icon :name="icon"></ion-icon>
            {{ item.type | transactionType }}
          </ion-label>
        </ion-chip>
      </ion-col>

      <ion-col>
        <TransactionsItemTransferInfo
          v-if="type === 'transfer'"
          :user-id="userId"
          :item="item"/>

        <TransactionsItemPlaceOrderInfo
          v-if="type === 'limit_order_create'"
          :item="item"/>

        <TransactionsItemFillOrderInfo
          v-if="type === 'fill_order'"
          :item="item"/>

        <TransactionsItemCancelOrderInfo
          v-if="type === 'limit_order_cancel'"
          :item="item"/>
      </ion-col>

      <ion-col size="auto">
        <ion-text class="operation-item__date">{{ relativeTime }} ago </ion-text>
      </ion-col>
      <ion-item-divider></ion-item-divider>
    </ion-row>
  </ion-grid>
 </template>

<script>
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';
import TransactionsItemTransferInfo from './TransactionsItemTransferInfo.vue';
import TransactionsItemPlaceOrderInfo from './TransactionsItemPlaceOrderInfo.vue';
import TransactionsItemFillOrderInfo from './TransactionsItemFillOrderInfo.vue';
import TransactionsItemCancelOrderInfo from './TransactionsItemCancelOrderInfo.vue';

export default {
  components: {
    TransactionsItemTransferInfo,
    TransactionsItemPlaceOrderInfo,
    TransactionsItemFillOrderInfo,
    TransactionsItemCancelOrderInfo,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    type() {
      return this.item.type;
    },
    typeColor() {
      switch (this.type) {
        case 'limit_order_create':
          return 'background-color: #F44336';
        case 'fill_order':
          return 'background-color: #4CAF50';
        case 'limit_order_cancel':
          return 'background-color: #FFC107';
        case 'transfer':
          return 'background-color: #9C27B0';
        default:
          return 'background-color: #FFFFFF';
      }
    },
    icon() {
      switch (this.type) {
        case 'limit_order_create':
          return 'create';
        case 'fill_order':
          return 'done-all';
        case 'limit_order_cancel':
          return 'close';
        case 'transfer':
          return this.item.payload.from === this.userId
            ? 'arrow-round-forward'
            : 'arrow-round-back';
        default:
          return this.type;
      }
    },
    relativeTime() {
      let time = distanceInWordsStrict(new Date(), this.item.date);
      time = time.replace('hours', 'h');
      time = time.replace('hour', 'h');
      time = time.replace('minutes', 'm');
      time = time.replace('minute', 'm');
      return time;
    },
  },
};
</script>

<style>
.chip {
  text-align: center;
  font-size: 10px;
  width: 115px;
  height: 32px;;
  color: #ffffff;
}

.operation-item {
  display: flex;
  justify-content: space-between;
}
.operation-item__date {
  margin-left: 0.5rem;
  flex-shrink: 0;
  text-align: right;
  font-size: 12px;
  color: #9e9e9e;
}
</style>
