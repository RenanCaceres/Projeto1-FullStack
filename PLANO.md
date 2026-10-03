# Plano de desenvolvimento

Divisão das tarefas restantes do Projeto 1 (Casas de Hogwarts) entre os integrantes.

## Divisão

| Integrante | Tarefas | Proporção |
|---|---|---|
| Pedro Lucas (peluca2007) | 1 a 8 | 80% |
| Renan Cáceres (RenanCaceres) | 9 e 10 | 20% |

**Por que essa divisão?** O Renan já fez a base do projeto antes deste plano: configuração do Vite, consumo da Wizard World API, a listagem das casas e a primeira versão do quiz. Por isso, das tarefas que faltam, a maior parte fica com o Pedro e o Renan fica com tarefas menores e independentes.

## Requisitos do enunciado

| Requisito | Onde é atendido |
|---|---|
| API JSON aberta | Wizard World API (`src/services/hogwartsService.js`) |
| Hook / funcionalidade do React | `useReducer` (tarefa 1), `useMemo` e `memo` (tarefa 2) |
| Biblioteca externa | `styled-components` (tarefa 3) |
| Documentar uso de ferramentas de apoio (IA) | README (tarefa 10) |
| Cada integrante com parte bem definida | Este plano |

---

## Como trabalhar sem conflito de merge

Cada tarefa lista os **arquivos** que ela mexe. As tarefas do Pedro e do Renan **não compartilham nenhum arquivo**, então os dois podem trabalhar ao mesmo tempo.

### Jeito certo: uma branch por tarefa

```bash
git switch main
git pull                              # sempre começar atualizado
git switch -c feat/nome-da-tarefa     # cria a branch da tarefa

# ... faz a tarefa ...

git add <arquivos da tarefa>          # só os arquivos listados na tarefa
git commit -m "mensagem da tarefa"
git push -u origin feat/nome-da-tarefa
```

Depois, abra um **Pull Request** no GitHub e faça o merge na `main`. Por fim, volte para a `main` e atualize:

```bash
git switch main
git pull
```

### Jeito simples: direto na main

Se não quiser usar branch, dá para trabalhar direto na `main`, desde que você siga três regras:

1. **Mexa apenas nos arquivos associados à sua tarefa.**
2. Rode `git pull` **antes** de começar e **antes** de dar push.
3. Use `git add <arquivo>`, nunca `git add .`, para não commitar arquivo de outra tarefa sem querer.

### Cuidados

- O `package.json` e o `package-lock.json` **são só do Pedro**, porque a tarefa 3 instala o styled-components. O Renan não deve commitar esses arquivos. Se o `npm install` alterar o `package-lock.json`, descarte com `git checkout package-lock.json`.
- Se mesmo assim der conflito, **não force o push** (`git push --force`). Rode `git pull --rebase`, resolva os arquivos marcados e continue com `git rebase --continue`.

---

## Tarefas do Pedro (80%)

As tarefas estão em ordem e devem ser feitas uma depois da outra, porque algumas mexem nos mesmos arquivos.

### ✅ Tarefa 1: Estado do quiz com `useReducer`
- **Arquivos:** `src/components/Quiz.jsx`
- **O que fazer:** trocar os `useState` de pergunta atual e pontuação por um `useReducer` com as ações `RESPONDER` e `REINICIAR`.
- **Commit:** `refactor: gerencia estado do quiz com useReducer`

### ✅ Tarefa 2: `useMemo` e `memo`
- **Arquivos:** `src/components/Quiz.jsx`, `src/components/Casa.jsx`
- **O que fazer:** calcular a casa vencedora com `useMemo` e envolver o componente `Casa` com `memo`.
- **Commit:** `perf: memoriza resultado do quiz e cards das casas`

### Tarefa 3: Tema com styled-components
- **Arquivos:** `package.json`, `package-lock.json`, `src/main.jsx`, `src/App.jsx`, `src/styles/tema.js` (novo), `src/styles/Global.js` (novo), `src/index.css` (apagar), `src/App.css` (apagar)
- **O que fazer:**
  - Instalar com `npm i styled-components`.
  - Criar um tema com as cores e a fonte do projeto, por exemplo a fonte *Cinzel* do Google Fonts e um fundo escuro.
  - Aplicar o tema com `ThemeProvider` e estilos globais com `createGlobalStyle`.
  - Remover o CSS que veio do template do Vite.
- **Commit:** `feat: adiciona styled-components e tema visual do projeto`

### Tarefa 4: Carregamento e erro da API
- **Arquivos:** `src/App.jsx`, `src/services/hogwartsService.js`
- **O que fazer:**
  - Adicionar os estados `carregando` e `erro`.
  - Mostrar "Carregando casas..." enquanto a API responde e uma mensagem amigável com botão "Tentar de novo" se ela falhar.
  - Só mostrar o quiz depois que as casas carregarem.
- **Commit:** `fix: trata carregamento e erro ao buscar as casas`

### Tarefa 5: Cards completos das casas
- **Arquivos:** `src/components/Casa.jsx`, `src/App.jsx`
- **O que fazer:**
  - Transformar cada casa em um card estilizado com nome, fundador, animal, elemento, fantasma e salão comunal. Todos esses dados já vêm da API.
  - Usar as cores da casa (`houseColours`) na borda ou no fundo.
  - Mostrar os cards em grid e garantir que fique bom no celular.
- **Commit:** `feat: exibe cards completos das casas com suas cores`

### Tarefa 6: Progresso e embaralhamento do quiz
- **Arquivos:** `src/components/Quiz.jsx`, `src/utils/embaralhar.js` (novo)
- **O que fazer:**
  - Mostrar "Pergunta X de N" e uma barra de progresso.
  - Embaralhar as opções de cada pergunta.
  - Definir uma regra de desempate, por exemplo sortear entre as casas empatadas.
  - Usar `perguntas.length` para que o quiz funcione com qualquer quantidade de perguntas, já que elas são adicionadas na tarefa 9.
- **Commit:** `feat: adiciona progresso, embaralhamento e desempate no quiz`

### Tarefa 7: Tela de resultado
- **Arquivos:** `src/components/Resultado.jsx` (novo), `src/components/Quiz.jsx`
- **O que fazer:**
  - Mover a tela final do quiz para um componente próprio.
  - Destacar a casa vencedora com as cores dela e mostrar o placar de todas as casas.
  - Estilizar o botão "Refazer".
- **Commit:** `feat: cria tela de resultado do quiz`

### Tarefa 8: Banner e ajustes da página
- **Arquivos:** `src/assets/casasHeader.png` (substituir por `.webp`), `src/App.jsx`, `index.html`
- **O que fazer:**
  - Converter o banner para `.webp` com menos de 200 KB, já que hoje ele tem 2 MB, e exibir no topo. Se ele não for usado, apagar.
  - Adicionar no `index.html` a meta description e um favicon com tema de Hogwarts.
- **Commit:** `style: adiciona banner otimizado e ajusta metadados da página`

---

## Tarefas do Renan (20%)

As duas tarefas são independentes das do Pedro e podem ser feitas a qualquer momento. A tarefa 10 fica melhor por último, quando o projeto estiver pronto.

### Tarefa 9: Mais perguntas no quiz
- **Arquivos:** `src/data/perguntas.js` (somente este)
- **O que fazer:**
  - Aumentar o quiz de 2 para pelo menos 8 perguntas.
  - Manter o mesmo formato: cada pergunta tem um `texto` e quatro `opcoes`, cada uma com `texto` e `casa`. A `casa` deve ser exatamente `Gryffindor`, `Hufflepuff`, `Ravenclaw` ou `Slytherin`.
  - Distribuir as casas de forma equilibrada entre as opções.
- **Commit:** `feat: amplia o quiz para 8 perguntas`

### Tarefa 10: README e deploy
- **Arquivos:** `README.md` (somente este)
- **O que fazer:**
  - Publicar o projeto na Vercel: importar o repositório, o preset do Vite é detectado sozinho.
  - Escrever no README:
    - link do repositório e do site publicado;
    - nomes dos integrantes e o que cada um fez (pode referenciar este plano);
    - hook / funcionalidade do React usada: `useReducer`, `useMemo` e `memo`;
    - API utilizada: Wizard World API;
    - biblioteca externa: styled-components;
    - seção **Ferramentas de apoio**, documentando o uso de IA e para quê ela foi usada, conforme o enunciado exige;
    - como rodar o projeto e um print da tela.
- **Commit:** `docs: completa README com informações do projeto e deploy`
