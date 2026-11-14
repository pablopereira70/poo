### Este `readme` responde aos questionamentos da lista de exercícios de typescript

### Questionamentos da parte 1

[Ver código da parte 1](./questao_pt1.ts)

#### Você concorda que o banco faz o cadastro de duas entidades e ainda faz regras de negócios?

```markdown
Não, pois polui a classe banco com validações necessárias mas que estão no "lugar errado".
```

#### Não seria adequado o banco ter uma class CadastroDeClientes e CadastroDeContas e algumas regras de validação serem feitas no banco e deixar os métodos de consulta e inclusão os mais simples possíveis?

```markdown
Sim, incluir classes de cadastro abstraem as validações a serem feitas e deixam a classe Banco mais simples
```

#### O método associar cliente a uma conta deveria estar em que classe? Banco, CadastroDeContas ou CadastroDeClientes?

```markdown
O método deveria ficar em `CadastroDeContas`, pois ele consulta a conta, valida o cliente associado e mantém a relação conta-cliente. 
```

