import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {formatISO} from 'date-fns';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

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
    const createdUser = await this.userRepository.create(user);
    return createdUser;
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
    }
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
}
