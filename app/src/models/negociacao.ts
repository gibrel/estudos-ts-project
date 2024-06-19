import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> {
    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {}

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

    get data(): Date {
        return new Date(this._data.getTime());
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    public paraTexto(): string {
        return `╟────┬> Data: ${this.data}\n║    ├> Quantidade: ${this.quantidade}\n║    └> Valor: ${this.valor}`;
    }

    public ehIgual(negociacao: Negociacao): boolean {
        return (
            this.data.getDate() === negociacao.data.getDate() &&
            this.data.getMonth() === negociacao.data.getMonth() &&
            this.data.getFullYear() === negociacao.data.getFullYear() &&
            this.quantidade === negociacao.quantidade &&
            this.valor === negociacao.valor
        );
    }
}
