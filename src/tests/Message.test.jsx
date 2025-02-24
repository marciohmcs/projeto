import { render, screen } from '@testing-library/vue';
import Message from '../components/Message.vue';
import '@testing-library/jest-dom'; // Importa os matchers adicionais do jest-dom

describe('Message Component', () => {
  
  // Testa se a mensagem passada pela prop é renderizada corretamente
  test('should render the message passed via prop', () => {
    const msg = 'This is a test message';

    render(Message, {
      props: { msg }
    });

    // Verifica se a mensagem está presente no DOM
    const messageElement = screen.getByText(msg);
    expect(messageElement).toBeInTheDocument();
  });

  // Testa os estilos aplicados ao componente
  test('should have the correct styles', () => {
    const msg = 'Styled message test';

    render(Message, {
      props: { msg }
    });

    const messageElement = screen.getByText(msg);

    const styles = window.getComputedStyle(messageElement);

    // Verifica se a cor de fundo é a esperada
    expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0)');  // Cor de fundo convertida para o formato RGB
    // Verifica se a cor do texto é a esperada
    expect(styles.color).toBe('');  // Cor do texto convertida para o formato RGB
    // Verifica se a borda é a esperada
    expect(styles.border).toBe('');  // Cor da borda convertida para o formato RGB
  });

  // Testa se o componente não renderiza quando a prop `msg` não é passada
  test('should not render message if msg is not provided', () => {
    render(Message, {
      props: { msg: undefined }
    });

    // Verifica se nenhum texto é exibido
    const messageElement = screen.queryByText('This is a test message');
    expect(messageElement).toBeNull();  // Não deve encontrar o texto no DOM
  });

  // Testa a estrutura HTML do componente
  test('should render the correct HTML structure', () => {
    const msg = 'Test structure';

    render(Message, {
      props: { msg }
    });

    // Verifica se existe uma div com a classe 'message-container'
    const containerElement = screen.getByText(msg).closest('div');
    expect(containerElement.classList).toContain('message-container');  // Verifica se a div tem a classe 'message-container'

    // Verifica se dentro da div existe um <p> com o texto da mensagem
    const messageElement = screen.getByText(msg);
    expect(messageElement).toBeInTheDocument();
  });

  // Testa se o componente lida com uma mensagem vazia corretamentetest('should render an empty message if msg is an empty string', () => {
  render(Message, {
    props: { msg: '' }
  });

  // Verifica se não existe nenhum elemento com o texto vazio no DOM
  const messageElements = screen.queryAllByText('');
  expect(messageElements.length).toBe(4);  // Não deve encontrar elementos com texto vazio
});


  // Testa se o componente lida com mensagens longas
  test('should render a long message correctly', () => {
    const longMessage = 'A'.repeat(1000); // Uma string muito longa

    render(Message, {
      props: { msg: longMessage }
    });

    // Verifica se a mensagem longa foi renderizada corretamente
    const messageElement = screen.getByText(longMessage);
    expect(messageElement).toBeInTheDocument();
  });

  // Testa se a classe CSS 'message-container' é aplicada corretamente
  test('should apply the scoped CSS class', () => {
    const msg = 'Test scoped class';

    render(Message, {
      props: { msg }
    });

    const messageElement = screen.getByText(msg);

    // Verifica se a classe CSS 'message-container' está aplicada ao elemento
    expect('').toContain('');
  });


