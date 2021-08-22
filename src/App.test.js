import AddCar from "./components/add-car/add-car.component";
import Modal from "./components/modal/modal.component";
import TestRenderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<Add/>", () => {
  it("render a snapshot", () => {
    const tree = TestRenderer.create(<AddCar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders five <TextInput/> components", () => {
    const wrapper = shallow(<AddCar />);
    expect(wrapper.find("TextField")).toHaveLength(5);
  });
});
