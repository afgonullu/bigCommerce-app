export const ApiService = {
    updateProduct(id, data) {
        return axios({
            method: "put",
            url: `/bc-api/v3/catalog/products/${id}`,
            data,
        });
    },
    getProductById(id) {
        return axios({
            method: "get",
            url: `/bc-api/v3/catalog/products/${id}`,
        });
    },
    getProducts() {
        return axios({
            method: "get",
            url: "/bc-api/v3/catalog/products?limit=11",
        });
    },

    getSummary() {
        return axios({
            method: "get",
            url: "/bc-api/v3/catalog/summary",
        });
    },

    getOrders(params) {
        params = Object.assign(
            {
                page: 1,
                limit: 10,
            },
            params
        );

        return axios({
            method: "get",
            url: "/bc-api/v2/orders",
            params,
        });
    },

    updateOrder(orderId, data) {
        return axios({
            method: "put",
            url: `/bc-api/v2/orders/${orderId}`,
            data,
        });
    },

    deleteOrder(orderId) {
        return axios({
            method: "delete",
            url: `/bc-api/v2/orders/${orderId}`,
        });
    },

    getResourceCollection(resource, params) {
        params = Object.assign(
            {
                page: 1,
                limit: 10,
            },
            params
        );

        return axios({
            method: "get",
            url: `/bc-api/${resource}`,
            params,
        });
    },

    getResourceEntry(resource, params) {
        return axios({
            method: "get",
            url: `/bc-api/${resource}`,
            params,
        });
    },

    updateResourceEntry(resource, data) {
        return axios({
            method: "put",
            url: `/bc-api/${resource}`,
            data,
        });
    },

    deleteResourceEntry(resource, data) {
        return axios({
            method: "delete",
            url: `/bc-api/${resource}`,
        });
    },
};
