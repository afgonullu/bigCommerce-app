export interface FormData {
    description: string;
    isVisible: boolean;
    name: string;
    price: number;
    type: string;
}

export interface TableItem {
    id: number;
    name: string;
    price: number;
    inventory_level: number;
}

export interface ListItem extends FormData {
    id: number;
}

export interface StringKeyValue {
    [key: string]: string;
}

export interface Summary {
    inventory_count: number;
    variant_count: number;
    inventory_value: number;
    highest_variant_price: number;
    average_variant_price: number;
    lowest_variant_price: number;
    oldest_variant_date: string;
    newest_variant_date: string;
    primary_category_id: number;
    primary_category_name: string;
}
