<template>
    <div v-if="content === undefined">
        undefined
    </div>
    <div
        v-if="content !== undefined && content.length > 0"
        id="div">
        <table id="table">
            <thead>
                <tr>
                    <th
                        v-for="(value, name) in content[0]"
                        :key="name">
                        {{ name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in content"
                    :key="index">
                    <td
                        v-for="(value, name) in item"
                        :key="name">
                        {{ value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { callAPI } from "@/utils.js";

    export default {
        name: "ListContent",
        props: {
            uriPath: String
        },
        data: function() {
            return {
                content: undefined
            };
        },
        async mounted() {
            try {
                this.content = await callAPI(
                    this.uriPath,
                    "get",
                    true
                );
            } catch (error) {
                console.error(error);
            }
        }
    };
</script>

<style scoped>
    #div {
        display: flex;
        justify-content: center;
    }

    #table {
        align-self: center;
    }

    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }

    th {
        padding-right: 10px;
        padding-left: 10px;
    }
</style>
