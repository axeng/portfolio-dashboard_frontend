<template>
    <div>
        <h2>
            Platforms
        </h2>
        <ListContent :content="transactions" />
    </div>
</template>

<script>
    import ListContent from "@/components/ListContent.vue";
    import { callAPI } from "@/utils.js";

    export default {
        name: "Transactions",
        components: {
            ListContent
        },
        data: function() {
            return {
                transactions: []
            };
        },
        methods: {
            loadTransactions: async function() {
                this.transactions = await callAPI({
                    uriPath: "/transactions/",
                    method: "get",
                    defaultIfError: []
                });
            }
        },
        mounted() {
            this.loadTransactions();
        }
    };
</script>

<style scoped>

</style>
