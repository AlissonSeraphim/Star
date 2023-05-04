import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import AppProvider from '../context/AppProvider';
import userEvent from '@testing-library/user-event';
import mockPlanets from '../mocks/mockPlanets';


describe('Testa o componente Table', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockPlanets),
    })
  })
  it('Verifica se existe uma tabela com header', async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )
    const nameColumn = await screen.findByText(/name/i)
    expect(nameColumn).toBeInTheDocument();
  });

  it('Verifica se existe uma tabela com conteudo e condiz com o primeiro resultado da API - Tatooine', async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )
    const firstPlanet = await screen.findByRole('cell', {  name: /tatooine/i})
    expect(firstPlanet).toBeInTheDocument();
  });

  it('Verifica se a procura pelo nome está simultanea', async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )
    const searchInput = screen.getByRole('textbox', {  name: /pesquise pelo nome:/i})
    userEvent.click(searchInput);
    userEvent.type(searchInput, 'al')
    
    const alderaanPlanet = await screen.findByRole('cell', {  name: /alderaan/i})
    expect(alderaanPlanet).toBeInTheDocument();
  });

  it('Verifica se o filtro retorna o planeta correto', async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )

    const selectGet = screen.getByRole('combobox', {  name: /de acordo com:/i})
    userEvent.selectOptions(selectGet, ['orbital_period'])
    
    const valueInput = screen.getByTestId('value-filter');
    userEvent.type(valueInput, 5000)

    const buttonFilter = screen.getByRole('button', {  name: /filtrar/i})
    userEvent.click(buttonFilter);

    expect(await screen.findByRole('cell', {  name: /bespin/i})).toBeInTheDocument();


  });

  it('Verifica se existe o planeta certo ao limpar somente um filtro', async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )

    const valueInput = screen.getByTestId('value-filter');
    userEvent.type(valueInput, 1000000000)

    const buttonFilter = screen.getByRole('button', {  name: /filtrar/i})
    userEvent.click(buttonFilter);

    userEvent.type(valueInput, 12400)
    userEvent.click(buttonFilter);

    const nabooPlanet = await screen.findByRole('cell', {  name: /naboo/i})

    const clearFilterButton = await screen.findAllByRole('button', {  name: /clear filter/i})
    userEvent.click(clearFilterButton[0]);

    expect(nabooPlanet).toBeInTheDocument();
  })

  it('Verifica se o botão Remover todas filtragens executa sua função de limpeza total', async () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )

    const valueInput = screen.getByTestId('value-filter');
    userEvent.type(valueInput, 1000000000)

    const buttonFilter = screen.getByRole('button', {  name: /filtrar/i})
    userEvent.click(buttonFilter);

    const clearFilterButton = screen.getByRole('button', {  name: /clear filter/i})
    expect(clearFilterButton).toBeInTheDocument();

    const clearAllFilters = screen.getByRole('button', {  name: /remover todas filtragens/i})
    userEvent.click(clearAllFilters);

    expect(clearFilterButton).not.toBeInTheDocument();

    const tatooinePlanet = await screen.findByText(/tatooine/i)
    expect(tatooinePlanet).toBeInTheDocument();
  })
});
