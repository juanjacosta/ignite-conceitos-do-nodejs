## Primeiro desafio: Conceitos do Node.js

### Requisitos

- [x] POST /users
      A rota deve receber name, e username dentro do corpo da requisição. Ao cadastrar um novo usuário, ele deve ser armazenado dentro de um objeto no seguinte formato:

  {
  id: 'uuid', // precisa ser um uuid
  name: 'Danilo Vieira',
  username: 'danilo',
  todos: []
  }

  Certifique-se que o ID seja um UUID, e de sempre iniciar a lista todos como um array vazio.
  O objeto do usuário deve ser retornado na resposta da requisição.

- [x] GET /todos

  A rota deve receber, pelo header da requisição, uma propriedade username contendo o username do usuário e retornar uma lista com todas as tarefas desse usuário.

- [x] POST /todos

  A rota deve receber title e deadline dentro do corpo da requisição e, uma propriedade username contendo o username do usuário dentro do header da requisição. Ao criar um novo todo, ele deve ser armazenada dentro da lista todos do usuário que está criando essa tarefa. Cada tarefa deverá estar no seguinte formato: . Certifique-se que o ID seja um UUID.

  {
  id: 'uuid', // precisa ser um uuid
  title: 'Nome da tarefa',
  done: false,
  deadline: '2021-02-27T00:00:00.000Z',
  created_at: '2021-02-22T00:00:00.000Z'
  }

  **Observação**: Lembre-se de iniciar a propriedade `done` sempre como `false` ao criar um _todo_.

  **Dica**: Ao fazer a requisição com o Insomnia ou Postman, preencha a data de `deadline` com o formato `ANO-MÊS-DIA` e ao salvar a tarefa pela rota, faça da seguinte forma:

  {
  id: 'uuid', // precisa ser um uuid
  title: 'Nome da tarefa',
  done: false,
  deadline: new Date(deadline),
  created_at: new Date()
  }

  Usar new Date(deadline) irá realizar a transformação da string "ANO-MÊS-DIA" (por exemplo "2021-02-25") para uma data válida do JavaScript.
  O objeto do todo deve ser retornado na resposta da requisição.

- [ ] PUT /todos/:id

  A rota deve receber, pelo header da requisição, uma propriedade username contendo o username do usuário e receber as propriedades title e deadline dentro do corpo. É preciso alterar apenas o title e o deadline da tarefa que possua o id igual ao id presente nos parâmetros da rota.

- [ ] PATCH /todos/:id/done

  A rota deve receber, pelo header da requisição, uma propriedade username contendo o username do usuário e alterar a propriedade done para true no todo que possuir um id igual ao id presente nos parâmetros da rota.

- [ ] DELETE /todos/:id

  A rota deve receber, pelo header da requisição, uma propriedade username contendo o username do usuário e excluir o todo que possuir um id igual ao id presente nos parâmetros da rota.

### Específicação dos testes

Em cada teste, tem uma breve descrição no que sua aplicação deve cumprir para que o teste passe.

Caso você tenha dúvidas quanto ao que são os testes, e como interpretá-los, dê uma olhada em nosso FAQ (https://www.notion.so/FAQ-Desafios-ddd8fcdf2339436a816a0d9e45767664)

Para esse desafio, temos os seguintes testes:

### Testes de usuários

- **Should be able to create a new user**

  Para que esse teste passe, você deve permitir que um usuário seja criado e retorne um JSON com o usuário criado.

  Também é necessário que você retorne a resposta com o código 201.

- **Should not be able to create a new user when username already exists**

  Para que esse teste passe, antes de criar um usuário você deve validar se outro usuário com o mesmo username já existe. Caso exista, retorne uma resposta com status 400 e um json no seguinte formato:

  {
  error: 'Mensagem do erro'
  }

  A mensagem pode ser de sua escolha, desde que a propriedade seja error.

### Testes de todos

**Middleware**

Para completar todos os testes referentes à todos é necessário antes ter completado o código que falta no middleware checkExistsUserAccount. Para isso, você deve pegar o username do usuário no header da requisição, verificar se esse usuário existe e então colocar esse usuário dentro da request antes de chamar a função next. Caso o usuário não seja encontrado, você deve retornar uma resposta contendo status 404 e um json no seguinte formato:

{
error: 'Mensagem do erro'
}

**Observação**: O username deve ser enviado pelo header em uma propriedade chamada username:

- **Should be able to list all user's todos**

  Para que esse teste passe, na rota GET /todos é necessário pegar o usuário que foi repassado para o request no middleware checkExistsUserAccount e então retornar a lista todos que está no objeto do usuário conforme foi criado para satisfazer o primeiro teste.

- **Should be able to create a new todo**

  Para que esse teste passe, na rota POST `/todos` é necessário pegar o usuário que foi repassado para o `request` no middleware `checkExistsUserAccount`, pegar também o `title` e o `deadline` do corpo da requisição e adicionar um novo _todo_ na lista `todos` que está no objeto do usuário. Lembre-se de seguir a estrutura padrão de um _todo_ como mostrado [aqui](https://www.notion.so/Desafio-01-Conceitos-do-Node-js-59ccb235aecd43a6a06bf09a24e7ede8).

  Após adicionar o novo _todo_ na lista, é necessário retornar um status `201` e o _todo_ no corpo da resposta.

- **Should be able to update a todo**

  Para que esse teste passe, na rota PUT /todos/:id é necessário atualizar um todo existente, recebendo o title e o deadline pelo corpo da requisição e o id presente nos parâmetros da rota.

- **Should not be able to update a non existing todo**

  Para que esse teste passe, você não deve permitir a atualização de um todo que não existe e retornar uma resposta contendo um status 404 e um json no seguinte formato:

  {
  error: 'Mensagem do erro'
  }

- **Should be able to mark a todo as done**

  Para que esse teste passe, na rota PATCH /todos/:id/done você deve mudar a propriedade donede um todo de false para true, recebendo o id presente nos parâmetros da rota.

- **Should not be able to mark a non existing todo as done**

  Para que esse teste passe, você não deve permitir a mudança da propriedade done de um todo que não existe e retornar uma resposta contendo um status 404 e um json no seguinte formato:

  {
  error: 'Mensagem do erro'
  }

- **Should be able to delete a todo**

  Para que esse teste passe, DELETE /todos/:id você deve permitir que um todo seja excluído usando o id passado na rota. O retorno deve ser apenas um status 204 que representa uma resposta sem conteúdo.

- **Should not be able to delete a non existing todo**

  Para que esse teste passe, você não deve permitir excluir um todo que não exista e retornar uma resposta contendo um status 404 e um json no seguinte formato:

  {
  error: 'Mensagem do erro'
  }

### Entrega

Esse desafio deve ser entregue a partir da plataforma da Rocketseat. Envie o link do repositório que você fez suas alterações. Após concluir o desafio, além de ter mandado o código para o GitHub, fazer um post no Linkedin é uma boa forma de demonstrar seus conhecimentos e esforços para evoluir na sua carreira para oportunidades futuras.

### Solução do desafio

Caso você queira ver como resolver o desafio, fizemos um vídeo explicando o passo a passo para cumprir com todos os requisitos da aplicação:
https://www.youtube.com/watch?v=t3mnEa3OGgY
