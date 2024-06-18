import { inspecionar } from "../decorators/inspecionar.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export class Negociacao {
    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {}

    get data(): Date {
        return new Date(this._data.getTime());
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    @inspecionar
    @logarTempoDeExecucao()
    public static criaDe(
        dataString: string,
        quantidadeString: string,
        valorString: string
    ): Negociacao {
        const expReg = /-/g;
        const date = new Date(dataString.replace(expReg, ","));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor);
    }
}
