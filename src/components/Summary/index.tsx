
import { useTransactions } from '../../hooks/useTransactions';

import { IncomeIcon, OutcomeIcon, TotalIcon } from '../../assets';

import { Container } from './styles';

export const Summary = () => {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {

    if(transaction.type === 'deposit') {
      acc.deposit += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraw += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposit: 0,
    withdraw: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={IncomeIcon} alt="Entradas de dinheiro" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposit)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={OutcomeIcon} alt="Saídas de dinheiro" />
        </header>
        <strong>
        - {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.withdraw)}
        </strong>
      </div>

      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={TotalIcon} alt="Total de dinheiro" />
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
