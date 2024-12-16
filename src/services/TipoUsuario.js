const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const TipoUsuario = prisma.tipoUsuario

const createUserType = async(data) =>{
    const result = await TipoUsuario.create({data: {...data}})
    return result
}

const findAllUserTypes = async() =>{
    const result = await TipoUsuario.findMany()    
    return result
}

module.exports = { createUserType, findAllUserTypes }
