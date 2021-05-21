import React, { useState } from "react";
import {
    Button,
    Checkbox,
    Flex,
    FormGroup,
    Input,
    Panel,
    Select,
    Form as StyledForm,
    Textarea,
} from "@bigcommerce/big-design";

const FormErrors = {
    name: "Product name is required",
    price: "Default price is required",
};

const Form = ({ formData, onCancel, onSubmit }) => {
    const { description, isVisible, name, price, type } = formData;
    const [form, setForm] = useState({
        description,
        isVisible,
        name,
        price,
        type,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name: formName, value } = event?.target;
        setForm((prevForm) => ({ ...prevForm, [formName]: value }));

        // Add error if it exists in FormErrors and the input is empty, otherwise remove from errors
        !value && FormErrors[formName]
            ? setErrors((prevErrors) => ({
                  ...prevErrors,
                  [formName]: FormErrors[formName],
              }))
            : setErrors(({ [formName]: removed, ...prevErrors }) => ({
                  ...prevErrors,
              }));
    };

    const handleSelectChange = (value) => {
        setForm((prevForm) => ({ ...prevForm, type: value }));
    };

    const handleCheckboxChange = (event) => {
        const { checked, name: formName } = event?.target;
        setForm((prevForm) => ({ ...prevForm, [formName]: checked }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // If there are errors, do not submit the form
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors) return;

        onSubmit(form);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <Panel header="Basic Information">
                <FormGroup>
                    <Input
                        error={errors?.name}
                        label="Product name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Select
                        label="Product type"
                        name="type"
                        options={[
                            { value: "physical", content: "Physical" },
                            { value: "digital", content: "Digital" },
                        ]}
                        required
                        value={form.type}
                        onOptionChange={handleSelectChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        error={errors?.price}
                        iconLeft={"$"}
                        label="Default price (excluding tax)"
                        name="price"
                        placeholder="10.00"
                        required
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        name="isVisible"
                        checked={form.isVisible}
                        onChange={handleCheckboxChange}
                        label="Visible on storefront"
                    />
                </FormGroup>
            </Panel>
            <Panel header="Description">
                <FormGroup>
                    <Textarea
                        label="Description"
                        name="description"
                        placeholder="Product info"
                        value={form.description}
                        onChange={handleChange}
                    />
                </FormGroup>
            </Panel>
            <Flex justifyContent="flex-end">
                <Button
                    marginRight="medium"
                    type="button"
                    variant="subtle"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </Flex>
        </StyledForm>
    );
};

export default Form;
