import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ApiService } from "../services/";
import Form from "../components/Form";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { FormData } from "../interfaces/interfaces";

const ProductDetails: React.FC = () => {
    const router = useHistory();
    let { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<FormData>();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await ApiService.getProductById(id);
            const {
                description,
                is_visible: isVisible,
                name,
                price,
                type,
            } = data.data ?? {};
            const formData = {
                description,
                isVisible,
                name,
                price,
                type,
            };
            setFormData(formData);
        };
        fetchData();
    }, []);

    const handleCancel = () => router.push("/products");

    const handleSubmit = async (data: FormData) => {
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
