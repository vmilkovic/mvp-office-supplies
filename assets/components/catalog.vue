<template>
    <div>
        <div class="row">
            <div class="col-3">
                <title-component
                    :text="categoryName"
                />
            </div>
            <div class="col-9">
                <search-bar @search-products="onSearchProducts" />
            </div>
        </div>

        <product-list
            :products="products"
            :loading="loading"
        />

        <div class="row">
            <legend-component :title="legend" />
        </div>
    </div>
</template>

<script>
import { fetchProducts } from '@/services/products-service';
import LegendComponent from '@/components/legend';
import ProductList from '@/components/product-list';
import TitleComponent from '@/components/title';
import SearchBar from './search-bar.vue';

export default {
    name: 'Catalog',
    components: {
        LegendComponent,
        ProductList,
        TitleComponent,
        SearchBar,
    },
    props: {
        currentCategoryId: {
            type: String,
            default: null,
        },
        categories: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            products: [],
            loading: false,
            legend: "Shipping takes 10-12 weeks, and products probably won't work",
            searchTerm: '',
        };
    },
    computed: {
        categoryName() {
            if (this.currentCategoryId === null) {
                return 'All Products';
            }

            const category = this.categories.find((cat) => (cat['@id'] === this.currentCategoryId));
            return category ? category.name : '';
        },
    },
    watch: {
        currentCategoryId() {
            this.loadProducts(null);
        },
    },
    created() {
        this.loadProducts(null);
    },
    methods: {
        /**
         * Handles a change in the searchTerm provided by the search bar and fetches new products
         *
         * @param {string} term
         */
        onSearchProducts({ term }) {
            this.searchTerm = term;
            this.loadProducts();
        },
        async loadProducts() {
            this.loading = true;

            let response;
            try {
                response = await fetchProducts(this.currentCategoryId, this.searchTerm);

                this.loading = false;
            } catch (e) {
                this.loading = false;

                return;
            }

            this.products = response.data['hydra:member'];
        },
    },
};
</script>
