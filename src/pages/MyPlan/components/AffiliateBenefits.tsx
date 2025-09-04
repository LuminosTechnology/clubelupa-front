import { Title, BenefitsContainer, Benefit } from "../MyPlan.style";

export const AffiliateBenefits = () => {
  return (
    <>
      <Title>Seus benefícios de Afiliado</Title>
      <BenefitsContainer>
        <Benefit>
          Exibição da sua marca dentro do app, visível para todos os usuários;
        </Benefit>
        <Benefit>
          Check-in de clientes no seu estabelecimento, com registro automático;
        </Benefit>
        <Benefit>
          Escaneamento de notas fiscais de produtos comprados pelos seus
          clientes;
        </Benefit>
        <Benefit>
          Destaque da sua marca no mapa e no Instagram oficial do Clube.
        </Benefit>
        <Benefit>Todas as vantagens do Socio Premium</Benefit>
      </BenefitsContainer>
    </>
  );
};
