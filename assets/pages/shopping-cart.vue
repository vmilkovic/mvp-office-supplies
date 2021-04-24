<template>
    <div :class="[$style.component, 'container-fluid']">
        <div class="row">
            <aside class="col-xs-12 col-lg-3" />

            <div class="col-xs-12 col-lg-9">
                <title-component text="Shopping Cart" />

                <div class="content p-3">
                    <loading v-show="completeCart === null" />

                    <shopping-cart-list
                        v-if="completeCart"
                        :items="completeCart.items"
                        @update-quantity="updateQuantity"
                        @remove-from-cart="removeProductFromCart($event.productId, $event.colorId)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TitleComponent from '@/components/title';
import ShoppingCartMixin from '@/mixins/get-shopping-cart';
import Loading from '@/components/loading';
import ShoppingCartList from '@/components/shopping-cart';
import { fetchProductsById } from '@/services/products-service';
import { fetchColors } from '@/services/colors-service';

export default {
    name: 'ShoppingCart',
    components: {
        TitleComponent,
        Loading,
        ShoppingCartList,
    },
    mixins: [ShoppingCartMixin],
    data() {
        return {
            products: null,
            colors: null,
        };
    },
    computed: {
        completeCart() {
            if (!this.cart || !this.products || !this.colors) {
                return null;
            }

            const completeItems = this.cart.items.map((cartItem) => {
                const product = this.products.find((productItem) => productItem['@id'] === cartItem.product);
                const color = this.colors.find((colorItem) => colorItem['@id'] === cartItem.color);

                return {
                    id: `${cartItem.product}_${cartItem.color ? cartItem.color : 'none'}`,
                    product,
                    color,
                    quantity: cartItem.quantity,
                };
            });

            return {
                items: completeItems,
            };
        },
    },
    watch: {
        async cart() {
            this.loadProducts();
        },
    },
    async created() {
        this.colors = (await fetchColors()).data['hydra:member'];
    },
    methods: {
        async loadProducts() {
            const productIds = this.cart.items.map((item) => item.product);
            const productsResponse = await fetchProductsById(productIds);

            this.products = productsResponse.data['hydra:member'];
        },
        updateQuantity({ productId, colorId, quantity }) {
            this.updateProductQuantity(productId, colorId, quantity);
        },
    },
};
</script>

<style lang="scss" module>
@import '~styles/components/light-component.scss';

.component :global {
    .content {
        @include light-component;
    }
}
</style>
