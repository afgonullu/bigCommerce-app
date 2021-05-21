import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import Form from "../components/Form";
import Header from "../components/Header";
import Loading from "../components/Loading";

const ProductDetails = () => {
    const router = useHistory();
    let { id } = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(async () => {
        const { data } = await ApiService.getProductById(id);
        const {
            description,
            is_visible: isVisible,
            name,
            price,
            type,
        } = data.data ?? {};
        const formData = { description, isVisible, name, price, type };
        setFormData(formData);
    }, []);

    const handleCancel = () => router.push("/products");

    const handleSubmit = async (data) => {
        try {
            console.log("hello");
            await ApiService.updateProduct(id, data);
            router.push("/products");
        } catch (error) {
            console.log("error");
        }
    };

    if (!formData) return <Loading />;

    return (
        <>
            <Header />
            <Form
                formData={formData}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />
        </>
    );
};

export default ProductDetails;
