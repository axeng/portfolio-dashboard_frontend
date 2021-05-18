<template>
    <div>
        <h3>
            Platforms
        </h3>
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
