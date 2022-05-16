<template>
    <v-container fluid class="py-0 fill-height">
        <template>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn text v-for="item in menuItems" :key="item.id" :to="item.link" color="blue">
                    <v-icon>{{ item.icon }}</v-icon>
                    &nbsp;{{ item.title }}
                </v-btn>
            </v-toolbar-items>
        </template>
    </v-container>
</template>

<script>
export default {
    name: 'my-header',
    data: () => ({
        menuItems: [
            {
                id: 1,
                title: "Clients",
                link: "/",
                icon: "mdi-human",
                active: false,
            },
        ],
    }),
};
</script>