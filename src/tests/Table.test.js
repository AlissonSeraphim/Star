import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testa o componente Table', () => {
  it('Verifica se existe uma tabela com header', () => {
    render(<App />)
    const nameColumn = screen.getByText(/name/i)
    expect(nameColumn).toBeInTheDocument();
  });

  it('Verifica se existe uma tabela com conteudo e condiz com o primeiro resultado da API - Tatooine', () => {
    render(<App />)
    const firstPlanet = screen.getByRole('cell', {  name: /tatooine/i})
    expect(firstPlanet).toBeInTheDocument();
  });

  it('Verifica se a procura pelo nome está simultanea', () => {
    render(<App />)
    const searchInput = screen.getByRole('textbox', {  name: /pesquise pelo nome:/i})
    userEvent.click(searchInput);
    userEvent.type(searchInput, 'al')
    
    const alderaanPlanet = screen.getByRole('cell', {  name: /alderaan/i})
    expect(alderaanPlanet).toBeInTheDocument();
  });

  it('Verifica se o filtro retorna o planeta correto', () => {
    render(<App />)
    const columnFilter = screen.getByTestId('column-filter')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'diameter' }),
    )
    expect(screen.getByRole('option', { name: 'diameter' }).selected).toBe(true)

    const comparisonFilter = screen.getByTestId('comparison-filter')
    const lessThanOption = screen.getByRole('option', { name: 'menor que' })
    userEvent.selectOptions(comparisonFilter, lessThanOption)
    expect(lessThanOption.selected).toBe(true)

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.click(valueFilter)
    userEvent.type(valueFilter, 5000)
    expect(valueFilter).toBeInTheDocument();

    const endorPlanet = screen.getByRole('cell', {  name: /endor/i})
    expect(endorPlanet).toBeInTheDocument();
  });
});
