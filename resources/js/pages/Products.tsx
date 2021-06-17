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
import { ApiService } from "../services/";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { TableItem } from "../interfaces/interfaces";

const Products: React.FC = () => {
    const router = useHistory();
    const [products, setProducts] = useState<TableItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await ApiService.getProducts();
            const tableItems = data.data.map(
                ({ id, inventory_level, name, price }: TableItem) => ({
                    id,
                    name,
                    price,
                    inventory_level,
                })
            );
            setProducts(tableItems);
        };
        fetchData();
    }, []);

    const renderName = (id: number, name: string) => (
        <Link to={`/products/${id}`}>{name}</Link>
    );

    const renderPrice = (price: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);

    const renderStock = (inventory_level: number) =>
        inventory_level > 0 ? (
            <Small>{inventory_level}</Small>
        ) : (
            <Small bold marginBottom="none" color="danger">
                0
            </Small>
        );

    const renderAction = (id: number) => (
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
                            hash: "inventory_level",
                            render: ({ inventory_level }) =>
                                renderStock(inventory_level),
                            sortKey: "inventory_level",
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
