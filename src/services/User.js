/*const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const User = prisma.user

// Funções para Usuário (User)
const createUser = async (data) => {
    const result = await User.create({ data:{...data} });
    return result;
};
const findAllUsers = async() =>{
    const result = await User.findMany()    
    return result
}
const getUserById = async (id) => {
    const result = await User.findUnique({ where: { id } });
    return result;
};
const deleteUser = async (id) => {
    const result = await prisma.user.delete({ where: { id } });
    return result;
};

module.exports = { createUser, findAllUsers, getUserById, deleteUser }*/


const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const User = prisma.user

const createUser = async(data) =>{
    const result = await User.create({data: {...data}})
    return result
}

const findAllUsers = async() =>{
    const result = await User.findMany()    
    return result
}

module.exports = { createUser, findAllUsers }
