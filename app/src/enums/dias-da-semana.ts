export enum DiasDaSemana {
    DOMINGO = 0,
    SEGUNDA_FEIRA = 1,
    TERCA_FEIRA = 2,
    QUARTA_FEIRA = 3,
    QUINTA_FEIRA = 4,
    SEXTA_FEIRA = 5,
    SABADO = 6,
}

export const DiasUteis: ReadonlyArray<number> = [
    DiasDaSemana.SEGUNDA_FEIRA,
    DiasDaSemana.TERCA_FEIRA,
    DiasDaSemana.QUARTA_FEIRA,
    DiasDaSemana.QUINTA_FEIRA,
    DiasDaSemana.SEXTA_FEIRA,
];
