import { render, screen, waitFor } from '@testing-library/vue';
import Dashboard from '../components/Dashboard.vue'; // Altere conforme o caminho correto do seu componente

test('deve exibir o nome do cliente corretamente', async () => {
  // Simulando a resposta da API
  const burgersMock = [
    {
      id: 1,
      nome: 'Cliente 1',
      pao: 'Integral',
      carne: 'Carne',
      opcionais: ['Queijo', 'Bacon'],
      status: 'Em preparo'
    }
  ];

  // Mockando o fetch
  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: () => Promise.resolve(burgersMock)
  });

  render(Dashboard);

  // Esperando o nome do cliente aparecer na tela
  await waitFor(() => screen.getByText('Cliente 1'));

  // Verifica se o nome do cliente foi exibido corretamente
  expect(screen.getByText('Cliente 1')).toBeTruthy();
});

test('deve exibir "Não há pedidos no momento!" se não houver pedidos', async () => {
  // Simulando a resposta da API com um array vazio (sem burgers)
  vi.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: () => Promise.resolve([])
  });

  render(Dashboard);

  // Espera pela mensagem "Não há pedidos no momento!"
  await waitFor(() => screen.getByText('Não há pedidos no momento!'));

  // Verifica se a mensagem foi renderizada
  expect(screen.getByText('Não há pedidos no momento!')).toBeTruthy();
});
