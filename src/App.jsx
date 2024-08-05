import CustomSelect from "./component/CustomSelect/CustomSelect";
import "./component/CustomSelect/CustomSelect.css";
import "./App.css";

const App = () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Group 1 - Option 1", value: "4", group: "Group 1" },
    { label: "Group 1 - Option 2", value: "5", group: "Group 1" },
    { label: "Group 2 - Option 1", value: "6", group: "Group 2" },
  ];

  const handleChange = (value) => {
    console.log("Selected Value:", value);
  };

  const handleMenuOpen = () => {
    console.log("Menu Opened");
  };

  const handleSearch = (searchValues) => {
    console.log("Search values:", searchValues);
  };

  return (
    <div className="container">
      <div className="subcontainer">
        <h1>Custom Select Component</h1>
        <div className="input_container">
          <CustomSelect
            isClearable={true}
            isSearchable={true}
            isDisabled={false}
            options={options}
            value=""
            placeholder="Select an option"
            isGrouped={true}
            isMulti={true}
            onChangeHandler={handleChange}
            onMenuOpen={handleMenuOpen}
            onSearchHandler={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
