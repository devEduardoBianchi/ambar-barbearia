# SDD ledger — plan: docs/superpowers/plans/2026-11-05-dom-liborio-acabamento.md

## Preparação

Especificação e plano aprovados. Execução direta, seguida de revisão independente. Skills de processo já lidas nesta conversa: executing-plans, using-git-worktrees, test-driven-development, systematic-debugging, requesting-code-review e verification-before-completion. Skill interaction-design lida para esta atualização.

Pre-flight: Task 1 disponibiliza /interactions.js e /assets/caio-atendimento.png; Task 2 usa esses mesmos caminhos. Os IDs preservados e novos coincidem com o plano. Nenhum conflito de interface.

Ruling: manter arquivos e registro na pasta existente, sem criar Git ou worktree — o projeto foi entregue sem repositório e o plano aprovado condiciona commits à existência de Git — não haverá histórico de commits desta execução.

Ruling: registrar etapas diretamente neste documento — os auxiliares Bash dependem de um ambiente indisponível na execução anterior — os registros equivalentes são mantidos por edição nativa.

Task 1: em andamento. Estender teste HTTP antes da lista de arquivos públicos.

TDD: o teste estendido falhou com 404 em /assets/caio-atendimento.png antes da mudança no servidor. Depois de acrescentar os dois caminhos públicos, passou 1/1. A proteção dos demais arquivos, inclusive um vizinho privado em assets, permaneceu coberta.

Foto copiada sem edição, dimensões PNG 971 × 1157. Tabela transcrita com seis serviços; avaliações, resumo datado, endereço e horários inseridos conforme especificação. Os controles capturados do Instagram ficam fora do enquadramento CSS previsto.

Task 2: iniciada junto ao acabamento visual para permitir uma conferência completa no navegador. Ruling: validar ambas as tarefas em uma sessão visual — compartilham o mesmo documento e CSS — a conclusão individual permanece condicionada às checagens previstas.

Ruling: prévia da atualização na porta 4176 — a porta 4175 está ocupada — usar a URL nova para esta revisão; comando de porta opcional documentado.

Browser: foto carregou com naturalWidth 971; seis preços conferidos; IDs internos válidos; destinos externos com noopener noreferrer; skip link recebe foco visível e Enter move foco para #conteudo. Medidas CSS 1440 × 900 e 360 × 800 sem transbordamento; nenhum elemento de conteúdo excede a largura móvel. Revelação observada na abertura e nas três avaliações, duração computada 0,45 s.

Task 1: complete (teste HTTP RED 404 → GREEN 1/1; foto, preços, avaliações e dados de visita conferidos no navegador).

Task 2: movimento e README implementados; revisão independente e verificação final pendentes. A lógica de redução de movimento e a ausência de ocultação inicial foram inspecionadas no código. Simulação de preferência do sistema ou desativação de JavaScript não está disponível na interface de navegador documentada; não alegar esses cenários como executados.

## Revisão e correção

Revisor independente encontrou repetição da revelação após foco por teclado: :focus-within desativava a animação, mas a classe persistia e a animação voltava ao sair o foco. Reclassificado como importante pelo efeito na acessibilidade e pela exigência de revelação única.

RED no navegador: foco na chamada da abertura produziu animationName none; ao passar Tab para o próximo link, o mesmo elemento voltou a animationName reveal-section. Correção: remover a classe ao terminar ou cancelar a animação e não iniciar revelação num elemento que já contém foco. Elementos continuam desobservados após a primeira entrada.

GREEN no navegador: a mesma sequência de teclado manteve animationName none após a saída do foco e a classe de animação estava ausente. Falha corrigida na única rodada de correção. Nenhum achado menor adiado.

Revisão independente: gpt-6-astra, contexto novo, somente leitura. Sem defeitos críticos; o achado de foco descrito acima foi corrigido e verificado. Limites reconhecidos: dados externos representam a consulta datada; ausência de JavaScript e mudança real de preferência do sistema foram avaliadas no código, sem simulação da configuração do navegador.

Verificação final: sintaxe de interactions.js e tools/serve.mjs válida; teste HTTP passou 1/1, zero falhas; página, script e fotografia da prévia responderam 200 com MIME correto. Tamanhos CSS 1440 × 900 e 360 × 800 conferidos sem transbordamento; valores alinhados na tabela móvel; preferência de tamanho do navegador restaurada. Evidências em .superpowers/evidence/acabamento/.

Task 2: complete. Página deixada disponível em http://localhost:4176/. Sem publicação ou envio de mensagens. Sem repositório Git; finalização de branch e commits não se aplicam.
