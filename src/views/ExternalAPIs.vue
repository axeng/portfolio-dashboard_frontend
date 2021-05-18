<template>
    <div>
        <h3>
            External APIs
        </h3>
        <ListContent :content="externalAPIs" />
    </div>

    <div>
        <h3>
            Create:
        </h3>

        Display Name:
        <input
            v-model="displayName"
            placeholder="name" />

        <br />
        Authentication Data:

        <br />
        Account:
        <select v-model="accountId">
            <option
                v-for="account in accounts"
                :value="account.id"
                :key="account.id">
                {{ account.id }} - {{ account.display_name }}
            </option>
        </select>

        <br />
        <button v-on:click="createExternalAPI">Create</button>
    </div>

    <div>
        <h3>
            Delete:
        </h3>

        External API:
        <select v-model="deleteExternalAPIId">
            <option
                v-for="externalAPI in externalAPIs"
                :value="externalAPI.id"
                :key="externalAPI.id">
                {{ externalAPI.id }} - {{ externalAPI.display_name }}
            </option>
        </select>

        <br />
        <button v-on:click="deleteExternalAPI">Delete</button>
    </div>
</template>

<script>
    import ListContent from "@/components/ListContent.vue";
    import { callAPI } from "@/utils.js";

    export default {
        name: "ExternalAPIs",
        components: {
            ListContent
        },
        data: function() {
            return {
                externalAPIs: [],
                accounts: {},
                displayName: undefined,
                authenticationData: undefined,
                accountId: undefined,
                deleteExternalAPIId: undefined,
                platformAuthenticationDataSchemas: {}
            };
        },
        methods: {
            loadExternalAPIs: async function() {
                this.externalAPIs = await callAPI({
                    uriPath: "/external-apis/",
                    method: "get",
                    defaultIfError: []
                });
            },
            loadAccounts: async function() {
                this.accounts = await callAPI({
                    uriPath: "/accounts/",
                    method: "get",
                    defaultIfError: {},
                    parameters: {
                        filter_platforms: true,
                        as_dict: true
                    }
                });
            },
            loadPlatformAuthenticationDataSchemas: async function() {
                this.platformAuthenticationDataSchemas = await callAPI({
                    uriPath: "/platforms/schemas/authentication-data/",
                    method: "get",
                    defaultIfError: {}
                });
            },
            createExternalAPI: async function() {
                // TODO remove
                this.authenticationData = "fakeAuthenticationData";

                // TODO data validation

                let newExternalAPI = {
                    display_name: this.displayName,
                    account_id: this.accountId
                };

                if (this.authenticationData !== undefined)
                    newExternalAPI["authentication_data"] = this.authenticationData;

                await callAPI({
                    uriPath: "/external-apis/",
                    method: "post",
                    data: newExternalAPI
                });

                await this.loadExternalAPIs();
            },
            deleteExternalAPI: async function() {
                // TODO data validation

                if (this.deleteExternalAPIId !== undefined) {
                    await callAPI({
                        uriPath: "/external-apis/" + this.deleteExternalAPIId + "/",
                        method: "delete"
                    });

                    await this.loadExternalAPIs();
                }
            }
        },
        mounted() {
            this.loadExternalAPIs();
            this.loadAccounts();
            this.loadPlatformAuthenticationDataSchemas();
        }
    };
</script>

<style scoped>

</style>
