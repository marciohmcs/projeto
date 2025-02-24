import { render } from '@testing-library/vue';
import Navbar from '../components/Navbar.vue'; // Certifique-se de que o caminho está correto
import { createRouter, createWebHistory } from 'vue-router';

test('deve renderizar links com os caminhos corretos', async () => {
  // Defina as rotas para o teste (sem anotações de tipo do TypeScript)
  const routes = [
    { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
    { path: '/pedidos', name: 'Pedidos', component: { template: '<div>Pedidos</div>' } }
  ];

  // Crie o roteador com essas rotas
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  // Renderize o componente com o router
  const { getByText } = render(Navbar, {
    global: {
      plugins: [router] // Fornece o Vue Router ao teste
    }
  });

  // Aguarde o roteador ser carregado
  await router.isReady();

  // Verifique se os links existem e estão com os caminhos corretos
  const homeLink = getByText('Home');
  const pedidosLink = getByText('Pedidos');

  // Use o método adequado para obter o valor do atributo "href"
  expect(homeLink.getAttribute('href')).toBe('/');
  expect(pedidosLink.getAttribute('href')).toBe('/pedidos');
});
