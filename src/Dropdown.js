import React, { useState, useEffect } from "react";
import { useCombobox } from "downshift";
import "./Dropdown.css";

function Dropdown({ setValue }) {
  const [inputItems, setInputItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/getStatements")
      .then(res => res.json())
      .then(statements => {setItems(statements);setInputItems(statements)});
  }, []);

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    setInputValue,
    selectItem,
    reset
  } = useCombobox({
    items: inputItems,
    itemToString: item => (item ? item.name : ""),
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter(item =>
          item.name.toLowerCase().startsWith(inputValue.toLowerCase()) || item.org.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
    onSelectedItemChange: ({ selectedItem }) => {
      console.log("selected", selectedItem);
      setValue(selectedItem);
    },
    onIsOpenChange: ({ selectedItem, isOpen, inputValue }) => {
      if (isOpen === false) {
        if (selectedItem == null) {
          reset();
        } else if (inputValue !== selectedItem.name) {
          reset();
        }
      }
    }
  });

  return (
    <div className="combobox">
      <div {...getComboboxProps()}>
        <input
          placeholder="Choose Statement"
          {...getInputProps({ onFocus: openMenu })}
        />
      </div>
      <ul {...getMenuProps()} style={isOpen ? { opacity: 1 } : { opacity: 0 }}>
        {isOpen &&
          inputItems.map((item, index) => {
            return (
              <li
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#ECECEC", color: "black" }
                    : {}
                }
                key={`${item.title}${index}`}
                {...getItemProps({ item, index })}
              >
                <h4>{item.name}</h4>
                <p>{item.org}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Dropdown;
