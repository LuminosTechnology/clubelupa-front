import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

interface TimeInfo {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
}

interface AlertInfo {
  number: number;
  message: string;
}

export const useSubscriptionAlert = () => {
  const { user } = useAuthContext();
  const [displayPaymentWarning, setDisplayPaymentWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [alertNumber, setAlertNumber] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [hasShownAlert, setHasShownAlert] = useState(false);

  // Função para calcular o tempo restante
  const calculateTimeRemaining = (subscriptionDate: Date): TimeInfo => {
    const now = new Date();
    const subscriptionTime = new Date(subscriptionDate);
    
    // Adiciona 7 dias (168 horas) à data de criação da assinatura
    const expirationTime = new Date(subscriptionTime.getTime() + (7 * 24 * 60 * 60 * 1000));
    
    const timeDiff = expirationTime.getTime() - now.getTime();
    
    if (timeDiff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalHours: 0
      };
    }
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    const totalHours = Math.floor(timeDiff / (1000 * 60 * 60));
    
    return { days, hours, minutes, seconds, totalHours };
  };

  // Função para determinar qual alerta mostrar
  const getAlertInfo = (totalHours: number): AlertInfo => {
    if (totalHours <= 0) {
      return {
        number: 7,
        message: "Sua assinatura gratuita expirou! Assine agora para continuar usando a Área do Afiliado."
      };
    }
    
    if (totalHours <= 24) {
      return {
        number: 7,
        message: `Restam ${totalHours}h para expirar sua assinatura gratuita!`
      };
    }
    
    if (totalHours <= 48) {
      return {
        number: 6,
        message: "Restam 6 dias para expirar sua assinatura gratuita!"
      };
    }
    
    if (totalHours <= 72) {
      return {
        number: 5,
        message: "Restam 5 dias para expirar sua assinatura gratuita!"
      };
    }
    
    if (totalHours <= 96) {
      return {
        number: 4,
        message: "Restam 4 dias para expirar sua assinatura gratuita!"
      };
    }
    
    if (totalHours <= 120) {
      return {
        number: 3,
        message: "Restam 3 dias para expirar sua assinatura gratuita!"
      };
    }
    
    if (totalHours <= 144) {
      return {
        number: 2,
        message: "Restam 2 dias para expirar sua assinatura gratuita!"
      };
    }
    
    return {
      number: 1,
      message: "Restam 7 dias para expirar sua assinatura gratuita!"
    };
  };

  // Função para verificar se deve mostrar o alerta
  const checkAndShowAlert = (forceShow = false) => {
    if (!user) return;

    const approvedStatus = user.establishments ? +user.establishments[0].approved_status : 1;

    if (user.is_affiliate && !user.is_payed && (approvedStatus === 2) && (forceShow || !hasShownAlert)) {
      // Pega a data de criação do usuário
      const subscriptionDate = user.created_at 
        ? new Date(String(user.created_at.default || user.created_at)) 
        : new Date();
      
      const timeInfo = calculateTimeRemaining(subscriptionDate);
      
      // Formata o tempo restante apenas no último dia (menos de 24 horas)
      let timeString = "";
      if (timeInfo.totalHours <= 24) {
        if (timeInfo.days > 0) {
          timeString = `${timeInfo.days}d ${timeInfo.hours}h ${timeInfo.minutes}m`;
        } else if (timeInfo.hours > 0) {
          timeString = `${timeInfo.hours}h ${timeInfo.minutes}m ${timeInfo.seconds}s`;
        } else if (timeInfo.minutes > 0) {
          timeString = `${timeInfo.minutes}m ${timeInfo.seconds}s`;
        } else {
          timeString = `${timeInfo.seconds}s`;
        }
      }
      
      setTimeRemaining(timeString);
      
      // Determina qual alerta mostrar
      const alertInfo = getAlertInfo(timeInfo.totalHours);
      setAlertNumber(alertInfo.number);
      setAlertMessage(alertInfo.message);
      
      // Mostra o alerta apenas se ainda há tempo restante
      if (timeInfo.totalHours > 0) {
        setDisplayPaymentWarning(true);
        if (!forceShow) {
          setHasShownAlert(true);
        }
      }
    }
  };

  const closeAlert = () => {
    setDisplayPaymentWarning(false);
  };

  return {
    displayPaymentWarning,
    setDisplayPaymentWarning,
    timeRemaining,
    alertNumber,
    alertMessage,
    checkAndShowAlert,
    closeAlert
  };
};
