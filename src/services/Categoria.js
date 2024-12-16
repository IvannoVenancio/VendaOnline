const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const tipoCategoria = prisma.tipoCategoria

const createCategoryType = async(data) =>{
    const result = await tipoCategoria.create({data: {...data}})
    return result
}

const findAllCategoryTypes = async() =>{
    const result = await tipoCategoria.findMany()    
    return result
}

module.exports = { createCategoryType, findAllCategoryTypes }
