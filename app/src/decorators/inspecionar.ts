export function inspecionar(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(
            `╔═════════\n╟──>Entrada Método ${propertyKey}\n╟────>parâmetros: ${JSON.stringify(
                args
            )}`
        );
        const retorno = metodoOriginal.apply(this, args);
        console.log(
            `╟────>retorno: ${JSON.stringify(
                retorno
            )}\n╟──>Saída Método ${propertyKey}\n╚═════════`
        );
        return retorno;
    };
    return descriptor;
}

// export function declaratorPadrao(
//     // INSERIR PARÂMETROS DE ENTRADA AQUI
// ) {
//     return function (
//         target: any,
//         propertyKey: string,
//         descriptor: PropertyDescriptor
//     ) {
//         const metodoOriginal = descriptor.value;
//         descriptor.value = function (...args: any[]) {
//
//             // ESCREVA A SUA FUNÇÃO PRÉ AQUI
//
//             const retorno = metodoOriginal.apply(this, args);
//
//             // ESCREVA A SUA FUNÇÃO PÓS AQUI
//
//             return retorno;
//         };
//         return descriptor;
//     };
// }
