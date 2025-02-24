import { render, screen } from '@testing-library/vue'; // Usando testing-library/vue para renderizar o componente
import Home from '../views/HomeView.vue';  // Ajuste o caminho conforme a estrutura do seu projeto
import { describe, it, expect, vi } from 'vitest';  // Importando o Vitest para escrever os testes

// Mock dos componentes filhos (Banner e BurguerForm)
vi.mock('../components/Banner.vue', () => ({
  default: {
    name: 'Banner',
    template: '<div>Banner</div>',
  },
}));

vi.mock('../components/BurguerForm.vue', () => ({
  default: {
    name: 'BurguerForm',
    template: '<div>BurguerForm</div>',
  },
}));

describe('Home.vue', () => {
  it('should render the Banner component', async () => {
    render(Home);  // Renderiza o componente Home

    // Verifica se o texto "Banner" (do componente Banner mockado) está presente na tela
    expect(screen.getByText('Banner')).toBeDefined();
  });

  it('should render the BurguerForm component', async () => {
    render(Home);  // Renderiza o componente Home

    // Verifica se o texto "BurguerForm" (do componente BurguerForm mockado) está presente na tela
    expect(screen.getByText('BurguerForm')).toBeDefined();
  });

  it('should render the header with the text "Monte o seu Burguer:"', async () => {
    render(Home);  // Renderiza o componente Home

    // Verifica se o título h1 contém o texto esperado
    expect(screen.getByRole('heading', { name: /Monte o seu Burguer:/i })).toBeDefined();
  });
});
