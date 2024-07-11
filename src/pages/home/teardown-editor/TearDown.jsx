import { Input } from "antd";

const TearDown = ({tearDown, setTearDown}) => {

    const handleRequestBody = (e) => {
        setTearDown(e.target.value);
    };

    return <Input.TextArea
        rows={12}
        showCount={true}
        value={tearDown}
        onChange={handleRequestBody}
    />
}

export default TearDown;