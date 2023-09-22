// clase 3 - 1.18min (hand on lab - MANAGER USER)
const fs = require('fs');
const path = require('path');

class UserManager {
    
    constructor (path) {
        this.path = path
    }

    //Archivo
    async getUsers(){
        try{
            // Reviso que exista el archivo - reviso y retorno la informacion(arreglo de usuarios)
            if (fs.existsSync(this.path)){
                const info = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(info)
            } else{
                // si no existe retorna a  un arreglo vacio
                return []
            }
        }

        catch (error) {
            return error 
        }
    }

    // Crear nuevo usuario
    async createUser(obj) {
        try{
            //Reviso info previa o existente
            const users = await this.getUsers()
            users.push(obj)
            //Guardar nuevo usuario
            await fs.promises.writeFile(this.path,JSON.stringify(users))
        }

        catch (error) {
            return error 
        }
    }

    async getUserById(){
        
    }

    async deleteUser(){
        
    }
}

//Usuario
const user1 = {
    firt_name: 'laura',
    last_name: 'gonzalez',
    age: 18,
    couse:'JavaScript'
}


// cambiar a metodo sincronico - ver clase
async function test() {
    const manager1 = new UserManager ('Users.json')
    await manager1.createUser(user1)
    //const users = await manager1.getUsers()
    //console.log(users);
}
test()

//VER PQ NO SE CREA EL ARCHIVO USERS.JSON