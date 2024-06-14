export class Negociacao {
    // constructor(
    //     private _data: Date,
    //     private _quantidade: number,
    //     private _valor: number
    // ) {}
    // get data(): Date {
    //     return this._data;
    // }
    // get quantidade(): number {
    //     return this._quantidade;
    // }
    // get valor(): number {
    //     return this._valor;
    // }
    // get volume(): number {
    //     return this._quantidade * this._valor;
    // }
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get data() {
        return new Date(this._data.getTime());
    }
    get volume() {
        return this.quantidade * this.valor;
    }
}
