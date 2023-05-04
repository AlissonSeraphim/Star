import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import AppProvider from '../context/AppProvider';
import mockPlanets from '../mocks/mockPlanets';
import userEvent from '@testing-library/user-event';

describe('Testa o componente Header', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockPlanets),
    })
  })

  it('Verifica se existe um titulo', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>)
    const title = screen.getByRole('heading', {  name: /star wars/i })
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe um input de pesquisa', () => {
    render(
    <AppProvider>
      <App />
    </AppProvider>)
    const searchInput = screen.getByRole('textbox', {  name: /pesquise pelo nome:/i})
    expect(searchInput).toBeInTheDocument();
  })

  it('Verifica se existe um select de filtro por coluna', () => {
    render( 
    <AppProvider>
      <App />
    </AppProvider>)
    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toBeInTheDocument();
  })

  it('Verifica se existe um select de filtro de comparação', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )
    const comparisonFilter = screen.getByTestId('comparison-filter')
    expect(comparisonFilter).toBeInTheDocument();
  })

  it('Verifica se existe um input para filtrar por valor', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
  })

  it('Verifica se existe um botão para filtrar', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )
    const filterButton = screen.getByTestId('button-filter')
    expect(filterButton).toBeInTheDocument();
  })


  it('Verifica se existe um botão para limpar todos os filtros', () => {
    render(
      <AppProvider>
        <App />
      </AppProvider>
    )
    const CleanAllfiltersButton = screen.getByTestId('button-remove-filters')
    expect(CleanAllfiltersButton).toBeInTheDocument();
  })

  it('Verifica se existe um botão para limpar cada filtro', () => {
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
  })
});

