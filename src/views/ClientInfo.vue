<template>
    <v-card max-width="500" class="mx-auto">
        <my-welcome-message :alertWindow="alertWindow" :alertText="alertText" @alertClose="alertClose" />
        <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png" height="300px" dark>
            <v-row class="fill-height">
                <v-spacer></v-spacer>
                <v-card-title class="white--text pl-12 pt-12">
                    <div class="text-h4 pl-12 pt-12">
                        {{ client.name }}
                    </div>
                </v-card-title>
            </v-row>
        </v-img>
        <v-list two-line>
            <v-list-item>
                <v-list-item-action></v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>{{ client.company_bs }}</v-list-item-title>
                    <v-list-item-subtitle>Company, {{ client.company_name }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-phone
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ client.phone }}</v-list-item-title>
                    <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                    <v-icon>mdi-message-text</v-icon>
                </v-list-item-icon>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-email
                    </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ client.email }}</v-list-item-title>
                    <v-list-item-subtitle>Personal</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="indigo">
                        mdi-map-marker
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ client.address_street }}</v-list-item-title>
                    <v-list-item-subtitle>{{ client.address_city }}, {{ client.address_zipcode }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-divider inset></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" text color="warning">Edit</v-btn>
                </template>
                <my-form :editDialog="editDialog" :editClient="client" @replace="replaceClient" @close="close" />
            </v-dialog>
            <v-btn @click="deleteClient(client.id)" text color="error" class="px-0">Delete</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import MyForm from "@/components/MyForm.vue";
import MyWelcomeMessage from "@/components/MyWelcomeMessage.vue";
const API_URL_CLIENTS = "http://127.0.0.1:8000/api/clients/";

export default {
    name: "client-info",
    components: { MyForm, MyWelcomeMessage },
    data: () => ({
        openClientId: "",
        client: {
            "name": "",
            "email": "",
            "address_street": "",
            "address_city": "",
            "address_zipcode": "",
            "phone": "",
            "company_name": "",
            "company_bs": ""
        },
        dialog: false,
        editDialog: true,
        alertWindow: true,
        alertText: "Open :)",
    }),
    mounted() {
        this.openClient()
    },
    methods: {
        async openClient() {
            this.openClientId = Number(this.$route.params.clientId);
            await this.axios
                .get(API_URL_CLIENTS + this.openClientId)
                .then((res) => {
                    this.client = res.data;
                    console.log(this.client);
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        this.$router.push('/404')
                    }
                    console.log(error);
                });
        },
        async replaceClient(changedClient) {
            await this.axios
                .put(API_URL_CLIENTS + this.client.id, changedClient)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            this.dialog = false;
        },
        async deleteClient(id) {
            await this.axios
                .delete(API_URL_CLIENTS + id)
                .then((res) => {
                    this.openClient();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        close() {
            this.dialog = false;
        },
        alertClose(bool) {
            this.alertWindow = bool;
        },
    },
};
</script>