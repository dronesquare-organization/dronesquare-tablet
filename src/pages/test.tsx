import { SlLayers } from "react-icons/sl";
import { AiFillCaretDown } from "react-icons/ai";
import { Button } from "rsuite";

const Test = () => {
  return (
    <div>
      <SlLayers size={21} color="blue" />
      <AiFillCaretDown color="blue" />
      <Button appearance="subtle" color="green" size="xs">
        <AiFillCaretDown color="blue" />
      </Button>
    </div>
  );
};

export default Test;
