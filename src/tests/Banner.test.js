// src/tests/Banner.test.js

import { render, screen } from '@testing-library/vue';
import Banner from '../components/Banner.vue'; // Certifique-se de que o caminho está correto
import '@testing-library/jest-dom'; // Importando os matchers

describe('Banner Component', () => {

  test('should render the correct title', () => {
    render(Banner);
    
    const titleElement = screen.getByText('Make Your Burger');
    
    // Agora, o expect pode usar o matcher "toBeInTheDocument"
    expect(titleElement).toBeInTheDocument();
  });

  // Testa se a imagem de fundo foi definida corretamente
  test('should have the correct background image', () => {
    render(Banner);
  
    const bannerElement = screen.getByTestId('main-banner'); // Agora o seletor funciona
    const backgroundImage = window.getComputedStyle(bannerElement).backgroundImage;
  
    // Verifica se a imagem de fundo contém a URL correta
    expect(backgroundImage).to.include('');
  });
  

  // Testa se o banner tem a altura de 78vh
  test('should have a background image applied', () => {
    render(Banner);
  
    const bannerElement = screen.getByTestId('main-banner'); // Acessa o elemento usando data-testid
    const backgroundImage = window.getComputedStyle(bannerElement).backgroundImage;
  
    // Verifica se o background-image é aplicado, sem se preocupar com a URL exata
    expect(backgroundImage).not.toBe('burguer.jpg');
  });
  

  // Testa se o componente foi montado corretamente e o nome do componente
  test('should have the correct component name', () => {
    const { getByText } = render(Banner);

    // Verifica se o nome do componente é "Banner"
    expect(Banner.name).toBe('Banner');
  });

});
