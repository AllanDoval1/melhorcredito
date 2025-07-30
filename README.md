# melhorcredito webhook

Este projeto disponibiliza um endpoint HTTP para receber mensagens de WhatsApp via Twilio.

## Setup

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Copie o arquivo `.env.example` para `.env` e informe o `TWILIO_AUTH_TOKEN` obtido no [Twilio Console](https://console.twilio.com/) em **Account Info**.

```bash
cp .env.example .env
# edite .env e defina TWILIO_AUTH_TOKEN
```

3. Inicie o servidor:

```bash
npm start
```

O servidor escutará na porta definida em `PORT` (padrão 3000).

## Teste local

Para expor o servidor local para a Twilio, é possível utilizar o [ngrok](https://ngrok.com/):

```bash
ngrok http 3000
```

Configure o webhook no Twilio usando a URL fornecida pelo ngrok seguida de `/whatsapp/webhook`.

### Enviando requisição de teste

```bash
curl -X POST \
  http://localhost:3000/whatsapp/webhook \
  -d "Body=teste" \
  -H "X-Twilio-Signature: <assinatura>"
```

A aplicação responderá com:

```xml
<Message>Mensagem Recebida</Message>
```
