import React from "react";
import Switch from "react-switch";
const GlobalSwitch = ({
  checked,
  onChange,
  onColor = "#dc2626",
  offColor = "#555",
  width = 44,
  height = 22,
  handleDiameter = 18,
}) => {
  return (
    <Switch
      onChange={onChange}
      checked={checked}
      offColor={offColor}
      onColor={onColor}
      uncheckedIcon={false}
      checkedIcon={false}
      handleDiameter={handleDiameter}
      height={height}
      width={width}
    />
  );
};

export default GlobalSwitch;
