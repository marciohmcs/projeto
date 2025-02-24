import { render, screen } from '@testing-library/vue';  // Usando Vue Testing Library para renderizar o componente
import Footer from '../components/Footer.vue';  // Ajuste o caminho conforme necessário
import { describe, it, expect } from 'vitest';  // Usando Vitest para escrever os testes

describe('Footer.vue', () => {

  it('deve renderizar o footer com o texto correto', () => {
    render(Footer);  // Renderiza o componente Footer

    // Verifica se o texto "Make Your Burger © 2021" está presente dentro do <p>
    expect(screen.getByText('Make Your Burger © 2021')).toBeTruthy();
  });

  it('deve ter um div com o id "footer"', () => {
    render(Footer);  // Renderiza o componente Footer

    // Verifica se o elemento com o data-testid="footer" está presente
    expect(screen.getByTestId('footer')).toBeTruthy();
  });

  it('deve renderizar o <p> com o símbolo de copyright', () => {
    render(Footer);  // Renderiza o componente Footer

    // Verifica se o texto contém o símbolo de copyright (&copy;)
    expect(screen.getByText('Make Your Burger © 2021')).toBeTruthy();
  });
});
