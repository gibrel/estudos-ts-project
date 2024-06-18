import { inspecionar } from "../decorators/inspecionar.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasUteis } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacaoesView } from "../views/negociacoes-view.js";

/**
 * Comentário de classe
 */
export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacaoesView("#negociacoesView");
    private mensagemView = new MensagemView("#mensagemView");

    /**
     * Comentário de construtor
     */
    constructor() {
        this.inputData = document.querySelector("#data") as HTMLInputElement;
        this.inputQuantidade = document.querySelector(
            "#quantidade"
        ) as HTMLInputElement;
        this.inputValor = document.querySelector("#valor") as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    /**
     * Comentário de método
     * @returns retorna nada, voidão
     */
    @inspecionar
    @logarTempoDeExecucao()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );

        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update(
                "Apenas negociações em dias úteis são aceitas"
            );
            return;
        }

        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }

    private limparFormulario(): void {
        this.inputData.value = "";
        this.inputQuantidade.value = "1";
        this.inputValor.value = "0.00";
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso!");
    }

    @inspecionar
    @logarTempoDeExecucao()
    private ehDiaUtil(data: Date): boolean {
        return DiasUteis.includes(data.getDay());
    }
}
