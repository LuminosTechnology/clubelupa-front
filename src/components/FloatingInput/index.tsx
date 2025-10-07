import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Label,
  Input,
  InputContainer,
  EyeButton,
} from "./floating.style";
import { IonIcon } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";
import InputMask from "react-input-mask";

interface FloatingInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  isPassword?: boolean;
  error?: boolean;
  mask?: string;
  maxLength?: number;
  inputMode?:
    | "text"
    | "numeric"
    | "tel"
    | "url"
    | "email"
    | "decimal"
    | "search"
    | undefined;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  isPassword = false,
  error = false,
  mask,
  maxLength,
  inputMode,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAutofill = () => {
      if (inputRef.current) {
        const hasValue = inputRef.current.value.length > 0;
        if (hasValue) {
          setIsFocused(true);
        }
      }
    };

    checkAutofill();

    const timer = setTimeout(checkAutofill, 100);
    return () => clearTimeout(timer);
  }, []);

  const isActive = type === "date" || isFocused || (value && value.length > 0);

  useEffect(() => {
    if (value && value.length > 0) {
      setIsFocused(true);
    }
  }, [value]);

  return (
    <Container>
      <Label className={`${isActive ? "active" : ""} ${error ? "error" : ""}`}>
        {label}
      </Label>
      <InputContainer>
        {mask ? (
          <Input
            as={InputMask}
            mask={mask}
            type={type}
            maskChar={null}
            inputMode={inputMode}
            maxLength={maxLength}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange(e.target.value)
            }
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(value.length > 0)}
            className={error ? "error" : ""}
          />
        ) : (
          <Input
            ref={inputRef}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            maxLength={maxLength}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(value.length > 0)}
            className={error ? "error" : ""}
          />
        )}
        {isPassword && (
          <EyeButton
            fill="clear"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            <IonIcon
              icon={showPassword ? eyeOff : eye}
              style={{ color: "white", fontSize: "26px" }}
            />
          </EyeButton>
        )}
      </InputContainer>
    </Container>
  );
};

export default FloatingInput;
