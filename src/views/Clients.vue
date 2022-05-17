<template>
    <v-col cols="12" sm="12" offset-sm="12" class="mt-10">
        <my-welcome-message :alertWindow="alertWindow" :alertText="alertText" @alertClose="alertClose" />
        <v-card>
            <v-card-title class="white--text orange darken-4">
                Clients Directory
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" fab class="text--primary">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <my-form @send="send" @close="close" />
                </v-dialog>
            </v-card-title>
            <v-list three-line subheader>
                <v-list-item v-for="item in clients" :key="item.title" link>
                    <v-list-item-avatar size="56" color="white" class="mx-20 pointer">
                        <v-avatar color="primary" size="56" class="white--text">
                            {{ item.name[0] }}
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-btn plain :to="{ name: 'client', params: { clientId: item.id } }">
                        <v-icon color="deep-orange lighten-2">
                            mdi-information
                        </v-icon>
                        more details...
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-card>
    </v-col>
</template>

<script>
import MyWelcomeMessage from "@/components/MyWelcomeMessage.vue";
import MyForm from "@/components/MyForm.vue";
const API_URL_CLIENTS = "http://localhost:4000/clients";

export default {
    components: { MyWelcomeMessage, MyForm },
    name: "clients",
    data: () => ({
        dialog: false,
        clients: [],
        alertWindow: false,
        alertText: "Open :)",
    }),
    mounted() {
        this.clientsList()
    },
    methods: {
        clientsList() {
            // this.axios
            //     .get(API_URL_CLIENTS)
            //     .then((res) => {
            //         if (res.data.length < 0) {
            //             return;
            //         }
            //         this.clients = res;
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // 
            fetch('https://jsonplaceholder.typicode.com/users?_limit=7')
                .then(response => response.json())
                .then(jsonList => {
                    this.clients = jsonList;
                })
        },
        async send(newClient) {
            // await this.axios
            //     .post(API_URL_CLIENTS, newClient)
            //     .then((res) => {
            //         console.log(res.data.message);
            //         this.clientsList();
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
            // 
            this.clients.push(newClient)
            this.dialog = false;
        },
        close() {
            this.dialog = false;
        },
        alertClose(bool) {
            this.alertWindow = bool;
        }
    },
}
</script>