export enum Time {
  CARTOES = 'CARTOES',
  EMPRESTIMOS = 'EMPRESTIMOS',
  OUTROS = 'OUTROS'
}

export const TimeLabels: Record<Time, string> = {
  [Time.CARTOES]: 'Cartões',
  [Time.EMPRESTIMOS]: 'Empréstimos',
  [Time.OUTROS]: 'Outros Assuntos'
};
