import axios from "axios";

const ApiService = {
    updateProduct(id: any, data: any) {
        return axios({
            method: "put",
            url: `/bc-api/v3/catalog/products/${id}`,
            data,
        });
    },
    getProductById(id: any) {
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
};

export default ApiService;
