# Integração de Gamificação

## Visão Geral

A gamificação foi implementada através de um interceptor automático que captura `transaction_id` de todas as respostas da API e verifica automaticamente se há recompensas disponíveis.

## Como Funciona

### 1. Interceptor Condicional
- O interceptor em `src/config/api.ts` só processa gamificação para endpoints específicos
- Lista de endpoints que geram gamificação: `/checkin`, `/purchases/scan`, `/user/checkin`, etc.
- Quando um `transaction_id` é encontrado em um endpoint relevante, o sistema automaticamente chama o endpoint `api/v1/user/gamification-results/{transaction_id}`
- O sistema aguarda o status ser "completed" antes de processar as recompensas

### 2. Estados do Gamification Result
- `pending`: Aguardando processamento
- `processing`: Em processamento
- `completed`: Processamento concluído com sucesso
- `failed`: Falha no processamento

### 3. Tipos de Recompensas
- **Pontos**: `points_earned`
- **Moedas**: `coins_earned`
- **Medalhas**: `medals_earned[]`
- **Subida de Nível**: `level_up_info`

## Uso nos Componentes

### Acessando Recompensas no Contexto

```tsx
import { useGamificationContext } from '../contexts/GamificationContext';

function MyComponent() {
  const { latestReward, clearLatestReward } = useGamificationContext();

  useEffect(() => {
    if (latestReward) {
      console.log('Nova recompensa:', latestReward);
      
      if (latestReward.hasLevelUp) {
        console.log('Usuário subiu de nível!');
      }
      
      if (latestReward.hasNewMedals) {
        console.log('Novas medalhas:', latestReward.rewards.medals_earned);
      }
    }
  }, [latestReward]);

  return <div>Meu componente</div>;
}
```

### Notificação Automática

O componente `GamificationNotification` já está integrado no App e mostra automaticamente as recompensas quando elas são recebidas.

## Configuração

### Polling
- **Intervalo**: 2 segundos
- **Máximo de tentativas**: 30 (1 minuto)
- **Timeout**: Cancelamento automático após 1 minuto

### Endpoints que Geram Gamificação
```typescript
const GAMIFICATION_ENDPOINTS = [
  '/checkin',
  '/purchases/scan', 
  '/user/checkin',
  '/establishments/checkin',
  '/affiliate/checkin',
  '/scan',
  '/purchase'
];
```

### Response Body Esperado
O interceptor procura por `transaction_id` no corpo da resposta apenas para endpoints específicos:
```json
{
  "data": { ... },
  "transaction_id": "9872e892-091b-4f1d-be58-3aa7f6c029de"
}
```

## Exemplo de Resposta da API

```json
{
  "status": "completed",
  "rewards": {
    "coins_earned": 1,
    "level_up_info": null,
    "medals_earned": [
      {
        "id": 2,
        "name": "Explorador Curitibano",
        "type": "medal",
        "icon_url": "https://clube-lupa.s3.sa-east-1.amazonaws.com/13/Medalha-Explorac%CC%A7a%CC%83o.png"
      }
    ],
    "points_earned": 30
  }
}
```

## Eventos Customizados

O sistema emite eventos customizados que podem ser escutados:

```javascript
window.addEventListener('gamification-rewards', (event) => {
  const rewardData = event.detail;
  console.log('Recompensas recebidas:', rewardData);
});
```

## Troubleshooting

### Verificar se o transaction_id está sendo enviado
```javascript
// No console do navegador, procure por:
// "🎮 Gamification endpoint detected: [url]"
// "Transaction ID found: [id]"
```

### Verificar status do polling
```javascript
// Os logs aparecem no console quando o polling está ativo
// Procure por: "Gamification status for transaction..."
```

### Verificar se as recompensas estão sendo processadas
```javascript
// Verifique se o evento está sendo disparado
window.addEventListener('gamification-rewards', (event) => {
  console.log('Evento recebido:', event.detail);
});
```
