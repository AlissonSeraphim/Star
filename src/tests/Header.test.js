import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Testa o componente Header', () => {
  it('Verifica se existe um titulo', () => {
    render(<Header />)
    const title = screen.getByRole('heading', {  name: /star wars/i })
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe um input de pesquisa', () => {
    render(<Header />)
    const searchInput = screen.getByRole('textbox', {  name: /pesquise pelo nome:/i})
    expect(searchInput).toBeInTheDocument();
  })

  it('Verifica se existe um select de filtro por coluna', () => {
    render(<Header />)
    const columnFilter = screen.getByTestId('column-filter')
    expect(columnFilter).toBeInTheDocument();
  })

  it('Verifica se existe um select de filtro de comparação', () => {
    render(<Header />)
    const comparisonFilter = screen.getByTestId('comparison-filter')
    expect(comparisonFilter).toBeInTheDocument();
  })

  it('Verifica se existe um input para filtrar por valor', () => {
    render(<Header />)
    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();
  })

  it('Verifica se existe um botão para filtrar', () => {
    render(<Header />)
    const filterButton = screen.getByTestId('button-filter')
    expect(filterButton).toBeInTheDocument();
  })
});

