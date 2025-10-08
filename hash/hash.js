import { createHash } from 'crypto';

function criaHash(senha){
    return createHash('sha256').update(senha).digest('hex')
}

console.log(criaHash("uma String Qualquer"))

class Usuario{
    constructor(nome, senha){
        this.nome = nome;
        this.hash = criaHash(senha);
    }    
    autentica(nome, senha){
        if (nome === this.nome && this.hash === criaHash(senha)){
            return true
            console.log("Usuário autentucado com sucesso!");
        }      
        console.log("Usuário ou senha incorretos.")
        return false;
    }    
}

const usuario = new Usuario('Rafael Souza', 'minhasenha')

console.log(usuario)

// Caso de sucesso
usuario.autentica('Rafael Souza', 'minhaSenha')
//resposta esperada
//Usuario {
//    nome: 'Rafael Souza',
//    hash: '79809644a830ef92424a66227252b87bbdfb633a9dab18ba450c1b8d35665f20'
//  }

// Caso de fracasso
usuario.autentica('rs', 'minhaSenha')
//resposta esperada
//Usuário ou senha incorretos.