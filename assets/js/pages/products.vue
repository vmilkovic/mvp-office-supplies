<template>
    <div class="container-fluid">
        <div class="row">
            <aside :class="asideClass">
                <sidebar-component
                    :collapsed="sidebarCollapsed"
                    @toggle-collapsed="toggleSidebarCollapsed"
                />
            </aside>

            <div :class="contentClass">
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
            sidebarCollapsed: false,
        };
    },
    computed: {
        asideClass() {
            return this.sidebarCollapsed ? 'aside-collapsed' : 'col-xs-12 col-3';
        },
        contentClass() {
            return this.sidebarCollapsed ? 'col-xs-12 col-11' : 'col-xs-12 col-9';
        },
    },
    methods: {
        toggleSidebarCollapsed() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
    },
};
</script>
