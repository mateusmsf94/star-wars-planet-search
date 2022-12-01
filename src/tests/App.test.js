import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './mockData';
import { AppContextProvider } from '../context/AppProvider';
import userEvent from '@testing-library/user-event';

describe('<App />', () => { 
  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData)
  }))

  test('se todos os filtros são renderizados', async () => {
    render(
    <AppContextProvider>
      <App />
    </AppContextProvider>)
    const inputSearch = screen.getByTestId('name-filter')
    const colFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    expect(inputSearch).toBeInTheDocument();
    expect(colFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
  })

  test('se o cabecalho da tabela eh renderizado', () => {
    render(
    <AppContextProvider>
      <App />
    </AppContextProvider>)

    const Name = screen.getByRole('columnheader', {  name: /name/i});
    const Rotation = screen.getByRole('columnheader', {  name: /rotation period/i});
    const Orbital = screen.getByRole('columnheader', {  name: /orbital period/i});
    const Diameter = screen.getByRole('columnheader', {  name: /diameter/i});
    const Climate = screen.getByRole('columnheader', {  name: /climate/i});
    const Gravity = screen.getByRole('columnheader', {  name: /gravity/i});
    const Terrain = screen.getByRole('columnheader', {  name: /terrain/i});
    const Surface = screen.getByRole('columnheader', {  name: /surface water/i});
    const Population = screen.getByRole('columnheader', {  name: /population/i});

    expect(Name).toBeInTheDocument()
    expect(Rotation).toBeInTheDocument()
    expect(Orbital).toBeInTheDocument()
    expect(Diameter).toBeInTheDocument()
    expect(Climate).toBeInTheDocument()
    expect(Gravity).toBeInTheDocument()
    expect(Terrain).toBeInTheDocument()
    expect(Surface).toBeInTheDocument()
    expect(Population).toBeInTheDocument()
  });

  test('se o filtro de nome funciona', async () => { 
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>)
    const inputSearch = screen.getByTestId('name-filter')
    userEvent.type(inputSearch, 'Tatooine')
    const tatooine = await screen.findByText(/Tatooine/i)
    expect(tatooine).toBeInTheDocument()
    expect(screen.queryByText('Kamino')).not.toBeInTheDocument()
    expect(screen.queryByText('Dagobah')).not.toBeInTheDocument()
   })

   test('se o filtro maior que funciona', async () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>)
    
    const colFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const select = screen.getByTestId('comparison-filter');
    fireEvent.change(select, {
      target: { value: 'menor que'}
    })
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '1001')
    userEvent.click(btnFilter)
    expect(screen.getAllByRole('row')).toHaveLength(9)

   })
  
})
