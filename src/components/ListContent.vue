<template>
    <div id="div">
        <table id="table">
            <thead>
                <tr>
                    <th
                        v-for="(value, name) in firstElement"
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
    export default {
        name: "ListContent",
        props: {
            content: [Array, Object]
        },
        computed: {
            firstElement: function() {
                if (this.content instanceof Array)
                    return this.content[0];

                return this.content[Object.keys(this.content)[0]];
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
