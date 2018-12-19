import React, { Component } from 'react';
import reactCSS from 'reactcss';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';


import './TableActives.css';
class TableActives extends Component {


  state = {
    actives: [],
    currentId: 0,
    capital: 0,
    total: 0,
    totalPercentage: 0,
    locked: true,
    color:  '#e5e5e5',
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
        color:  '#e5e5e5',
      });

    }
  }

  getActive = id => this.state.actives.filter(active => active.id === id);

  total = actives => actives.reduce((total, active) => total + active.value, 0);

  percentage = active => (this.state.capital !== 0) ? (active.value / this.state.capital * 100) : 0;

  totalPercentage = actives => actives.reduce((total, active) => total + active.percentage, 0);

  addActive = () => {
    const { actives, currentId } = this.state;

    this.setState({
      actives: [...actives, { id: currentId + 1, name: 'ativo', value: 0, percentage: 0 }],
      currentId: currentId + 1
    });
  }


  removeActive = event => {
    const { actives, locked, capital } = this.state;
    let updatedActives = actives.filter(active => active.id !== Number(event.target.dataset.active));

    const updatedTotal = this.total(updatedActives);

    if (locked)
      updatedActives = updatedActives.map(active => ({ ...active, percentage: (updatedTotal !== 0) ? active.value / updatedTotal * 100 : 0 }));

    this.setState({
      actives: updatedActives,
      capital: (locked) ? updatedTotal : capital,
      total: updatedTotal,
      totalPercentage: this.totalPercentage(updatedActives),
    });

  }

  updateValue = event => {

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

  updatePercentage = event => {

    const { actives, capital, locked, totalPercentage } = this.state;
    const percentage = Number(event.target.value);
    const id = Number(event.target.dataset.active);

    let updatedActives = actives.map(active => (active.id === id) ? { ...active, percentage } : active);

    if (!locked) {

      updatedActives = updatedActives.map(active => (active.id === id) ? { ...active, value: percentage / 100 * capital } : active);

      this.setState({
        actives: updatedActives,
        capital,
        total: this.total(updatedActives),
        totalPercentage: this.totalPercentage(updatedActives),
      })

    } else {


      const totalCapital = 100 * capital / totalPercentage;
     
      updatedActives = updatedActives.map(active => (active.id === id) ? { ...active, value: percentage / 100 * totalCapital } : active);
   
      this.setState({
        actives: updatedActives,
        capital:  this.total(updatedActives),
        total: this.total(updatedActives),
        totalPercentage: this.totalPercentage(updatedActives),
      });
      
    }

  }

  updateCapital = event => {

    const { actives, locked } = this.state;
    const capital = Number(event.target.value);


    if (!locked) {
      const updatedActives = actives.map(active => ({ ...active, value: active.percentage * capital / 100 }));

      this.setState({
        actives: updatedActives,
        capital,
        total: this.total(updatedActives),
        totalPercentage: this.totalPercentage(updatedActives),
      })

    } else {

      const updatedActives = actives.map(active => ({ ...active, percentage: active.value / capital * 100 }));
      
      this.setState({
        actives: updatedActives,
        capital,
        total: this.total(updatedActives),
        totalPercentage: this.totalPercentage(updatedActives),
        locked: false,
      })

    }

  }


  renderTotalPercentage = (percent) => {

    if (percent.toFixed(2) !== '100.00' ) 
      return (<th  className="active-percent"> {percent.toFixed(2)}%</th>) 
    else
      return (<th> {percent.toFixed(2)}%</th>)
    
  }

  updateColor = colors => {

    this.setState({color: colors.color});
  }

  render() {
    const { actives, capital, totalPercentage, total, color } = this.state;

    const styles = reactCSS({

      'default': {
        color: {
          borderColor: color,
        },  
      },
    });


    return (
      <div className='table-actives'>
        <hr style={styles.color} ></hr>
        <table>
          <th className="active-name">Ativos({actives.length})</th>
          <th className="active-total">
            R$<input type="number" value={capital.toFixed(2)} onChange={this.updateCapital} />
            <br></br><span>(Restante: {(capital - total).toFixed(2)})</span>
          </th>

          {this.renderTotalPercentage(totalPercentage)}

          <th><ColorPicker color={this.state.color} onChange={this.updateColor}></ColorPicker></th>

          {
            actives.map(active => {
              return (

                <tr>
                  <td className="active-name">{active.name.toUpperCase()}</td>
                  <td>R$<input type="number" data-active={active.id} value={active.value.toFixed(2)} onChange={this.updateValue} /></td>
                  <td><input type="number" data-active={active.id} value={active.percentage.toFixed(2)} onChange={this.updatePercentage} /></td>
                  <td><a className="btn-remove" data-active={active.id} onClick={this.removeActive}>X</a></td>
                </tr>

              );
            })
          }


        </table>
        <br></br>
        <button className="btn-add" onClick={this.addActive}>Adicionar ativo</button>
      </div>

    );
  }

}

export default TableActives;