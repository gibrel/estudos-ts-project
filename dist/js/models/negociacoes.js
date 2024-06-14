export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    // lista(): Negociacao[] {
    //     return [...this.negociacoes];
    // }
    //lista(): ReadonlyArray<Negociacao> {
    lista() {
        return this.negociacoes;
    }
}
