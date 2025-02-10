/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Size20 } from "../../icons/Size20";
import { MenuItem } from "../MenuItem";
import { MenuSeparator } from "../MenuSeparator";
import "./style.css";

export const Menu = ({
  className,
  menuItemIcon = <Size20 className="star-4" color="#1E1E1E" />,
  override = <Size20 className="star-4" color="#1E1E1E" />,
  menuItemIcon1 = <Size20 className="star-4" color="#1E1E1E" />,
  menuItemIcon2 = <Size20 className="star-4" color="#1E1E1E" />,
  menuItemIcon3 = <Size20 className="star-4" color="#1E1E1E" />,
}) => {
  return (
    <div className={`menu ${className}`}>
      <div className="menu-header">
        <div className="text-wrapper">Heading</div>

        <div className="div">Heading</div>
      </div>

      <MenuSeparator className="menu-separator-instance" />
      <div className="menu-section">
        <MenuItem
          className="menu-item-instance"
          description="Menu description."
          icon={menuItemIcon}
          label="Menu Label"
          stateProp="default"
        />
        <MenuItem
          className="design-component-instance-node"
          description="Menu description."
          icon={override}
          label="Menu Label"
          stateProp="default"
        />
        <MenuItem
          className="design-component-instance-node"
          description="Menu description."
          icon={menuItemIcon1}
          label="Menu Label"
          stateProp="default"
        />
      </div>

      <MenuSeparator className="design-component-instance-node" />
      <div className="menu-section-2">
        <MenuItem
          className="design-component-instance-node"
          description="Menu description."
          icon={menuItemIcon2}
          label="Menu Label"
          stateProp="default"
        />
        <MenuItem
          className="menu-item-instance"
          description="Menu description."
          icon={menuItemIcon3}
          label="Menu Label"
          stateProp="default"
        />
      </div>
    </div>
  );
};
