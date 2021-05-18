<template>
    <div>
        <h3>
            Accounts
        </h3>
        <ListContent :content="accounts" />
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
        Additional Data:

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
        <h3>
            Delete:
        </h3>

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

    export default {
        name: "Accounts",
        components: {
            ListContent
        },
        data: function() {
            return {
                accounts: [],
                platforms: {},
                parentAccountId: -1,
                displayName: undefined,
                additionalData: undefined,
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
                    defaultIfError: []
                });
            },
            loadPlatforms: async function() {
                this.platforms = await callAPI({
                    uriPath: "/platforms/",
                    method: "get",
                    parameters: {
                        as_dict: true
                    },
                    defaultIfError: {}
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
                // TODO remove
                if (this.platformId !== -1)
                    this.additionalData = "fakeAdditionalData"
                else
                    this.additionalData = undefined

                // TODO data validation

                let newAccountData = {
                    display_name: this.displayName
                };

                if (this.parentAccountId !== -1)
                    newAccountData["parent_account_id"] = this.parentAccountId;
                if (this.additionalData !== undefined)
                    newAccountData["additional_data"] = this.additionalData;
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
            }
        },
        mounted() {
            this.loadAccounts();
            this.loadPlatforms();
            this.loadPlatformAdditionalDataSchemas();
        }
    };
</script>

<style scoped>

</style>
