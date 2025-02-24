import { render, screen} from '@testing-library/vue';
import Pedidos from '../views/Pedidos.vue';
import {describe, it, exepct, vi} from 'vitest'; 


vi.mock('../components/Dashboard.vue', () => ({

        default: {
            name: 'Dashboard',
            template: '<div> Dashboard Component </div>',
        },
}));


describe('Pedidos.vue', () => {
    it('should render the title "Gerenciar pedidos:"', async () => {
      render(Pedidos);  // Renderiza o componente Pedidos
  
      // Verifica se o título h1 contém o texto "Gerenciar pedidos:"
      expect(screen.getByRole('heading', { name: /Gerenciar pedidos:/i })).toBeDefined();
    });
  
    it('should render the Dashboard component', async () => {
      render(Pedidos);  // Renderiza o componente Pedidos
  
      // Verifica se o texto "Dashboard Component" (do componente Dashboard mockado) está presente na tela
      expect(screen.getByText('Dashboard Component')).toBeDefined();
    });
  });