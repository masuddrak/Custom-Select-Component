import { useState, useEffect, useRef } from 'react';
import './CustomSelect.css';
import PropTypes from 'prop-types'; // ES6

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler
}) => {
  const [selectedValue, setSelectedValue] = useState(value || (isMulti ? [] : ''));
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (menuOpen && isSearchable) {
      inputRef.current.focus();
    }
  }, [menuOpen, isSearchable]);
// selection option handler
  const handleSelect = (option) => {
    if (isMulti) {
      if (selectedValue.includes(option)) {
        const newValue = selectedValue.filter(val => val !== option);
        setSelectedValue(newValue);
        onChangeHandler(newValue);
      } else {
        const newValue = [...selectedValue, option];
        setSelectedValue(newValue);
        onChangeHandler(newValue);
      }
    } else {
      setSelectedValue(option);
      onChangeHandler(option);
      setMenuOpen(false);
    }
  };
// clear handler
  const handleClear = () => {
    const newValue = isMulti ? [] : '';
    setSelectedValue(newValue);
    onChangeHandler(newValue);
  };
// search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearchHandler(e.target.value);
  };
// options filter
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
// total slection opitons
  const renderOptions = () => {
    if (isGrouped) {
      const groupedOptions = filteredOptions.reduce((groups, option) => {
        const group = groups[option.group] || [];
        group.push(option);
        groups[option.group] = group;
        return groups;
      }, {});

      return Object.keys(groupedOptions).map(group => (
        <div key={group} className="kzui-custom-select__group ">
          {/* <div className="kzui-custom-select__group-label"></div> */}
          {groupedOptions[group].map(option => (
            <div
              key={option.value}
              className={`kzui-custom-select__option ${selectedValue.includes(option.value) ? 'kzui-custom-select__option--selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      ));
    }
// filter option
    return filteredOptions.map(option => (
      <div
        key={option.value}
        className={`kzui-custom-select__option ${selectedValue.includes(option.value) ? 'kzui-custom-select__option--selected' : ''}`}
        onClick={() => handleSelect(option.value)}
      >
        {option.label}
      </div>
    ));
  };

  return (
    <div className={`kzui-custom-select ${isDisabled ? 'kzui-custom-select--disabled' : ''}`}>
      <div
        className="kzui-custom-select__input"
        onClick={() => {
          if (!isDisabled) {
            setMenuOpen(!menuOpen);
            if (!menuOpen) onMenuOpen();
          }
        }}
      >
        {selectedValue.length > 0 ? (
          isMulti ? selectedValue.join(', ') : selectedValue
        ) : (
          <span className="kzui-custom-select__placeholder">{placeholder}</span>
        )}
        {isClearable && selectedValue.length > 0 && (
          <button className="kzui-custom-select__clear" onClick={handleClear}>Clear</button>
        )}
      </div>
      {menuOpen && (
        <div className="kzui-custom-select__menu">
          {isSearchable && (
            <input
              type="text"
              ref={inputRef}
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
              className="kzui-custom-select__search"
            />
          )}
          {renderOptions()}
        </div>
      )}
    </div>
  );
};
CustomSelect.propTypes = {

  isClearable: PropTypes.bool,
  isSearchable : PropTypes.bool,
  isDisabled : PropTypes.bool,
  options:PropTypes.array,
  value:PropTypes.string,
  placeholder:PropTypes.string,
  isGrouped:PropTypes.bool,
  isMulti:PropTypes.bool,
  onChangeHandler:PropTypes.func,
  onMenuOpen:PropTypes.func,
  onSearchHandler:PropTypes.func,
 
}
export default CustomSelect;