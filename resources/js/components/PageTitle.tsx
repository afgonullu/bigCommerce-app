import { H1 } from "@bigcommerce/big-design";
import React from "react";

interface PageTitleProps {
    title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return <H1 marginLeft={{ mobile: "medium", tablet: "none" }}>{title}</H1>;
};

export default PageTitle;
