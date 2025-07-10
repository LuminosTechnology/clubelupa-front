import React, { useState } from "react";
import {
  CustomCheckbox,
  DatePickerContent,
  TimeInputButton,
  TimeInputButtonsRow,
  WeekDayContainer,
  WeekDayPickerContainer,
} from "../affiliateRegister.style";
import {
  IonButton,
  IonContent,
  IonDatetime,
  IonItem,
  IonLabel,
  IonPopover,
  IonText,
} from "@ionic/react";

type Props = {
  dayName: string;
  onChange: (value: {
    day: string;
    active: boolean;
    startTime?: string;
    endTime?: string;
  }) => void;
};

export const WeekDayPicker: React.FC<Props> = ({ dayName, onChange }) => {
  const [selectedTime, setSelectedTime] = useState<"start" | "end">("start");
  const [showPopover, setShowPopover] = useState(false);
  const [active, setActive] = useState(false);
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  const handleToggle = () => {
    const newActive = !active;
    setActive(newActive);
  };

  const handleTimeChange = (type: "start" | "end", value?: string) => {
    const date = new Date(value ?? "now");
    const hours = value ? date.getHours().toString().padStart(2, "0") : "00";
    const minutes = value
      ? date.getMinutes().toString().padStart(2, "0")
      : "00";
    const cleanTime = value ? `${hours}:${minutes}` : "00:00";

    if (type === "start") {
      setStartTime(cleanTime);
      onChange({
        day: dayName,
        active,
        startTime: cleanTime,
      });
    } else {
      setEndTime(cleanTime);
      onChange({
        day: dayName,
        active,
        startTime,
        endTime: cleanTime,
      });
    }
  };

  return (
    <WeekDayPickerContainer>
      <CustomCheckbox
        labelPlacement="end"
        justify="start"
        color="light"
        onIonChange={handleToggle}
      >
        {dayName}
      </CustomCheckbox>
      {active && (
        <>
          <TimeInputButtonsRow>
            <IonText>De:</IonText>
            <TimeInputButton
              onClick={(e) => {
                setSelectedTime("start");
                setShowPopover(true);
              }}
            >
              {startTime ? `${startTime}` : "00:00"}
            </TimeInputButton>
            <IonText>Até:</IonText>
            <TimeInputButton
              onClick={(e) => {
                setSelectedTime("end");
                setShowPopover(true);
              }}
            >
              {endTime ? `${endTime}` : "00:00"}
            </TimeInputButton>
          </TimeInputButtonsRow>
        </>
      )}

      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
      >
        <DatePickerContent>
          <IonDatetime
            presentation="time"
            onIonChange={(e) => {
              const value = e.detail.value;
              if (Array.isArray(value)) {
                handleTimeChange(selectedTime, value[0]);
              } else {
                handleTimeChange(selectedTime, value || undefined);
              }
            }}
          />

          <IonButton onClick={() => setShowPopover(false)}>OK</IonButton>
        </DatePickerContent>
      </IonPopover>
    </WeekDayPickerContainer>
  );
};
