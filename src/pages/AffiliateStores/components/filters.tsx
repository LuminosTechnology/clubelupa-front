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
} from "@ionic/react";
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { CategoryService } from "../../../services/category-service";
import { CategoryTreeNode } from "../../../types/api/category";
import { Checkbox, Header, Modal, SubmitButton } from "./filters.styles";

type IonModalReactProps = ComponentPropsWithoutRef<typeof IonModal>;

type CategoryFilterProps = IonModalReactProps & {
  onFilter: (categoriesIds: number[]) => unknown;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onFilter,
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
    if (selectedCategory !== null) {
      categoriesIds.push(selectedCategory);
    }
    if (selectedSub.length > 0) {
      categoriesIds.push(...selectedSub);
    }
    onFilter(categoriesIds);
  };

  return (
    <Modal {...rest}>
      <IonContent>
        <Header>
          <h1>Filtro de Categorias</h1>
          <SubmitButton onClick={handleSubmit}>Filtrar</SubmitButton>
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
      </IonContent>
    </Modal>
  );
};
