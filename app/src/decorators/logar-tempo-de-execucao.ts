import { UnidadesDeTempo } from "../enums/unidades-de-tempo.js";

export function logarTempoDeExecucao(
    unidadeDeTempo: UnidadesDeTempo = UnidadesDeTempo.AUTO
) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            logaTempoMetodo(t2 - t1, unidadeDeTempo, propertyKey);
            return retorno;
        };
        return descriptor;
    };
}

/**
 *
 * @param deltaTime Tempo decorrido em milisegundos
 * @param unidadeDeTempo Unidade de tempo desejada no log
 * @param nomeMetodo Nome do método executado
 * @returns Texto de tempo de execução
 */
function logaTempoMetodo(
    deltaTime: number,
    unidadeDeTempo: UnidadesDeTempo,
    nomeMetodo: string
): void {
    let multiplicador: number;
    let unidadeString: string;

    if (
        unidadeDeTempo == UnidadesDeTempo.SEGUNDOS ||
        (unidadeDeTempo == UnidadesDeTempo.AUTO && deltaTime > 1000)
    ) {
        multiplicador = 0.001;
        unidadeString = "s";
    } else if (
        unidadeDeTempo == UnidadesDeTempo.MILI_SEGUNDOS ||
        (unidadeDeTempo == UnidadesDeTempo.AUTO && deltaTime >= 1)
    ) {
        multiplicador = 1;
        unidadeString = "ms";
    } else {
        multiplicador = 1000;
        unidadeString = "us";
    }

    console.log(
        `╟────>${nomeMetodo}: Tempo de execução: ${Math.trunc(
            deltaTime * multiplicador
        )}${unidadeString}`
    );
}
