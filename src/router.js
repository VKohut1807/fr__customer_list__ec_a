import Vue from "vue";
import Router from "vue-router";
import Clients from "@/views/Clients.vue";
import ClientInfo from "@/views/ClientInfo.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";



Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: Clients
        },
        {
            path: "/client/:clientId",
            name: 'client',
            component: ClientInfo
        },
        {
            path: "*",
            component: NotFoundPage
        }
    ]
})