import { generateKeyPairSync, createSign, createVerify } from 'crypto';
import { create } from 'domain';

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,

    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    }
});

let dados = "Essa string vai ser assinada!"

//Assinatura
const assinador = createSign('rsa-sha256');

assinador.update(dados);

const assinatura = assinador.sign(privateKey, 'hex');

console.log(`Assinatura: ${assinatura}`);

//Intermediário --------- Se o dado for alterado antes da verificação, a mesma restorna false, só ira retornar true se o dado 'assinador' for = 'verificado'
//dados += 'Arquivo alterado';

//Envio desse documento ------------- Documento, assinatura e chave pública

const verificador = createVerify('rsa-sha256');

verificador.update(dados);

const ehVerificado = verificador.verify(publicKey, assinatura, 'hex');

console.log(ehVerificado)