import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import App from '../App.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

describe('App.vue', () => {
  it('renders the logo and app name correctly', () => {
    const wrapper = mount(App);

    // Verifica se o logo está correto
    const logoSrc = wrapper.findComponent(Navbar).props('logo');
    expect(logoSrc).toBe('/img/logo.png');

    // Verifica se o nome do app está correto
    const appName = wrapper.findComponent(Navbar).props('alt');
    expect(appName).toBe('Make Your Burguer');
  });

  it('renders Navbar and Footer components', () => {
    const wrapper = mount(App);

    // Verifica se o Navbar foi renderizado
    expect(wrapper.findComponent(Navbar).exists()).toBe(true);

    // Verifica se o Footer foi renderizado
    expect(wrapper.findComponent(Footer).exists()).toBe(true);
  });
});
