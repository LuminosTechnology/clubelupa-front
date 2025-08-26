export const validateBirthDate = (value: string) => {
  const [dayStr, monthStr, yearStr] = value.split("/");
  const day = parseInt(dayStr);
  const month = parseInt(monthStr);
  const year = parseInt(yearStr);

  if (!day || !month || !year) return undefined;

  if (month < 1 || month > 12) return "Mês inválido";

  const maxDays = [
    31, // Jan
    year % 4 === 0 ? 29 : 28, // Fev
    31, // Mar
    30, // Abr
    31, // Mai
    30, // Jun
    31, // Jul
    31, // Ago
    30, // Set
    31, // Out
    30, // Nov
    31, // Dez
  ];

  if (day < 1 || day > maxDays[month - 1]) return "Dia inválido";

  return undefined;
};
