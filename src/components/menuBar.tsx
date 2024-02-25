import React from "react";
import { ButtonTypes, MenuItemsType } from "./Types";
import { Images } from "@/utils/ImageMapping";
import Image from "next/image";

interface IMenuBar {
  eraseCanvas: () => void;
}

const menuBoxHeight = "20px";
const menuBoxWidth = "20px";

const MenuBar: React.FC<IMenuBar> = ({ eraseCanvas }) => {
  const handleClick = (menuType: ButtonTypes) => {
    switch (menuType) {
      case "CLEAR":
        eraseCanvas();
        break;
      default:
        console.log("Wrong Menu Item Clicked");
    }
  };

  const menuItems: MenuItemsType[] = [
    {
      icon: Images.Eraser,
      id: "clear",
      buttonType: "CLEAR",
    },
  ];

  return (
    <div className="h-[50%] w-[10%] flex flex-col ml-2">
      {menuItems.map((elem, idx) => {
        return (
          <div
            key={elem.id + idx}
            className={`bg-white h-[2.5rem] w-[2.5rem] rounded shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]`}
            onClick={() => handleClick(elem.buttonType)}
          >
            <Image src={elem.icon} alt={"icon_image"} />
          </div>
        );
      })}
    </div>
  );
};

export default MenuBar;
