import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import * as bcrypt from 'bcryptjs';
import {formatISO} from 'date-fns';
//import * as jwt from 'jsonwebtoken';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

  @post('/users/crypto')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async createWithCrypto(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id', 'age'], // Exclua 'age' aqui
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<Omit<User, 'password'>> {
    // 1. Formatação do campo de nascimento, se fornecido
    if (user.birthdate) {
      user.birthdate = formatISO(new Date(user.birthdate));
    }

    // 2. Hash da senha antes de salvar no banco
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    // 3. Criação do usuário com senha criptografada
    const createdUser = await this.userRepository.create(user);

    // 4. Exclui a senha do retorno usando "Type Assertion"
    const userWithoutPassword = createdUser.toObject() as Omit<User, 'password'>;

    // Retorna o usuário sem a senha
    return userWithoutPassword;
  }

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id', 'age'], // Exclua 'age' aqui
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    if (user.birthdate) {
      user.birthdate = formatISO(new Date(user.birthdate));
    }
    return this.userRepository.create(user);
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    if (filter?.fields && typeof filter.fields === 'object' && !Array.isArray(filter.fields)) {
      const fields = {...filter.fields}; // Cria uma cópia mutável do objeto fields
      delete fields.age; // Exclua 'age' dos campos filtrados
      filter.fields = fields;
    }
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}), // Exclua 'age' aqui
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    if (user.birthdate) {
      user.birthdate = formatISO(new Date(user.birthdate));
    }
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    // Remover o campo 'age' do filtro de campos
    if (filter?.fields && typeof filter.fields === 'object' && !Array.isArray(filter.fields)) {
      const fields = {...filter.fields}; // Cria uma cópia mutável do objeto fields
      delete fields.age;
      filter.fields = fields;
    } // else pra usar sem filtro
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}), // Exclua 'age' aqui
        },
      },
    })
    user: User,
  ): Promise<void> {
    if (user.birthdate) {
      user.birthdate = formatISO(new Date(user.birthdate));
    }
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<void> {
    if (user.birthdate) {
      user.birthdate = formatISO(new Date(user.birthdate));
    }
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/user/login', {
    responses: {
      '200': {
        description: 'Login Response',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
      '401': {
        description: 'Unauthorized',
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {email: string; password: string},
  ): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email, password: credentials.password},
      fields: {age: false}, // Exclui 'age' para evitar o erro no banco de dados
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized('Email ou senha incorretos');
    }

    return foundUser;
  }

  @post('/user/login/crypto', {
    responses: {
      '200': {
        description: 'Login Response',
        content: {'application/json': {schema: {'x-ts-type': User}}},
      },
      '401': {
        description: 'Unauthorized',
      },
    },
  })
  async loginWithCrypto(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {type: 'string'},
              password: {type: 'string'},
            },
          },
        },
      },
    })
    credentials: {email: string; password: string},
  ): Promise<User> {
    // Verifica se existe o usuário com o email fornecido
    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
      fields: {age: false},
    });

    // Retorna erro se o usuário não for encontrado
    if (!foundUser || !foundUser.password) {
      throw new HttpErrors.Unauthorized('Email ou senha incorretos');
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const passwordMatch = await bcrypt.compare(credentials.password, foundUser.password);

    // Retorna erro se a senha estiver incorreta
    if (!passwordMatch) {
      throw new HttpErrors.Unauthorized('Email ou senha incorretos');
    }

    return foundUser;
  }
}
