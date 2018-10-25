<template>
  <ion-content>
    <form @submit.prevent="handleAdd(account)">
      <ion-list padding>
        <ion-list-header text-center class="banner">Add Account</ion-list-header>

          <ion-grid class="igrid">
            <ion-row>
              <ion-col>
                <ion-label class="ilabel">Account Name</ion-label>
                <ion-label class="error" v-if="!$v.account.name.minLength">Name must have at least {{$v.account.name.$params.minLength.min}} characters.</ion-label>
              </ion-col>
            </ion-row>
            <ion-row class="ibox">
              <ion-col>
                <ion-input :value="account.name" ref="accName" name='name' type='text' inputmode='text' @input="updateName" />
              </ion-col>
            </ion-row>
          </ion-grid>

        <ion-grid class="igrid">
            <ion-row>
              <ion-col>
                <ion-label class="ilabel">Account Details</ion-label>
                <ion-label class="error" v-if="!$v.account.details.minLength">Name must have at least {{$v.account.details.$params.minLength.min}} characters.</ion-label>
              </ion-col>
            </ion-row>
            <ion-row class="ibox">
              <ion-col>
                <ion-input :value="account.details" ref="accDetails" name='details' type='text' inputmode='text' @input="updateDetails" />
              </ion-col>
            </ion-row>
          </ion-grid>

          <ion-card-content>
            <ion-button class="ibutton" expand="full" :disabled="$v.$invalid" type="submit">Add Account</ion-button>
          </ion-card-content>
        </ion-list>
      </form>
  </ion-content >
</template>

<script>
import { mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Add',
  data() {
    return {
      account: {
        name: '',
        nameId: '',
        details: '',
      },
    };
  },

  validations: {
    account: {
      name: { required, minLength: minLength(4) },
      details: { required, minLength: minLength(4) },
    },
  },
  methods: {
    ...mapActions({
      addAccount: 'addAccount',
      checkUser: 'user/fetchUser',
    }),
    updateName() {
      this.account.name = this.$refs.accName.value;
      this.$v.account.name.$touch();
    },
    updateDetails() {
      this.account.details = this.$refs.accDetails.value;
      this.$v.account.details.$touch();
    },
    async handleAdd(account) {
      const validUser = await this.checkUser(this.account.name);
      if (validUser.success) {
        this.account.nameId = validUser.data.account.id;
        this.addAccount(account);
        this.$router.push('/');
      } else {
        this.presentAlert();
      }
    },
    async presentAlert() {
      const alertController = document.querySelector('ion-alert-controller');
      await alertController.componentOnReady();

      const alert = await alertController.create({
        header: 'Account Name Error',
        message: 'The account name does not exist. Please check the account name is correct',
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
  text-align: center !important;
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
