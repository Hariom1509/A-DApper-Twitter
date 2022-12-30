import React from "react";
import { useState } from "react";
import "./LeftOption.css";

function LeftOption({text, Icon, onPress}) {

  return (
    <div className="leftOption">
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default LeftOption;