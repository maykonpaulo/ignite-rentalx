# Cadastro de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um novo carro.

**Regra de Negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro de ser cadastrado, por padrão, com disponibilidade.
Apenas usuário administrador pode cadastrar carro.

# Listagem de carros

**Requisitos Funcionais**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome da carro.

**Requisitos Não Funcionais**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**Requisitos Funcionais**
Deve ser possível cadastrar uma especificação para um carro.

**Regra de Negócio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
Apenas usuário administrador pode cadastrar especificação.

# Cadastro de imagens do carro

**Requisitos Funcionais**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carro.

**Requisitos Não Funcionais**
Utilizar o multer para upload dos arquivos.

**Regra de Negócio**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
Apenas usuário administrador pode cadastrar imagens.

# Aluguel de carro

**Requisitos Funcionais**
Deve ser possível cadastrar um aluguel.

**Regra de Negócio**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto pra o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto pra o mesmo carro.