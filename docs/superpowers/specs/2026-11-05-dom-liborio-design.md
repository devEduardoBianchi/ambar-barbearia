# Dom Libório — Desenho da landing page

## Intenção

Criar uma landing page para a barbearia real Dom Libório, em Dourados–MS, que apresente a marca e leve visitantes ao agendamento pelo WhatsApp. O projeto também serve para experimentar as skills Superpowers nas etapas pertinentes.

## Decisões confirmadas pelo usuário

- Agendamento pelo WhatsApp como objetivo principal.
- Usar a identidade da loja, em vez de criar uma barbearia fictícia.
- Visual moderno, preservando preto e dourado.
- Direção visual da prévia aprovada: fotografia ampla, tipografia condensada, composição limpa e botão de agendamento destacado.
- Prévia de referência: `.superpowers/brainstorm/dom-liborio/content/direcao-moderna.html`.

## Informações verificadas

No perfil público https://www.instagram.com/dom_liborio/ foram observados:

- Nome da marca: Dom Libório.
- Cidade: Dourados–MS.
- Atividade desde 2021.
- Caio Magalhães como barbeiro e proprietário, associado ao perfil @caio_mfl.
- Slogan: “Estilo e sofisticação em cada corte”.
- Agendamento: https://wa.link/bmboc0.
- Marca gráfica predominantemente preta e dourada.

O perfil pessoal de Caio é privado. Não há endereço exato, horários, preços ou depoimentos verificados disponíveis neste levantamento.

## Abordagens

Foram apresentadas as direções clássica e moderna. O usuário escolheu moderna, preservando preto e dourado, e aprovou a prévia correspondente.

Para a implementação, recomenda-se HTML, CSS e JavaScript, sem framework e sem dependências de execução. A página é editorial, com navegação interna e links externos; essa abordagem reduz manutenção e permite hospedagem estática. React foi considerado, mas acrescentaria dependências sem necessidade funcional neste escopo. A escolha técnica é proposta do agente, sujeita à aprovação deste documento; não foi exigência do usuário.

## Estrutura e comportamento

1. Cabeçalho com nome tipográfico da marca, navegação interna e chamada de agendamento.
2. Abertura com “Seu estilo. Nosso ofício.”, slogan verificado, menção a Dourados e fotografia ampla. A chamada principal abre o WhatsApp diretamente.
3. Faixa editorial curta com referências à marca e à cidade.
4. Serviços: espaço para corte, barba e corte com barba. São categorias propostas, ainda não verificadas. Até confirmação, identificá-las de forma discreta como sugestões a consultar, sem prometer disponibilidade, preços ou duração. Não fazer a conclusão depender dessa confirmação.
5. Apresentação da barbearia e de Caio, limitada aos fatos verificados.
6. Encerramento com chamada de WhatsApp e consulta de horários, serviços e localização.
7. Rodapé com Instagram e cidade.

Todos os botões de agendamento levam a https://wa.link/bmboc0, sem envio automático de mensagem. Links externos abrem em nova aba com proteção adequada. A navegação leva às seções da mesma página. Não existe formulário de reserva, calendário, pagamento, cadastro ou servidor de dados.

## Direção visual

Fundo preto com leve tom quente, dourado fosco como destaque, texto claro e texto secundário legível. Fontes condensadas nos títulos e fonte simples nos textos, com alternativas locais se o carregamento externo falhar. Bordas discretas, espaços amplos e ausência de ornamentos clássicos pesados.

Em telas grandes, abertura dividida entre texto e foto. Em celular, texto seguido de foto, sem corte de conteúdo ou rolagem horizontal. Navegação compacta por links acessíveis, sem exigir menu complexo. Movimento discreto apenas se ajudar; respeitar a preferência por movimento reduzido.

## Imagens e honestidade editorial

A foto da prévia é ilustrativa, não representa a loja. A primeira versão deve informar isso junto à imagem. Não atribuir ao estabelecimento imagens de outro local, avaliações inventadas, números de clientes ou resultados não comprovados. O nome pode ser renderizado em texto; não apresentar uma recriação como logotipo oficial. Fotos reais e logotipo fornecidos posteriormente poderão substituir os elementos ilustrativos.

## Escopo de entrega e limites

Entregar arquivos da página no diretório atual e uma prévia local utilizável. Não publicar, contratar hospedagem ou configurar domínio. Não enviar mensagens ao proprietário. Não inventar endereço ou mapa. Não criar dependência de acesso ao Instagram para a página funcionar.

O diretório não contém projeto anterior nem repositório Git. O agente pode iniciar controle de versão local para registrar especificação, plano e entrega, sem conexão remota. A pasta `.superpowers/` permanece ignorada.

## Critérios de aceite

- Identidade e composição correspondem à direção visual aprovada.
- Conteúdo em português do Brasil, cidade e fatos verificados corretos.
- Chamadas principais abrem o WhatsApp correto; Instagram aponta para a loja.
- Layout legível em celular e computador, sem transbordamento horizontal.
- Navegação por teclado, foco visível, estrutura semântica, contraste legível e texto alternativo nas imagens.
- Informações não verificadas não aparecem como fatos.
- Verificação de carregamento, navegação interna, destinos dos links e apresentação nos dois tamanhos de tela.
- Nenhuma funcionalidade de reserva ou confirmação de horário é simulada.

## Decisões deixadas ao implementador

Organização dos arquivos, medidas exatas, detalhes responsivos, política de carregamento de fontes e imagens, pequenas transições e ferramentas locais de verificação. Manter a composição aprovada e evitar ferramentas desnecessárias. Aplicar as skills Superpowers conforme sua finalidade, sem forçar etapas irrelevantes.
