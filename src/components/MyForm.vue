<template>
    <v-form ref="form">
        <v-card>
            <v-card-title>
                <span class="text-h5">Client</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model.trim="client.name" label="Client Name"></v-text-field>
                            <v-text-field v-model.trim="client.company.bs" label="Direction work"></v-text-field>
                            <v-text-field v-model.trim="client.company.name" label="Company Name"></v-text-field>
                            <v-text-field v-model.trim="client.phone" label="Mobile Phone"></v-text-field>
                            <v-text-field v-model.trim="client.email" label="Personal Mail"></v-text-field>
                            <v-text-field v-model.trim="client.address.street" label="Street"></v-text-field>
                            <v-text-field v-model.trim="client.address.city" label="City"></v-text-field>
                            <v-text-field v-model.trim="client.address.zipcode" label="Zipcode"></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="resetForm" color="warning" text>Reset form</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="close" color="error" text>Close</v-btn>
                <v-btn ref="submit" v-if="!editDialog" @click="send" color="success" text>Send
                </v-btn>
                <v-btn v-else @click="replace" color="success" text>Replace</v-btn>
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
            "email": "",
            "address": {
                "street": "",
                "city": "",
                "zipcode": "",
            },
            "phone": "",
            "company": {
                "name": "",
                "bs": ""
            }
        },
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
            this.client.id = Date.now();
            this.$emit("send", this.client);
        },
        replace() {
            this.$emit("replace", this.client);
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