<template>
  <ion-content>
    <form @submit.prevent="handleAdd(account)">
      <ion-list class="grid">
        <ion-list-header padding justify-content-center class="banner">Add Account</ion-list-header>

          <ion-grid padding class="igrid">
            <ion-row>
              <ion-col >
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

        <ion-grid padding class="igrid">
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

          <ion-grid padding>
            <ion-button class="ibutton" expand="full" :disabled="$v.$invalid" type="submit">Add Account</ion-button>
          </ion-grid>
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
</style>
