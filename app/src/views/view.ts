import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export abstract class View<T> {
    protected elemento: HTMLElement;
    private escapar = false;

    constructor(selector: string, escapar?: boolean) {
        const elemento = document.querySelector(selector);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${selector} não existe no Documento.`);
        }
        if (escapar) {
            this.escapar = escapar;
        }
    }

    protected abstract template(model: T): string;

    @logarTempoDeExecucao()
    public update(model: T): void {
        let template = this.template(model);
        const expReg = /<script>[\s\S]*?<\/script>/;
        if (this.escapar) {
            template = template.replace(expReg, "");
        }
        this.elemento.innerHTML = template;
    }
}