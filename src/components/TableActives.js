import React, { Component } from 'react';

import './TableActives.css';
class TableActives extends Component {


  state = {
    actives: [],
    currentId: 0,
    capital: 0,
    total: 0,
    totalPercentage: 0,
    locked: true,
  }

  componentDidMount() {
    const { actives } = this.props;

    if (actives !== undefined) {
      const total = actives.reduce((total, active) => total + active.value, 0);
      this.setState({
        actives,
        currentId: actives.length - 1,
        locked: false,
        capital: total,
        total: total,
        totalPercentage: this.totalPercentage(actives),
      });

    }
  }

  getActive = (id) => this.state.actives.filter(active => active.id === id);

  total = (actives) => actives.reduce((total, active) => total + active.value, 0);

  percentage = (active) => (this.state.capital !== 0) ? (active.value / this.state.capital * 100) : 0;

  totalPercentage = (actives) => actives.reduce((total, active) => total + active.percentage, 0);

  addActive = () => {
    const { actives, currentId } = this.state;

    this.setState({
      actives: [...actives, { id: currentId + 1, name: 'ativo', value: 0, percentage: 0 }],
      currentId: currentId + 1
    });
  }


  removeActive = (event) => {
    const { actives, locked, capital } = this.state;
    let updatedActives = actives.filter(active => active.id !== Number(event.target.dataset.active));

    const updatedTotal = this.total(updatedActives);

    if (locked)
      updatedActives = updatedActives.map(active => ({ ...active, percentage: active.value / updatedTotal * 100 }));

    this.setState({
      actives: updatedActives,
      capital: (locked) ? updatedTotal : capital,
      total: updatedTotal,
      totalPercentage: this.totalPercentage(updatedActives),
    });

  }

  updateValue = (event) => {

    const { actives, capital, locked } = this.state;
    const value = Number(event.target.value);
    const id = Number(event.target.dataset.active);

    let updatedActives = actives.map(active => (active.id === id) ? { ...active, value } : active);
    const updatedTotal = this.total(updatedActives);

    if (locked)
      updatedActives = updatedActives.map(active => ({ ...active, percentage: active.value / updatedTotal * 100 }));
    else
      updatedActives = updatedActives.map(active => (active.id === id) ? { ...active, percentage: active.value / capital * 100 } : active);

    this.setState({
      actives: updatedActives,
      capital: (locked) ? updatedTotal : capital,
      total: updatedTotal,
      totalPercentage: this.totalPercentage(updatedActives),
    })

  }

  updatePercentage = (event) => {

    const { actives, capital, locked } = this.state;
    const percentage = Number(event.target.value);
    const id = Number(event.target.dataset.active);

    let updatedActives = actives.map(active => (active.id === id) ? { ...active, percentage } : active);

    if (!locked) {

      updatedActives = updatedActives.map(active => (active.id === id) ? { ...active, value: percentage / 100 * capital } : active);

      this.setState({
        actives: updatedActives,
        capital: (locked) ? capital : capital,
        total: this.total(updatedActives),
        totalPercentage: this.totalPercentage(updatedActives),
      })
    }

  }



  render() {
    const { actives, capital, totalPercentage } = this.state;

    return (
      <div className='table-actives'>
        <table>
          <th class="active-name">Ativos({actives.length})</th>
          <th>R$<input type="number" value={capital} /></th>
          <th>{totalPercentage.toFixed(2)}%</th>
          <th>X</th>

          {
            actives.map(active => {
              return (

                <tr>
                  <td className="active-name">{active.name.toUpperCase()}</td>
                  <td>R$ <input type="number" data-active={active.id} value={active.value.toFixed(2)} onChange={this.updateValue} /></td>
                  <td><input type="number" data-active={active.id} value={active.percentage.toFixed(2)} onChange={this.updatePercentage} /></td>
                  <td><a className="btn-remove"data-active={active.id} onClick={this.removeActive}>X</a></td>
                </tr>

              );
            })
          }


        </table>
        
        <button className="btn-add" onClick={this.addActive}>Adicionar ativo</button>
      </div>

    );
  }

}

export default TableActives;