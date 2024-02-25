import { StaticImageData } from "next/image";

export type MenuItemsType = {
  icon: string | StaticImageData;
  id: string;
  buttonType: ButtonTypes;
};

export type ButtonTypes = "CLEAR" | "EDIT";
