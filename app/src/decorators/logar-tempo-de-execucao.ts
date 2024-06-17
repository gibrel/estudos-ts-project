export function logarTempoDeExecucao() {
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
            logTime(t2 - t1);
            retorno;
        };
        return descriptor;
    };
}

function logTime(miliseconds: number): void {
    let logString: string;
    if (miliseconds > 10000) {
        logString = `Tempo de execução: ${Math.trunc(miliseconds / 1000)}s`;
    } else if (miliseconds >= 1) {
        logString = `Tempo de execução: ${Math.trunc(miliseconds)}ms`;
    } else {
        logString = `Tempo de execução: ${Math.trunc(miliseconds * 1000)}us`;
    }
    console.log(logString);
}
