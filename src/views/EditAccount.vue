<template>
  <ion-content>
    <form @submit.prevent="handleEdit(account)">
      <ion-list>
        <ion-list-header padding justify-content-center class="banner">Edit Account</ion-list-header>

          <ion-grid padding class="igrid">
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

          <ion-grid padding class="igrid">
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
            <ion-button class="ibutton" expand="full" :disabled="$v.$invalid" type="submit">Update Account</ion-button>
          </ion-grid>
        </ion-list>
      </form>
  </ion-content >
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Edit',
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
      updateAccount: 'updateAccount',
    }),
    updateName() {
      this.account.name = this.$refs.accName.value;
      this.$v.account.name.$touch();
    },
    updateDetails() {
      this.account.details = this.$refs.accDetails.value;
      this.$v.account.details.$touch();
    },
    handleEdit(data) {
      this.updateAccount(data);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
</style>
