import { Form } from "antd";
import React from "react";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {

    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
};

export default EditableRow;
export {EditableContext}