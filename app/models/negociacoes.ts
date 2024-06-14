import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    private negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    // lista(): Negociacao[] {
    //     return [...this.negociacoes];
    // }

    //lista(): ReadonlyArray<Negociacao> {
    lista(): readonly Negociacao[] {
        return this.negociacoes;
    }
}
