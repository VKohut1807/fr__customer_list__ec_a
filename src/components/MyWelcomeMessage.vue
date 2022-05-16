<template>
    <v-overlay :value="alertWindow" z-index="99999">
        <v-btn icon @click="$emit('alertClose', false)">
            <v-img src="@/assets/welcome.jpg" max-width="600" height="300px" dark>
                <v-row class="fill-height">
                    <v-card-title class="mx-auto mt-auto">
                        <div class="text-h4" color="red">
                            {{ alertText }}
                        </div>
                    </v-card-title>
                </v-row>
            </v-img>
        </v-btn>
    </v-overlay>
</template>

<script>
export default {
    name: "my-welcome-message",
    props: {
        alertWindow: {
            type: Boolean,
            required: true,
        },
        alertText: {
            type: String,
            required: true,
        },
    },
    data: () => ({
    }),
}
</script>