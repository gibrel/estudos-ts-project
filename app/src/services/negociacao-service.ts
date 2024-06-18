import { Negociacao } from "../models/negociacao.js";
import { NegociacoesDoDia } from "../interfaces/negociacoes-do-dia.js";

export class NegociacaoService {
    public obterNegociacoesDoDia(): Promise<Negociacao[]> {
        return fetch("http://localhost:8080/dados")
            .then((res) => res.json())
            .then((dados: NegociacoesDoDia[]) => {
                return dados.map((dadoDeHoje) => {
                    return new Negociacao(
                        new Date(),
                        dadoDeHoje.vezes,
                        dadoDeHoje.montante
                    );
                });
            });
    }
}
