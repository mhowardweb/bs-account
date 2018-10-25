<template>
  <ion-content>
    <ion-alert-controller></ion-alert-controller>
    <form @submit.prevent="handleDelete(account)">
      <ion-list padding>
        <ion-list-header text-center class="banner">Delete Account</ion-list-header>

          <ion-grid class="igrid">
            <ion-row>
              <ion-col>
                <ion-label class="ilabel">Select Account</ion-label>

              </ion-col>
            </ion-row>
            <ion-row class="ibox">
              <ion-col>
                <ion-select
                  :value="selectedOption"
                  @ionChange="selectedOption= $event.target.value"
                  placeholder="Select One">
                  <ion-select-option :value="item.id" v-for="item in accounts" :key="item.id">{{item.name}}</ion-select-option>
                </ion-select>
              </ion-col>
            </ion-row>
          </ion-grid>

          <ion-grid class="igrid">
            <ion-row>
              <ion-col>
                <ion-label class="ilabel">Acount Name</ion-label>
                <ion-label class="error" v-if="!$v.account.name.minLength">Name must have at least {{$v.account.name.$params.minLength.min}} characters.</ion-label>
              </ion-col>
            </ion-row>
            <ion-row class="ibox">
              <ion-col>
                <ion-input disabled :value="account.name" ref="accName" name='name' type='text' inputmode='text' @input="updateName" />
              </ion-col>
            </ion-row>
          </ion-grid>

        <ion-grid class="igrid">
            <ion-row>
              <ion-col>
                <ion-label class="ilabel">Acount Details</ion-label>
                <ion-label class="error" v-if="!$v.account.details.minLength">Name must have at least {{$v.account.details.$params.minLength.min}} characters.</ion-label>
              </ion-col>
            </ion-row>
            <ion-row class="ibox">
              <ion-col>
                <ion-input disabled :value="account.details" ref="accDetails" name='details' type='text' inputmode='text' @input="updateDetails" />
              </ion-col>
            </ion-row>
          </ion-grid>
          <ion-card-content>
            <ion-button class="ibutton" expand="full" :disabled="$v.$invalid" type="submit">Delete Account</ion-button>
          </ion-card-content>
        </ion-list>
      </form>
  </ion-content >
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Delete',
  data() {
    return {
      account: {
        name: null,
        details: null,
        id: '',
      },
      selectedOption: null,
    };
  },
  validations: {
    account: {
      name: { required, minLength: minLength(4) },
      details: { required, minLength: minLength(4) },
    },
  },
  computed: {
    ...mapState({
      accounts: state => state.accounts,
    }),
  },
  watch: {
    selectedOption(id) {
      if (id) {
        const selectedAccount = this.accounts.find(element => element.id === id);
        this.account.name = selectedAccount.name || null;
        this.account.details = selectedAccount.details || null;
        this.account.id = id || null;
      }
    },
  },
  methods: {
    ...mapActions({
      deleteAccount: 'deleteAccount',
    }),
    updateName() {
      this.account.name = this.$refs.accName.value;
      this.$v.account.name.$touch();
    },
    updateDetails() {
      this.account.details = this.$refs.accDetails.value;
      this.$v.account.details.$touch();
    },
    handleDelete(data) {
      this.presentAlertConfirm(data);
    },
    async presentAlertConfirm(data) {
      const alertController = document.querySelector('ion-alert-controller');
      await alertController.componentOnReady();

      const alert = await alertController.create({
        header: 'Confirm Delete',
        message: `Are you sure you want to delete Account: ${this.account.name}`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => false,
          }, {
            text: 'Delete',
            handler: () => {
              this.deleteAccount(data);
              this.$router.push('/');
            },
          },
        ],
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
