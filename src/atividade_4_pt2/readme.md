# Sistema bancário

Este projeto implementa um sistema bancário simples em TypeScript, utilizando os conceitos de Programação Orientada a Objetos (classes, objetos, associações e encapsulamento). A aplicação funciona via terminal, com menu interativo utilizando a biblioteca `prompt-sync`.

## Funcionalidades

### Básicas
Operações previstas na classe `Banco`:

- Inserir conta;
- Consultar conta;
- Atualizar dados de conta;
- Sacar;
- Depositar;
- Transferir;
- Excluir conta;
- Inserir cliente;
- Consultar cliente;
- Associar cliente a uma conta;
- Excluir cliente.

### Adicionais
Funcionalidades complementares implementadas na classe `Banco`:

- **Transferência em lote:** recebe um array de contas de destino, um valor e realiza transferências para cada uma delas (ordem bancária);
- **Quantidade de contas:** retorna o total de contas cadastradas;
- **Total depositado:** retorna a soma dos saldos de todas as contas;
- **Média de saldo:** calcula a média dos saldos utilizando os dois métodos anteriores;
- **Mudança de titularidade:** permite alterar o cliente titular de uma conta;
- **Exclusão de cliente:** o cliente é removido, mas suas contas permanecem no sistema sem titular, podendo ser associadas posteriormente a outro cliente;
- **Exclusão de conta:** apenas a conta é removida; o cliente continua cadastrado no sistema;
- **Listagem de contas sem cliente:** lista as contas sem titular e permite, em seguida, atribuir a titularidade a um cliente.

## Estrutura

**`banco.ts`:** contém as classes `Banco`, `Conta`, `Cliente`, entre outras. Além da lógica de negócio do sistema.

**`app.ts`:** contém a classe `App`, responsável pela interação com o usuário.

---
 Desenvolvido por Pablo Pereira 🧑‍💻 