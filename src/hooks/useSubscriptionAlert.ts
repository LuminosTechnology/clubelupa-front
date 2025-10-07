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

  // Reset hasShownAlert quando o usuário muda (login/logout)
  useEffect(() => {
    setHasShownAlert(false);
  }, [user?.id]);

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
  const getAlertInfo = (timeInfo: TimeInfo): AlertInfo => {
    const totalHours = timeInfo.totalHours;
    if (totalHours <= 0) {
      return {
        number: 7,
        message: "Seu tempo para oficializar e concluir o cadastrou expirou!"
      };
    }
    
    if (totalHours <= 24) {
      return {
        number: 7,
        message: totalHours === 24 
          ? "Restam 23h 59m 59s para expirar sua assinatura gratuita!"
          : `${totalHours === 1 ? "Resta" : "Restam"} ${timeInfo.hours}h ${timeInfo.minutes}m para expirar sua assinatura gratuita!`
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

     const approvedStatus = user.establishments && user.establishments.length > 0 
                            ? +user.establishments[0].approved_status 
                            : 1;

    if (user.is_affiliate && !user.is_payed && (approvedStatus === 2) && (forceShow || !hasShownAlert)) {
      // Para testar diferentes cenários, descomente uma das linhas abaixo:
      
      // Teste 1: Expirou hoje (0 horas restantes)
      // const subscriptionDate = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
      
      // Teste 2: Expira em 1 hora
      // const subscriptionDate = new Date(Date.now() - (6 * 24 * 60 * 60 * 1000) - (23 * 60 * 60 * 1000));

      // Teste 3: Expira em 3 horas
      // const subscriptionDate = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000) + (3 * 60 * 60 * 1000));
      
      // Teste: Expira em 20h45min (20.75 horas)
      // const subscriptionDate = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000) + (20 * 60 * 60 * 1000) + (45 * 60 * 1000));
      
      // Teste 3: Expira em 1 dia
      // const subscriptionDate = new Date(Date.now() - (6 * 24 * 60 * 60 * 1000));
      
      // Teste 4: Expira em 3 dias
      // const subscriptionDate = new Date(Date.now() - (4 * 24 * 60 * 60 * 1000));
      
      // Teste 5: Expira em 6 dias
      // const subscriptionDate = new Date(Date.now() - (1 * 24 * 60 * 60 * 1000));
      
      // Data real do usuário
       const subscriptionDate = new Date(String(user.establishments?.[0].approved_status_date?.default)) 
      
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
      
      // Se restar exatamente 1 dia (24 horas), mostra como 23h 59m 59s
      if (timeInfo.totalHours === 24) {
        timeString = "23h 59m 59s";
      }
      
      setTimeRemaining(timeString);
      
      // Determina qual alerta mostrar
      const alertInfo = getAlertInfo(timeInfo);
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
