<template>
    <div>
        <h2>
            Accounts
        </h2>
        <ListContent :content="accounts" />
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
        Parent Account:
        <select v-model="parentAccountId">
            <option
                :value="-1"
                selected>
                None
            </option>
            <option
                v-for="account in accounts"
                :value="account.id"
                :key="account.id">
                {{ account.id }} - {{ account.display_name }}
            </option>
        </select>

        <br />
        <json-forms
            :data="additionalData"
            :schema="platformAdditionalDataSchema"
            :renderers="renderers"
            @change="additionalDataOnChange" />

        <br />
        Platform:
        <select v-model="platformId">
            <option
                :value="-1"
                selected>
                None
            </option>
            <option
                v-for="platform in platforms"
                :value="platform.id"
                :key="platform.id">
                {{ platform.id }} - {{ platform.display_name }}
            </option>
        </select>

        <br />
        <button v-on:click="createAccount">Create</button>
    </div>

    <div>
        <h2>
            Delete:
        </h2>

        Account:
        <select v-model="deleteAccountId">
            <option
                v-for="account in accounts"
                :value="account.id"
                :key="account.id">
                {{ account.id }} - {{ account.display_name }}
            </option>
        </select>

        <br />
        <button v-on:click="deleteAccount">Delete</button>
    </div>
</template>

<script>
    import ListContent from "@/components/ListContent.vue";
    import { callAPI } from "@/utils.js";

    import { JsonForms } from "@jsonforms/vue";
    import { vanillaRenderers } from "@jsonforms/vue-vanilla";

    export default {
        name: "Accounts",
        components: {
            ListContent,
            JsonForms
        },
        data: function() {
            return {
                renderers: Object.freeze([
                    ...vanillaRenderers
                ]),
                accounts: [],
                platforms: [],
                parentAccountId: -1,
                displayName: undefined,
                additionalData: {},
                platformId: -1,
                deleteAccountId: undefined,
                platformAdditionalDataSchemas: {}
            };
        },
        methods: {
            loadAccounts: async function() {
                this.accounts = await callAPI({
                    uriPath: "/accounts/",
                    method: "get",
                    parameters: {
                        limit: -1
                    },
                    defaultIfError: []
                });
            },
            loadPlatforms: async function() {
                this.platforms = await callAPI({
                    uriPath: "/platforms/",
                    method: "get",
                    parameters: {
                        limit: -1
                    },
                    defaultIfError: []
                });
            },
            loadPlatformAdditionalDataSchemas: async function() {
                this.platformAdditionalDataSchemas = await callAPI({
                    uriPath: "/platforms/schemas/additional-data/",
                    method: "get",
                    defaultIfError: {}
                });
            },
            createAccount: async function() {
                // TODO data validation

                let newAccountData = {
                    display_name: this.displayName,
                    additional_data: JSON.stringify(this.additionalData)
                };

                if (this.parentAccountId !== -1)
                    newAccountData["parent_account_id"] = this.parentAccountId;
                if (this.platformId !== -1)
                    newAccountData["platform_id"] = this.platformId;

                await callAPI({
                    uriPath: "/accounts/",
                    method: "post",
                    data: newAccountData
                });

                await this.loadAccounts();
            },
            deleteAccount: async function() {
                // TODO data validation

                if (this.deleteAccountId !== undefined) {
                    await callAPI({
                        uriPath: "/accounts/" + this.deleteAccountId + "/",
                        method: "delete"
                    });

                    await this.loadAccounts();
                }
            },
            additionalDataOnChange: function(event) {
                this.additionalData = event.data;
            }
        },
        mounted() {
            this.loadAccounts();
            this.loadPlatforms();
            this.loadPlatformAdditionalDataSchemas();
        },
        computed: {
            platformAdditionalDataSchema: function() {
                if (this.platformId === -1)
                    return undefined;

                return this.platformAdditionalDataSchemas[this.platformId];
            }
        }
    };
</script>

<style scoped>

</style>
