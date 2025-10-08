import {
  IonAccordion,
  IonAccordionGroup,
  IonCheckbox,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonButton,
  IonIcon
} from "@ionic/react";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { CategoryService } from "../../../services/category-service";
import { CategoryTreeNode } from "../../../types/api/category";
import { Checkbox, Header, Modal, SubmitButton } from "./filters.styles";
import { close } from "ionicons/icons"; 

type IonModalReactProps = ComponentPropsWithoutRef<typeof IonModal>;

type CategoryFilterProps = IonModalReactProps & {
  onFilter: (categoriesIds: number[]) => unknown;
  onClose: () => void; 
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onFilter,
  onClose,
  ...rest
}) => {
  const [categories, setCategories] = useState<CategoryTreeNode[]>([]);

  const [selectedSub, setSelectedSub] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handleAccordionChange = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      setOpenAccordion((prev) => (prev === categoryId ? null : categoryId));
    }
  };

  const fetchCategories = async () => {
    const response = await CategoryService.getCategoriesTree();
    setCategories(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleSub = (subId: number, parentId: number) => {
    if (selectedCategory !== parentId) {
      setSelectedCategory(parentId);
      setSelectedSub([subId]);
    } else {
      setSelectedSub((prev) =>
        prev.includes(subId)
          ? prev.filter((i) => i !== subId)
          : [...prev, subId]
      );
    }
  };

  const handleCategoryChange = (newCategory: number | null) => {
    if (selectedCategory === newCategory) {
      setSelectedCategory(null);
      setSelectedSub([]);
    } else {
      setSelectedCategory(newCategory);
      setSelectedSub([]);
    }
  };

  const handleSubmit = () => {
    let categoriesIds = [];
    const isFatherCategory = selectedCategory !== null;
    const isChildrenCategory = selectedSub.length > 0;
    debugger;

    if (isFatherCategory && !isChildrenCategory) categoriesIds.push(selectedCategory);

    if (isChildrenCategory) categoriesIds.push(...selectedSub);

    onFilter(categoriesIds);
  };

  return (
    <Modal {...rest}>
      <IonContent>
        <Header>
          <h1>Filtro de Busca</h1>       
          <IonButton fill="clear" onClick={onClose}>
            <IonIcon icon={close} slot="icon-only" />
          </IonButton>             
        </Header>

        <IonAccordionGroup>
          {categories.map((category) =>
            category.children.length > 0 ? (
              <IonAccordion
                key={category.id}
                toggleIconSlot="end"
                value={String(category.id)}
                //@ts-expect-error
                onIonChange={() => handleAccordionChange(category.id)}
                className={openAccordion === category.id ? "open" : ""}
              >
                <IonItem slot="header">
                  <IonLabel>{category.name}</IonLabel>
                  <Checkbox
                    slot="start"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onIonChange={() => handleCategoryChange(category.id)}
                  />
                </IonItem>
                <div className="ion-padding" slot="content">
                  <IonList>
                    {category.children.map((sub) => (
                      <IonItem key={sub.id}>
                        <Checkbox
                          checked={selectedSub.includes(sub.id)}
                          onIonChange={() => toggleSub(sub.id, category.id)}
                          slot="start"
                        />
                        <IonLabel>{sub.name}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </div>
              </IonAccordion>
            ) : (
              <IonItem key={category.id}>
                <IonLabel>{category.name}</IonLabel>
                <Checkbox
                  slot="start"
                  checked={selectedCategory === category.id}
                  onIonChange={() => handleCategoryChange(category.id)}
                />
              </IonItem>
            )
          )}
        </IonAccordionGroup>
        <br />
        <SubmitButton onClick={handleSubmit}>Filtrar</SubmitButton>
      </IonContent>
    </Modal>
  );
};
