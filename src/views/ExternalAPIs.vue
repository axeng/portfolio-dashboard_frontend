<template>
    <div>
        <h2>
            External APIs
        </h2>
        <ListContent :content="externalAPIs" />
    </div>

    <div>
        <h2>
            Create:
        </h2>

        Display Name:
        <input
            v-model="displayName"
            placeholder="name" />

        <br />
        <json-forms
            :data="authenticationData"
            :schema="platformAuthenticationDataSchema"
            :renderers="renderers"
            @change="authenticationDataOnChange" />

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
        <h2>
            Delete:
        </h2>

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

    import { JsonForms } from "@jsonforms/vue";
    import { vanillaRenderers } from "@jsonforms/vue-vanilla";

    export default {
        name: "ExternalAPIs",
        components: {
            ListContent,
            JsonForms
        },
        data: function() {
            return {
                renderers: Object.freeze([
                    ...vanillaRenderers
                ]),
                externalAPIs: [],
                accounts: {},
                displayName: undefined,
                authenticationData: {},
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
                    parameters: {
                        limit: -1
                    },
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
                        as_dict: true,
                        limit: -1
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
                // TODO data validation

                let newExternalAPI = {
                    display_name: this.displayName,
                    account_id: this.accountId,
                    authentication_data: JSON.stringify(this.authenticationData)
                };

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
            },
            authenticationDataOnChange: function(event) {
                this.authenticationData = event.data;
            }
        },
        mounted() {
            this.loadExternalAPIs();
            this.loadAccounts();
            this.loadPlatformAuthenticationDataSchemas();
        },
        computed: {
            platformAuthenticationDataSchema: function() {
                if (!(this.accountId in this.accounts))
                    return undefined;

                const platformId = this.accounts[this.accountId]["platform_id"];
                return this.platformAuthenticationDataSchemas[platformId];
            }
        }
    };
</script>

<style scoped>

</style>
