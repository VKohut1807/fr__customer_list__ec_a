    <template>
    <v-col cols="12" sm="8" offset-sm="3">
        <v-card>
            <v-list two-line subheader>
                <v-list-item v-for="item in clients" :key="item.title" link>
                    <v-list-item-avatar size="50" color="white" class="mx-20 pointer">
                        <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>

                        <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-btn plain to="/details">
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
export default {
    data: () => ({
        dialog: false,
        clients: [],
    }),
    mounted() {
        this.ClientsList()
    },
    methods: {
        randomNumb(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        ClientsList() {
            fetch('https://jsonplaceholder.typicode.com/users?_limit=7')
                .then(response => response.json())
                .then(jsonList => {
                    this.clients = jsonList;
                    for (let client of this.clients) {
                        client.avatar = `https://picsum.photos/id/${this.randomNumb(1, 50)}/200/300`
                    }

                })
        }
    },
}
</script>