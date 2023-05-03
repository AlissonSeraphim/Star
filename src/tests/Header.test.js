import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import AppProvider from '../context/AppProvider';

describe('Testa o componente Header', () => {
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
});

