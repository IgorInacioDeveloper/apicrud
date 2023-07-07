import { companyRepository } from '../../dataBase/repositories/exportRepository.js'

export async function createCompanyUseCase({ name, cnpj, addres, phone }) {
  await companyRepository.createCompany({
    addres,
    cnpj,
    name,
    phone,
  })
}
