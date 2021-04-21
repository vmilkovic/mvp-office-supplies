<template>
    <div>
        <input
            v-model="searchTerm"
            class="form-control"
            placeholder="Search Products..."
            type="search"
        >
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            searchTerm: '',
        };
    },
};
</script>
