import { session } from '../dataBase.js'

export class Neo4jUserRepository {
  async createUser({ name, age, company, cpf }) {
    const findByCpf = await session.run(
      `MATCH (n:Person {cpf: '${cpf}'}) RETURN n`,
    )

    if (findByCpf.records.length > 0) {
      throw new Error('Error! CPF already registered')
    }

    await session.run(
      `CREATE (p:Person {name: $name, age: $age, cpf: $cpf})
      WITH p
      MATCH (c:Company {name: $company})
      CREATE (p)-[:WORKS_AT]->(c)`,
      { name, age, company, cpf },
    )
  }

  async updateUser({ cpf, company }) {
    const response = await session.run(
      `MATCH (n:Person {cpf: '${cpf}'}) SET n.company = '${company}'`,
    )

    return { response }
  }

  async findByCpf({ cpf }) {
    const response = await session.run(
      `MATCH (n:Person {cpf: '${cpf}'}) RETURN n`,
    )
    if (response.records.length === 0) {
      throw new Error('Error! No user found')
    }
    const user = response.records[0]._fields[0].properties

    return {
      user,
    }
  }

  async deleteByCpf({ cpf }) {
    await session.run(`MATCH (n:Person {cpf: '${cpf}'}) DELETE n`)
  }
}
