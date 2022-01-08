import { LogoIcon } from '../../assets';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export const Header = ({ onOpenNewTransactionModal } : HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={LogoIcon} alt="Logotipo do dt money" />
        <button type="button" onClick={onOpenNewTransactionModal}>Nova transação</button>
      </Content>
    </Container>
  );
}
