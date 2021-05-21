import React, { useEffect, useState } from "react";
import {
    Button,
    Dropdown,
    Panel,
    Small,
    StatefulTable,
} from "@bigcommerce/big-design";
import { MoreHorizIcon } from "@bigcommerce/big-design-icons";
import { Link, useHistory } from "react-router-dom";
import { ApiService } from "../../services/ApiService";
import Loading from "../components/Loading";
import Header from "../components/Header";

const Products = () => {
    const router = useHistory();
    const [products, setProducts] = useState(null);

    useEffect(async () => {
        const { data } = await ApiService.getProducts();
        const tableItems = data.data.map(
            ({ id, inventory_level: stock, name, price }) => ({
                id,
                name,
                price,
                stock,
            })
        );
        setProducts(tableItems);
    }, []);

    const renderName = (id, name) => <Link to={`/products/${id}`}>{name}</Link>;

    const renderPrice = (price) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);

    const renderStock = (stock) =>
        stock > 0 ? (
            <Small>{stock}</Small>
        ) : (
            <Small bold marginBottom="none" color="danger">
                0
            </Small>
        );

    const renderAction = (id) => (
        <Dropdown
            items={[
                {
                    content: "Edit product",
                    onItemClick: () => router.push(`/products/${id}`),
                    hash: "edit",
                },
            ]}
            toggle={
                <Button
                    iconOnly={<MoreHorizIcon color="secondary60" />}
                    variant="subtle"
                />
            }
        />
    );

    // if (isLoading) return <Loading />;
    // if (isError) return <ErrorMessage />;

    if (!products) return <Loading />;

    return (
        <>
            <Header />
            <Panel>
                <StatefulTable
                    columns={[
                        {
                            header: "Product name",
                            hash: "name",
                            render: ({ id, name }) => renderName(id, name),
                            sortKey: "name",
                        },
                        {
                            header: "Stock",
                            hash: "stock",
                            render: ({ stock }) => renderStock(stock),
                            sortKey: "stock",
                        },
                        {
                            header: "Price",
                            hash: "price",
                            render: ({ price }) => renderPrice(price),
                            sortKey: "price",
                        },
                        {
                            header: "Action",
                            hideHeader: true,
                            hash: "id",
                            render: ({ id }) => renderAction(id),
                            sortKey: "id",
                        },
                    ]}
                    items={products}
                    itemName="Products"
                    stickyHeader
                />
            </Panel>
        </>
    );
};

export default Products;
