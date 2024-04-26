import { Button, Form, Steps, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductFormStepOne from "./product-form-step-one.component";
import ProductFormStepTwo from "./product-form-step-two.component";
import ProductFormStepUploads from "./product-form-step-uploads.component";
import { useFormInit } from "hooks/shared/form-init.hook";
import { useForm } from "antd/es/form/Form";
import { useProduct } from "hooks/product.hook";
import { useStore } from "hooks/store.hook";
import { emptyProduct, IProduct } from "models/product.model";
import { UpdateMode } from "models/shared/update-mode.enum";
import { useUpload } from "hooks/shared/upload.hook";
import { FormErrorComponent } from "components/shared/form-error/form-error.component";
import { useNavigate } from "react-router-dom";

type Props = {
  formMode: UpdateMode;
};

const ProductStepForm: React.FC<Props> = ({ formMode }) => {
  const [current, setCurrent] = useState(0);
  const { initFormData } = useFormInit();
  const [form] = useForm();
  const { product, addProduct, editProduct } = useProduct();
  const { getUserStore } = useStore();
  const { fileList, beforeUpload, onRemove } = useUpload();
  const navigate = useNavigate();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formValues, setFormValues] = useState(emptyProduct);

  const onFinish = async (values: any) => {
    setSubmitting(true);
    setSubmitted(false);

    console.log(values);

    const formData: IProduct = {
      ...emptyProduct,
      ...values,
      amount: formValues.amount.toString(),
      qtty: formValues.qtty.toString(),
      storeId: `${getUserStore()?.id}`,
    };

    if (formMode === UpdateMode.ADD) {
      const feedback = await addProduct(formData);
      if (feedback) {
        message.success("Product created successfully!");
        navigate("/admin/products");
      } else {
        message.error("failed to create");
        setSubmitted(true);
      }
    }

    const formData2: IProduct = {
      ...product,
      ...values,
    };

    if (formMode === UpdateMode.EDIT) {
      const feedback = await editProduct(formData2);
      if (feedback) {
        message.success("Product updated successfully!");
        navigate("/admin/products");
      } else {
        message.error("failed to update");
        setSubmitted(true);
      }
    }
    setSubmitting(false);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Product Images",
      content: (
        <ProductFormStepUploads
          form={form}
          fileList={fileList}
          beforeUpload={beforeUpload}
          onRemove={onRemove}
        />
      ),
    },
    {
      title: "Product Details",
      content: <ProductFormStepOne form={form} formValues={product} />,
    },
    {
      title: "Product Description",
      content: <ProductFormStepTwo form={form} formValues={product} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  initFormData(form, formMode, product);

  useEffect(() => {}, [hasSubmitted]);
  return (
    <>
      <Steps current={current} items={items} />
      <FormErrorComponent
        hasSubmitted={hasSubmitted}
        setSubmitted={setSubmitted}
      />
      <Form
        onValuesChange={(changedValues, allValues) => {
          // Update formValues state with allValues on each step change
          console.log(changedValues);
          setFormValues({ ...formValues, ...allValues });
        }}
        onFinish={onFinish}
        layout="vertical"
        form={form}
      >
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={submitting}
            >
              Submit
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default ProductStepForm;

const contentStyle: React.CSSProperties = {
  lineHeight: "260px",
  textAlign: "center",
  border: `1px dashed #ddd`,
  marginTop: 16,
};
