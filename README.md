# ShareBite

Website responsivo para compartilhar excedentes, encontrar itens no bairro e acompanhar o impacto comunitário. A interface usa o verde `#91BD42` extraído das imagens de referência.

## Abrir o site

Abra `index.html` no navegador. Não é necessário instalar Node, Flutter ou dependências.

Se preferir usar um servidor local, execute na pasta do projeto:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000`. A localização funciona em localhost ou HTTPS, após a permissão do navegador.

## Funcionalidades demonstrativas

- Busca, filtros, itens salvos e detalhes dos anúncios.
- Publicação de itens com descrição, categoria, modalidade e localização.
- Perfil com dados da conta, anúncios ativos e histórico por modalidade.
- Mapa ilustrativo, solicitação de localização, conversas e mensagens locais.
- Painel de impacto, comércios parceiros e ONGs.
- Fluxo demonstrativo de acesso e cadastro.

Os dados ficam na memória e são reiniciados ao recarregar a página. Autenticação segura, persistência, chat entre dispositivos, geocodificação e métricas verificadas precisam de backend. Fotos, fontes e ícones são carregados de serviços externos e precisam de conexão à internet.