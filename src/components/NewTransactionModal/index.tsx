import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { CloseIcon, IncomeIcon, OutcomeIcon } from '../../assets';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, TransactionTypeContainer, TransactionTypeButton } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement('#root');

export const NewTransactionModal = ({ isOpen, onRequestClose } : NewTransactionModalProps) => {
  const { createTransaction } = useTransactions();

  const [ transactionType, setTransactionType ] = useState('deposit');
  const [ form, setForm ] = useState({
    title: '',
    amount: 0,
    category: '',
  });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = event.target;
    let newValue = type === 'number' ? Number(value) : value;

    const newForm = {
      ...form,
      [name]: newValue
    }

    setForm(newForm);
  }

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();
   
    createTransaction({
      ...form,
      type: transactionType
    });

    setTransactionType('deposit');
    setForm({
      title: '',
      amount: 0,
      category: '',
    });

    await onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={CloseIcon} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input type="text" placeholder="Título" name="title" value={form.title}  onChange={handleChangeInput}/>
        <input type="number" placeholder="Valor" name="amount" value={form.amount} onChange={handleChangeInput}/>

        <TransactionTypeContainer>
          <TransactionTypeButton 
            type="button"
            isActive={transactionType === 'deposit'}
            activeColor="green"
            onClick={() => setTransactionType('deposit')}
          >
            <img src={IncomeIcon} alt="Entrada de dinheiro"/>
            <span>Entrada</span>
          </TransactionTypeButton>
          <TransactionTypeButton 
            type="button" 
            isActive={transactionType === 'withdraw'}
            activeColor="red"
            onClick={() => setTransactionType('withdraw')}
          >
            <img src={OutcomeIcon} alt="Saída de dinheiro" />
            <span>Saída</span>
          </TransactionTypeButton>
        </TransactionTypeContainer>

        <input type="text" placeholder="Categoria" name="category" value={form.category} onChange={handleChangeInput}/>
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
