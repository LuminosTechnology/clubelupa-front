import { IonModal } from "@ionic/react";
import { IonicReactProps } from "@ionic/react/dist/types/components/IonicReactProps";
import React, { ComponentPropsWithoutRef } from "react";

type IonModalReactProps = ComponentPropsWithoutRef<typeof IonModal>;

type CategoryFilterProps = IonModalReactProps & {};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ ...rest }) => {
  return <IonModal {...rest}></IonModal>;
};
