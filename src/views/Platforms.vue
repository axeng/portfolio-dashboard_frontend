<template>
    <div>
        <h2>
            Platforms
        </h2>
        <ListContent :content="platforms" />
    </div>
</template>

<script>
    import ListContent from "@/components/ListContent.vue";
    import { callAPI } from "@/utils.js";

    export default {
        name: "Platforms",
        components: {
            ListContent
        },
        data: function() {
            return {
                platforms: []
            };
        },
        methods: {
            loadPlatforms: async function() {
                this.platforms = await callAPI({
                    uriPath: "/platforms/",
                    method: "get",
                    parameters: {
                        limit: -1
                    },
                    defaultIfError: []
                });
            }
        },
        mounted() {
            this.loadPlatforms();
        }
    };
</script>

<style scoped>

</style>
