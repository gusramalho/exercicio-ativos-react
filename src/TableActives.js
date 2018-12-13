import React, { Component } from 'react';

class TableActives extends Component {


	state = {
    actives: [],
    currentId: 0,
    capital: 0,
    total: 0,
    locked: false,
  }
  
  componentDidMount(){
    const { actives } = this.props;

    if (actives !== undefined){

      this.setState({
        actives, 
        currentId: actives.length-1, 
        locked: true,
        capital: actives.reduce((total, active) => total + active.value, 0)
      });
    
    }
  }

  getActive = (id) => this.state.actives.filter(active => active.id === id);

  total = (actives) => actives.reduce((total, active) => total + active.value, 0);

  percentage = (active) => (this.state.capital !== 0) ? (active.value / this.state.capital * 100 ) : 0;

  totalPercentage = (actives) => actives.reduce((total, active) => total + this.percentage(active), 0);

  addActive = () => {
    const { actives, currentId } = this.state; 
    this.setState({actives: [...actives, {id: currentId+1, name: 'ativo', value: 0, percentage: 0}], currentId: currentId+1})
  }

  removeActive = (event) => {
    const { actives } = this.state;
    this.setState({actives: actives.filter(active => active.id !== Number(event.target.dataset.active))});
  }

  updateActive = (id, updatedValue, updatedPercentage) => {

    const { actives, locked, capital } = this.state;

    const updatedActives = actives.map(active => (active.id === id) ? {...active, value: updatedValue, percentage: updatedPercentage} : active);
    const updatedTotal = this.total(updatedActives);
    
    this.setState({
      actives: updatedActives,
      total: updatedTotal,
      capital: (locked) ? capital : updatedTotal,
     });
  }

  updateValue = (event) => {
    const { actives, locked, capital } = this.state;
    const newValue = Number(event.target.value);
    const id = Number(event.target.dataset.active);
    
    const updatedActives = actives.map(active => (active.id === id) ? {...active, value: newValue} : active);
    
    const updatedCapital = (locked) ? capital : this.total(updatedActives);

    const newPercentage = newValue/updatedCapital * 100;

    this.updateActive(id, newValue, newPercentage);
    
  }

  updatePercentage = (event) => {

    const { actives, locked, capital } = this.state;
    const newPercentage = Number(event.target.value);
    const id = Number(event.target.dataset.active);

    const updatedActives = actives.map(active => (active.id === id) ? {...active, percentage: newPercentage} : active);

    const updatedCapital = (!locked) ? capital : this.totalPercentage(updatedActives) * capital / 100;
    
    const newValue = newPercentage/100 * updatedCapital;

    this.updateActive(id, newValue, newPercentage);
  }

  

  render(){
    const { actives, capital } = this.state;

    return(

      <table>
        <th>Ativos({actives.length})</th>
        <th>R$<input type="number" value={capital}/></th>
        <th>{this.totalPercentage(actives).toFixed(2)}%</th>

        {
          actives.map(active => {
            return (
              <tr>
                <td>{active.name}</td>
                <td>R$ <input type="number" data-active={active.id} value={active.value.toFixed(2)} onChange={this.updateValue}/></td>
		        	  <td><input type="number" data-active={active.id} value={active.percentage.toFixed(2)} onChange={this.updatePercentage} /></td>
			          <td><button data-active={active.id} onClick={this.removeActive}>X</button></td>
              </tr>

            );
          })
        }

        <button onClick={this.addActive}>a</button>
      </table>
      
    );
  }

}

export default TableActives;