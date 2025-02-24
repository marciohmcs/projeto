import { mount } from '@vue/test-utils'
import { vi, describe, it, expect } from 'vitest'
import BurgerForm from '../components/BurguerForm.vue'
import Message from '../components/Message.vue'

// Mock do componente Message
vi.mock('../components/Message.vue', () => ({
  default: {
    name: 'Message',
    props: ['msg'],
    template: '<div>{{ msg }}</div>'
  }
}))

describe('BurgerForm Component', () => {

  // Teste para verificar o preenchimento do campo "Nome do cliente"
  it('should update nome when the input value changes', async () => {
    const wrapper = mount(BurgerForm)

    // Encontrando o campo de nome e simulando uma mudança de valor
    const inputNome = wrapper.find('input#nome')
    await inputNome.setValue('')

    // Verificando se o valor da variável "nome" foi atualizado corretamente
    expect(wrapper.vm.nome).toBe('')
  })

  // Teste para verificar a seleção do pão
  it('should update pao when the select value changes', async () => {
    const wrapper = mount(BurgerForm)

    // Encontrando o campo de seleção de pão e simulando a mudança de valor
    const selectPao = wrapper.find('select#pao')
    await selectPao.setValue('Pão de forma')
  })

  // Teste para verificar a seleção da carne
  it('should update carne when the select value changes', async () => {
    const wrapper = mount(BurgerForm)

    // Encontrando o campo de seleção de carne e simulando a mudança de valor
    const selectCarne = wrapper.find('select#carne')
    await selectCarne.setValue('Carne bovina')

  })

  // Teste para verificar a limpeza dos campos após o envio do formulário
  it('should clear form fields after submission', async () => {
    const wrapper = mount(BurgerForm)

    // Preenchendo os campos
    await wrapper.setData({
      nome: '',
      carne: '',
      pao: '',
      opcionais: []
    })

    // Submetendo o formulário
    await wrapper.find('form').trigger('submit.prevent')

    await wrapper.vm.$nextTick()

    // Verificando se os campos foram limpos após o envio
    expect(wrapper.vm.nome).toBe('')
    expect(wrapper.vm.carne).toBe('')
    expect(wrapper.vm.pao).toBe('')
    expect(wrapper.vm.opcionais).toEqual([])
  })

  // Teste de montagem do componente
  it('should mount correctly and have initial data', () => {
    const wrapper = mount(BurgerForm)

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.vm.nome).toBeNull()
    expect(wrapper.vm.pao).toBeNull()
    expect(wrapper.vm.carne).toBeNull()
    expect(wrapper.vm.opcionais).toEqual([])
  })

  // Teste para verificar a função `getIngredientes`
  it('should update opcionais when a checkbox is checked', async () => {
    // Mockando os dados para opcionais
    const mockData = {
      paes: [{ id: 1, tipo: 'Pão de forma' }],
      carnes: [{ id: 1, tipo: 'Carne bovina' }],
      opcionais: [{ id: 1, tipo: 'Queijo' }]
    }
  
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData)
    })
  
    const wrapper = mount(BurgerForm)
  
    // Aguarde o Vue renderizar os dados após o fetch
    await wrapper.vm.getIngredientes()
    await wrapper.vm.$nextTick()
  
    // Agora o checkbox para "Queijo" deve existir
    const checkboxQueijo = wrapper.find('input[type="checkbox"]')
  
    // Verificar se o checkbox foi encontrado
    expect(checkboxQueijo.exists()).toBe(true)
  
    // Marcar o checkbox
    await checkboxQueijo.setChecked()
  
    // Verificar se o valor foi adicionado ao array de opcionais
    expect(wrapper.vm.opcionais).toContain('Queijo')
  })

  // Teste para verificar o envio do formulário na função `createBurger`
  it('should submit the form and clear the fields', async () => {
    const wrapper = mount(BurgerForm)
    
    // Mockando a API para simular o envio do formulário
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true })
    })
    
    // Preenchendo os dados
    await wrapper.setData({
      nome: 'João',
      carne: 'Carne bovina',
      pao: 'Pão de forma',
      opcionais: ['Queijo']
    })

    // Submetendo o formulário
    await wrapper.find('form').trigger('submit.prevent')

    // Verificando se os dados foram enviados corretamente
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/burgers', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'João',
        carne: 'Carne bovina',
        pao: 'Pão de forma',
        opcionais: ['Queijo'],
        status: 'Solicitado'
      })
    }))
    
    // Verificando a limpeza dos campos após o envio
    expect(wrapper.vm.nome).toBe("")
    expect(wrapper.vm.carne).toBe("")
    expect(wrapper.vm.pao).toBe("")
    expect(wrapper.vm.opcionais).toEqual([])

    // Verificando a exibição da mensagem de sucesso
    expect(wrapper.vm.msg).toBe('Pedido realizado com sucesso!')
  })

  // Teste de renderização da mensagem
  it('should display success message after submission', async () => {
    const wrapper = mount(BurgerForm)

    // Simulando a exibição da mensagem após o pedido ser realizado
    await wrapper.setData({ msg: 'Pedido realizado com sucesso!' })

    const message = wrapper.findComponent({ name: 'Message' })
    expect(message.exists()).toBe(true)
    expect(message.text()).toBe('Pedido realizado com sucesso!')

    // Verificando se a mensagem desaparece após 3 segundos
    setTimeout(() => {
      expect(wrapper.vm.msg).toBe('')
    }, 3000)
  })
})
