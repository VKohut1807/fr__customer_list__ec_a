<template>
    <v-form ref="form" v-model="valid">
        <v-card>
            <v-card-title>
                <span class="text-h5" v-show="!editDialog">New Client</span>
                <span class="text-h5" v-show="editDialog">Edit Client</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model.trim="client.name" label="Your Name*" placeholder="John Doe" counter
                                maxlength="15" :rules="[rules.required]"></v-text-field>
                            <v-text-field v-model.trim="client.company_name"
                                label="The name of the company in which you work*" placeholder="Tesla, Inc." counter
                                maxlength="25" :rules="[rules.required]">
                            </v-text-field>
                            <v-text-field v-model.trim="client.company_bs" label="Specifics of your work"
                                placeholder="development and design of the electric motor" counter maxlength="30">
                            </v-text-field>
                            <v-text-field v-model.trim="client.email" label="Your Email*"
                                placeholder="idonotexist@gmail.com" counter maxlength="15"
                                :rules="[rules.required, rules.email]">
                            </v-text-field>

                            <v-text-field v-model.trim="client.phone" :rules="[rules.max]" label="Your mobile phone"
                                placeholder="0009379992" counter maxlength="15" type="number" class="inputNumber">
                            </v-text-field>

                            <v-text-field v-model.trim="client.address_street" label="Street*" counter maxlength="25"
                                :rules="[rules.required]" placeholder="Paseo de la Reforma 15/54" type="phone">
                            </v-text-field>
                            <v-text-field v-model.trim="client.address_city" label="City*" placeholder="El Paso" counter
                                maxlength="15" :rules="[rules.required]">
                            </v-text-field>
                            <v-text-field v-model.trim="client.address_zipcode" label="Zipcode*"
                                :rules="[rules.required, rules.max]" type="number" placeholder="77800" counter max="15"
                                maxlength="15" class="inputNumber">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="resetForm" color="warning" text>Reset form</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="close" color="error" text>Close</v-btn>
                <v-btn ref="submit" v-if="!editDialog" @click="send" :disabled="!valid" color="success" text>Send
                </v-btn>
                <v-btn v-else @click="replace" :disabled="!valid" color="success" text>Replace</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
export default {
    components: {},
    name: "my-form",
    props: {
        editClient: {
            type: Object,
            required: false,
        },
        editDialog: {
            type: Boolean,
            required: false,
        },
    },
    data: () => ({
        dialog: false,
        client: {
            "name": "",
            "company_name": "",
            "company_bs": "",
            "email": "",
            "phone": "",
            "address_street": "",
            "address_city": "",
            "address_zipcode": "",
        },
        rules: {
            required: v => !!v || "* This field is required!",
            email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid!',
            max: v => (v === null || v.length <= 15) || "Exceeds the allowable length!",
        },
        valid: true,
    }),
    mounted() {
        this.editDialogClient();
    },
    methods: {
        editDialogClient() {
            if (this.editDialog) {
                this.client = this.editClient;
            }
        },
        send() {
            if (this.$refs.form.validate()) {
                this.$emit("send", this.client);
            }
        },
        replace() {
            if (this.$refs.form.validate()) {
                this.$emit("replace", this.client);
            }
        },
        resetForm() {
            this.$refs.form.reset();
        },
        close() {
            this.$emit("close");
        },
    }
};
</script>
<style>
.inputNumber input[type='number'] {
    -moz-appearance: textfield;
}

.inputNumber input::-webkit-outer-spin-button,
.inputNumber input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>