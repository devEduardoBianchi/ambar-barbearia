# Dom Libório — Conteúdo real e movimento discreto

## Objetivo e direção escolhida

Atualizar a landing page existente mantendo a composição moderna preta e dourada já aprovada. O usuário escolheu animações discretas e elegantes, forneceu duas imagens do Instagram da empresa e indicou o perfil correto no Google Maps para avaliações.

## Conteúdo fornecido pelo usuário

- Substituir a fotografia ilustrativa da abertura pela imagem real do barbeiro em atendimento. Usar a foto fornecida, com enquadramento responsivo; não criar uma galeria com apenas uma fotografia.
- Transcrever a tabela de preços em texto acessível: corte social R$ 30; corte degradê R$ 35; barba R$ 25; sobrancelha R$ 5; corte social e barba R$ 55; corte degradê e barba R$ 60.
- Identificar os valores como provenientes da tabela fornecida e orientar confirmação no agendamento, sem afirmar que foram verificados com o proprietário hoje.
- A imagem da tabela é referência de conteúdo, não deve virar uma imagem de texto obrigatória para ler os preços. Manter nome tipográfico no cabeçalho; não extrair ou redesenhar logotipo a partir do cartaz.

## Google Maps consultado em 05/11/2026

Fonte indicada pelo usuário: https://www.google.com/maps/place/Barbearia+Dom+Lib%C3%B3rio/@-22.2328735,-54.8129979,17z/data=!4m17!1m10!3m9!1s0x9489a91741d24837:0xbca8528c11f92c43!2sBarbearia+Dom+Lib%C3%B3rio!8m2!3d-22.2329678!4d-54.8129847!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11sw4bv8_v!3m5!1s0x9489a91741d24837:0xbca8528c11f92c43!8m2!3d-22.2329678!4d-54.8129847!16s%2Fg%2F11sw4bv8_v

- Perfil: Barbearia Dom Libório.
- Nota observada: 5,0 de 5, com 124 avaliações. Apresentar como consulta datada, sem simular atualização automática.
- Endereço: R. Cuiabá, 1728 — Centro, Dourados–MS, 79830-220.
- Segunda a sexta: 09h–11h e 13h–18h30.
- Sábado: 09h–11h e 13h–18h.
- Domingo: fechado.
- O link de WhatsApp do perfil é o mesmo já usado no site: https://wa.link/bmboc0.

## Avaliações

Inserir uma seção estática antes do agendamento com resumo da nota, três trechos curtos de avaliações verificadas, nome público de cada autor, nota de cinco estrelas e indicação clara de que são trechos selecionados. Os links apontam para o perfil de origem para consulta integral. Não apresentar avatares falsos nem afirmar que os trechos são o texto completo.

Trechos observados, total de 21 palavras citadas:

- TIAGO LIBORIO DE ALENCAR: “Atendimento top, localização excelente, ambiente agradável”.
- Fernando Morais: “Melhor barbearia da região.”
- Sheriff Dom Falcone do Texas!: “ambiente top, atendimento nota mil, corte no capricho”.

As três avaliações apareciam como publicadas duas semanas antes da consulta. Não transformar a data relativa em uma data exata inventada. Usar a data da consulta para o bloco.

## Movimento e abordagem técnica

Recomendação do agente: CSS e JavaScript nativos, aproveitando os componentes semânticos existentes. É a abordagem proporcional para aparições suaves e respostas de botões nesta página estática; uma biblioteca de animação não acrescenta uma necessidade funcional neste escopo.

- Entrada suave dos elementos da abertura e revelação única das seções ao entrar na tela, com deslocamento pequeno (até 16 px), opacidade e duração aproximada de 450 ms.
- Respostas de botões em aproximadamente 180–220 ms; sem cursores personalizados, parallax ou rolagem controlada.
- Respeitar `prefers-reduced-motion`, mudanças de preferência durante a sessão e ausência de JavaScript. Conteúdo e links permanecem acessíveis sem animações.
- Sem carrossel automático, widget externo de avaliações ou chave de API. As avaliações são uma fotografia datada da consulta e precisam de manutenção manual.

## Arquivos e aceite

Atualizar `index.html`, `styles.css`, servidor local e README; adicionar arquivo de interações e a fotografia em pasta de imagens do projeto. O servidor deve permitir os novos recursos explicitamente e continuar bloqueando documentos e arquivos internos.

Aceite: preços transcritos corretamente; foto real carregada; atribuição e origem das avaliações; endereço e horários coerentes com a consulta; navegação por teclado e layout em celular preservados; animações suaves com redução de movimento e conteúdo sem JavaScript; links de WhatsApp e Maps funcionais. Validar no navegador e revisar as alterações relevantes do servidor. Entrega continua local, sem publicação.

## Fora do escopo

Galeria com fotos não fornecidas, atualização automática das avaliações, cadastro, reserva interna, envio de mensagens, extração automática contínua do Google e contratação de serviços.
