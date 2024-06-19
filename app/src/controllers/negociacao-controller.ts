import { domInject } from "../decorators/dom-injector.js";
import { inspecionar } from "../decorators/inspecionar.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasUteis } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacaoService } from "../services/negociacao-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacaoesView } from "../views/negociacoes-view.js";

/**
 * Comentário de classe
 */
export class NegociacaoController {
    @domInject("#data")
    private inputData: HTMLInputElement;
    @domInject("#quantidade")
    private inputQuantidade: HTMLInputElement;
    @domInject("#valor")
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacaoesView("#negociacoesView");
    private mensagemView = new MensagemView("#mensagemView");
    private negociacaoService = new NegociacaoService();

    /**
     * Comentário de construtor
     */
    constructor() {
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
        imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizaView();
    }

    @inspecionar
    @logarTempoDeExecucao()
    public importaDados(): void {
        this.negociacaoService
            .obterNegociacoesDoDia()
            .then((negociacoesDeHoje) => {
                return negociacoesDeHoje.filter((negociacaoDeHoje) => {
                    return !this.negociacoes
                        .lista()
                        .some((negociacao) =>
                            negociacao.ehIgual(negociacaoDeHoje)
                        );
                });
            })
            .then((negociacoesDeHoje) => {
                for (let negociacao of negociacoesDeHoje) {
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
                this.mensagemView.update("Negociações importadas com sucesso!");
            });
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

    private ehDiaUtil(data: Date): boolean {
        return DiasUteis.includes(data.getDay());
    }
}
