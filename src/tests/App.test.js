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

   test('se a filtra todos planetas com populacao menor que 20000', async () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>)
    const compareFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(compareFilter, 'menor que')
    const valueFilter = screen.getByTestId('value-filter')
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '20000')
    const btnFiltrar = screen.getByTestId('button-filter');
    userEvent.click(btnFiltrar)
    const planets = await screen.findAllByTestId('planet-name')
    expect(planets).toHaveLength(1)

   })

   test('se a filtra todos planetas com periodo orbital maior que 350 e limpa os filtros', async () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>)
    const colFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(colFilter, 'orbital_period')
    const compareFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(compareFilter, 'maior que')
    const valueFilter = screen.getByTestId('value-filter')
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '350')
    const btnFiltrar = screen.getByTestId('button-filter');
    userEvent.click(btnFiltrar)
    const planets = await screen.findAllByTestId('planet-name')
    expect(planets).toHaveLength(7)
    const btnLimpar = screen.getByTestId('button-remove-filters')
    userEvent.click(btnLimpar)
    const allPlanets = await screen.findAllByTestId('planet-name')
    expect(allPlanets).toHaveLength(10)

   })

   test('se a filtra todos planetas com diametro igual a 4900 e depois tira o filtro', async () => {
    render(
      <AppContextProvider>
        <App />
      </AppContextProvider>)
    const colFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(colFilter, 'diameter')
    const compareFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(compareFilter, 'igual a')
    const valueFilter = screen.getByTestId('value-filter')
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '4900')
    const btnFiltrar = screen.getByTestId('button-filter');
    userEvent.click(btnFiltrar)
    const planets = await screen.findAllByTestId('planet-name')
    expect(planets).toHaveLength(1)
    const btnRemoveOneFilter = screen.getByRole('button', {name: 'Remover'})
    userEvent.click(btnRemoveOneFilter)
    const allPlanets = await screen.findAllByTestId('planet-name')
    expect(allPlanets).toHaveLength(10)

   })
  
})
