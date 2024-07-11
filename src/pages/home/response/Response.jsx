import PropTypes from "prop-types";
import "./response.scss";
import { Divider, Input, Space, Typography } from "antd";

const Response = ({ response = {} }) => {
  const statusClassName = response?.status?.toString().startsWith("2")
    ? "response__status__green"
    : "response__status__red";
  return (
    <>
      <Space split={<Divider type="vertical" />}>
        <div>
          <Typography.Text>Status: </Typography.Text>
          <Typography.Text className={statusClassName}>
            {response.status}
          </Typography.Text>
        </div>
      </Space>
      <Input.TextArea
        size="small"
        contentEditable={false}
        value={response.body}
        rows={15}
        showCount={true}
      />
    </>
  );
};

Response.propTypes = {
  response: PropTypes.object,
};

export default Response;
