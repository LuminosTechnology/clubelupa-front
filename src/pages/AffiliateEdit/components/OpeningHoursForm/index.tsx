import { useEffect, useState } from "react";
import {
  AddButton,
  CheckboxContainer,
  Container,
  DayContainer,
  HourInput,
  OpeningHoursContainer,
  OpeningHoursList,
  RemoveButton,
} from "./style";
import { IonCheckbox } from "@ionic/react";

export interface TimePair {
  from: string;
  to: string;
  id: number;
}

export type DayValue =
  | "segunda-feira"
  | "terca-feira"
  | "quarta-feira"
  | "quinta-feira"
  | "sexta-feira"
  | "sabado"
  | "domingo"
  | "feriados";

interface DayConfig {
  value: DayValue;
  label: string;
  enabled: boolean;
  times: TimePair[];
}

type Props = {
  value?: Record<string, string[]>;
  onChange?: (payload: Record<string, string[]>) => void;
  disabled?: boolean;
};

import InputMask from "react-input-mask";

const initialSchedule: DayConfig[] = [
  {
    value: "segunda-feira",
    label: "segunda-feira",
    enabled: false,
    times: [],
  },
  { value: "terca-feira", label: "terça-feira", enabled: false, times: [] },
  { value: "quarta-feira", label: "quarta-feira", enabled: false, times: [] },
  { value: "quinta-feira", label: "quinta-feira", enabled: false, times: [] },
  { value: "sexta-feira", label: "sexta-feira", enabled: false, times: [] },
  { value: "sabado", label: "sábado", enabled: false, times: [] },
  { value: "domingo", label: "domingo", enabled: false, times: [] },
  { value: "feriados", label: "feriados", enabled: false, times: [] },
];

export const OpeningHoursForm: React.FC<Props> = ({ onChange, value, disabled = false }) => {
  const [schedule, setSchedule] = useState<DayConfig[]>(() => {
    if (value) {
      return initialSchedule.map((day) => ({
        ...day,
        enabled: Array.isArray(value[day.value]) && value[day.value].length > 0,
        times: Array.isArray(value[day.value])
          ? splitTimes(value[day.value])
          : [],
      }));
    }
    return initialSchedule;
  });

  const makePayload = (days: DayConfig[]) => {
    const payload: Record<string, string[]> = {};
    days.forEach((d) => {
      if (d.enabled && d.times.length > 0) {
        const validTimes = d.times
          .filter((t) => isValidHour(t.from) && isValidHour(t.to))
          .map((t) => `${t.from}-${t.to}`);
        if (validTimes.length) payload[d.value] = validTimes;
      }
    });
    return payload;
  };

  const splitTimes = (timesArray: string[]) => {
    return timesArray.map((time, index) => {
      const [from, to] = time.split("-");
      return {
        from: from.trim(),
        to: to.trim(),
        id: Math.random(),
      };
    });
  };

  const handleAddTime = (day: DayValue) => {
    setSchedule((prev) => {
      const newSchedule = prev.map((d) => {
        if (d.value === day) {
          const updatedDay = {
            ...d,
            times: [...d.times, { from: "", to: "", id: Math.random() }],
          };
          // Chame onChange aqui com o novo estado
          onChange &&
            onChange(
              makePayload(prev.map((p) => (p.value === day ? updatedDay : p)))
            );
          return updatedDay;
        }
        return d;
      });
      return newSchedule;
    });
  };

  const handleRemoveTime = (day: DayValue, index: number) => {
    setSchedule((prev) => {
      const newSchedule = prev.map((d) => {
        if (d.value === day) {
          const newTimes = d.times.filter((_, i) => i !== index);
          const updatedDay = {
            ...d,
            enabled: newTimes.length > 0 ? d.enabled : false,
            times: newTimes,
          };
          // Chame onChange aqui
          onChange &&
            onChange(
              makePayload(prev.map((p) => (p.value === day ? updatedDay : p)))
            );
          return updatedDay;
        }
        return d;
      });
      return newSchedule;
    });
  };

  const toggleCheckboxChange = (day: DayValue) => {
    setSchedule((prev) => {
      const newSchedule = prev.map((d) => {
        if (d.value === day) {
          const updatedDay = {
            ...d,
            enabled: !d.enabled,
            times:
              !d.enabled && d.times.length === 0
                ? [{ from: "", to: "", id: Math.random() }]
                : d.times,
          };
          // Chame onChange aqui
          onChange &&
            onChange(
              makePayload(prev.map((p) => (p.value === day ? updatedDay : p)))
            );
          return updatedDay;
        }
        return d;
      });
      return newSchedule;
    });
  };

  const handleHourInputChange = (
    type: "from" | "to",
    day: DayValue,
    index: number,
    value: string
  ) => {
    const sanitizedValue = value.replace(/[^0-9:]/g, "");
    let [hhStr, mmStr] = sanitizedValue.split(":");
    hhStr = hhStr || "00";
    mmStr = mmStr || "00";

    let hh = parseInt(hhStr, 10);
    let mm = parseInt(mmStr, 10);

    if (isNaN(hh)) hh = 0;
    if (isNaN(mm)) mm = 0;

    if (hh > 23) hh = 23;
    if (mm > 59) mm = 59;

    const newValue = `${String(hh).padStart(2, "0")}:${String(mm).padStart(
      2,
      "0"
    )}`;

    setSchedule((prev) => {
      const newSchedule = prev.map((d) => {
        if (d.value === day) {
          const updatedDay = {
            ...d,
            times: d.times.map((t, i) =>
              i === index ? { ...t, [type]: newValue } : t
            ),
          };
          // Chame onChange aqui
          onChange &&
            onChange(
              makePayload(prev.map((p) => (p.value === day ? updatedDay : p)))
            );
          return updatedDay;
        }
        return d;
      });
      return newSchedule;
    });
  };

  const isValidHour = (value: string) => {
    if (!value || value.length !== 5) return false;
    const [hh, mm] = value.split(":").map(Number);
    return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
  };

  useEffect(() => {
    if (value) {
      // Cria o novo estado de schedule a partir da prop `value`
      const newSchedule = schedule.map((day) => ({
        ...day,
        enabled: Array.isArray(value[day.value]) && value[day.value].length > 0,
        times: Array.isArray(value[day.value])
          ? splitTimes(value[day.value])
          : [],
      }));

      // Compara o novo payload com o atual para evitar atualizações desnecessárias
      // e prevenir o loop.
      if (
        JSON.stringify(makePayload(newSchedule)) !==
        JSON.stringify(makePayload(schedule))
      ) {
        setSchedule(newSchedule);
      }
    }
  }, [value]);

  return (
    <Container>
      {schedule.map((day) => (
        <DayContainer key={day.value}>
          <CheckboxContainer>
            <IonCheckbox
              checked={day.enabled}
              onIonChange={() => toggleCheckboxChange(day.value)}
              disabled={disabled}
            />
            {day.label}
            {day.enabled && (
              <AddButton
                onClick={() => handleAddTime(day.value)}
                disabled={day.times.length === 4 || disabled}
              >
                Adicionar Horário
              </AddButton>
            )}
          </CheckboxContainer>
          {day.enabled && (
            <OpeningHoursList>
              {day.times.map((time, index) => {
                const fromError = !isValidHour(time.from);
                const toError = !isValidHour(time.to);
                return (
                  <OpeningHoursContainer key={time.id}>
                    <InputMask
                      mask="99:99"
                      value={time.from}
                      inputMode="numeric"
                      onChange={(e) =>
                        handleHourInputChange(
                          "from",
                          day.value,
                          index,
                          e.target.value
                        )
                      }
                    >
                      {(inputProps: any) => (
                        <HourInput {...inputProps} error={fromError} />
                      )}
                    </InputMask>
                    até
                    <InputMask
                      mask="99:99"
                      value={time.to}
                      inputMode="numeric"
                      onChange={(e) =>
                        handleHourInputChange(
                          "to",
                          day.value,
                          index,
                          e.target.value
                        )
                      }
                    >
                      {(inputProps: any) => (
                        <HourInput {...inputProps} error={toError} />
                      )}
                    </InputMask>
                    <RemoveButton
                      onClick={() => handleRemoveTime(day.value, index)}
                      disabled={disabled}
                    >
                      X
                    </RemoveButton>
                  </OpeningHoursContainer>
                );
              })}
            </OpeningHoursList>
          )}
        </DayContainer>
      ))}
    </Container>
  );
};
