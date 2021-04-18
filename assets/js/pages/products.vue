<template>
    <div class="container-fluid">
        <div class="row">
            <aside class="col-xs-12 col-3">
                <sidebar-component />
            </aside>

            <div class="col-xs-12 col-9">
                <catalog-component />
            </div>
        </div>
    </div>
</template>

<script>
import CatalogComponent from '@/components/catalog';
import SidebarComponent from '@/components/sidebar';

export default {
    name: 'Products',
    components: {
        CatalogComponent,
        SidebarComponent,
    },
    data() {
        return {
            legend: "Shipping takes 10-12 weeks, and products probably won't work",
        };
    },
};
</script>
