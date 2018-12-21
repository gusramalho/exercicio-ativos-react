import React, { Component } from 'react';
import reactCSS from 'reactcss';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';


import './Portfolio.css';
class Portfolio extends Component {

  state = {
    assets: [],
    currentId: 0,
    capital: 0,
    total: 0,
    totalPercentage: 0,
    locked: true,
    color:  '#1c1c1c',
  }

  // componentDidMount() {

    
  //   const { assets } = this.props;

  //   if (assets !== undefined) {
  //     const total = assets.reduce((total, asset) => total + asset.value, 0);

  //     this.setState({
  //       assets,
  //       currentId: assets.length - 1,
  //       locked: false,
  //       capital: total,
  //       total: total,
  //       totalPercentage: this.totalPercentage(assets),
  //       color:  '#1c1c1c',
  //     });

  //   }
  // }

  total = assets => assets.reduce((total, asset) => total + asset.value, 0);

  percentage = asset => (this.state.capital !== 0) ? (asset.value / this.state.capital * 100) : 0;

  totalPercentage = assets => assets.reduce((total, asset) => total + asset.percentage, 0);

  addAsset = () => {
    const { assets, currentId } = this.state;

    this.setState({
      assets: [...assets, { id: currentId + 1, name: 'ativo', value: 0, percentage: 0 }],
      currentId: currentId + 1
    });
  }


  removeAsset = event => {
    const { assets, locked, capital } = this.state;
    let updatedAssets = assets.filter(asset => asset.id !== Number(event.target.dataset.asset));

    const updatedTotal = this.total(updatedAssets);

    if (locked)
      updatedAssets = updatedAssets.map(asset => ({ ...asset, percentage: (updatedTotal !== 0) ? asset.value / updatedTotal * 100 : 0 }));

    this.setState({
      assets: updatedAssets,
      capital: (locked) ? updatedTotal : capital,
      total: updatedTotal,
      totalPercentage: this.totalPercentage(updatedAssets),
    });

  }

  updateValue = event => {

    const { assets, capital, locked } = this.state;
    const value = Number(event.target.value);
    const id = Number(event.target.dataset.asset);

    let updatedAssets = assets.map(asset => (asset.id === id) ? { ...asset, value } : asset);
    const updatedTotal = this.total(updatedAssets);

    if (locked)
      updatedAssets = updatedAssets.map(asset => ({ ...asset, percentage: asset.value / updatedTotal * 100 }));
    else
      updatedAssets = updatedAssets.map(asset => (asset.id === id) ? { ...asset, percentage: asset.value / capital * 100 } : asset);

    this.setState({
      assets: updatedAssets,
      capital: (locked) ? updatedTotal : capital,
      total: updatedTotal,
      totalPercentage: this.totalPercentage(updatedAssets),
    })

  }

  updatePercentage = event => {

    const { assets, capital, locked, totalPercentage } = this.state;
    const percentage = Number(event.target.value);
    const id = Number(event.target.dataset.asset);

    let updatedAssets = assets.map(asset => (asset.id === id) ? { ...asset, percentage } : asset);

    if (!locked) {

      updatedAssets = updatedAssets.map(asset => (asset.id === id) ? { ...asset, value: percentage / 100 * capital } : asset);

      this.setState({
        assets: updatedAssets,
        capital,
        total: this.total(updatedAssets),
        totalPercentage: this.totalPercentage(updatedAssets),
      })

    } else {


      const totalCapital = 100 * capital / totalPercentage;
     
      updatedAssets = updatedAssets.map(asset => (asset.id === id) ? { ...asset, value: percentage / 100 * totalCapital } : asset);
   
      this.setState({
        assets: updatedAssets,
        capital:  this.total(updatedAssets),
        total: this.total(updatedAssets),
        totalPercentage: this.totalPercentage(updatedAssets),
      });
      
    }

  }

  updateCapital = event => {

    const { assets, locked } = this.state;
    const capital = Number(event.target.value);


    if (!locked) {
      const updatedAssets = assets.map(asset => ({ ...asset, value: asset.percentage * capital / 100 }));

      this.setState({
        assets: updatedAssets,
        capital,
        total: this.total(updatedAssets),
        totalPercentage: this.totalPercentage(updatedAssets),
      })

    } else {

      const updatedAssets = assets.map(asset => ({ ...asset, percentage: asset.value / capital * 100 }));
      
      this.setState({
        assets: updatedAssets,
        capital,
        total: this.total(updatedAssets),
        totalPercentage: this.totalPercentage(updatedAssets),
        locked: false,
      })

    }

  }

  handleUpdateValue = e => {

    const { updateValue } = this.props;
    const value = Number(e.target.value);
    const id = Number(e.target.dataset.asset)
   
    updateValue(id, value);

  }

  handleUpdatePercentage = e => {

    const { updatePercentage } = this.props;
    const percentage = Number(e.target.value);
    const id = Number(e.target.dataset.asset);
   
    updatePercentage(id, percentage);
  }

  handleUpdateCapital = e => {
    
    const { updateCapital } = this.props;
    const capital = Number(e.target.value);

    updateCapital(capital);
  }


  handleUpdateColor = colors => {

    const { updateColor } = this.props;
    const { color } = colors;

    updateColor(color);

  }

  updateColor = colors => {

    this.setState({color: colors.color});
  }

  render() {
    // const { capital, totalPercentage, total, color } = this.state;

    const { id, assets, removePortfolio, addAsset, removeAsset, capital, totalPercentage, total, color } = this.props;


  
    const styles = reactCSS({

      'default': {
        hrColor: {
          borderColor: color,
        },  
        iconColor: {
          color,
        }
      },
    });

    return (
      <div className='table-assets'>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous"></link>
        <hr style={styles.hrColor} ></hr>
        <table>
          <th className="asset-name">Ativos({assets.length})</th>
          <th className="asset-total">
            R$<input type="number" value={capital.toFixed(2)} onChange={this.handleUpdateCapital} />
            <br></br><span>(Restante: {(capital - total).toFixed(2)})</span>
          </th>

          <th className={totalPercentage.toFixed(2) === '100.00' || totalPercentage.toFixed(2) === '0.00' ? '' : "asset-percent"}> {totalPercentage.toFixed(2)}%</th>

          <th><ColorPicker color={this.state.color} onChange={this.handleUpdateColor}></ColorPicker></th>

          {
            assets.map(asset => {
              return (
              
                <tr>
                  <td className="asset-name">{asset.name.toUpperCase()}</td>
                  <td>R$<input type="number" data-asset={asset.id} value={asset.value.toFixed(2)} onChange={this.handleUpdateValue}/></td>
                  <td><input type="number" data-asset={asset.id} value={asset.percentage.toFixed(2)} onChange={this.handleUpdatePercentage} /></td>
                  <td><a className="btn-remove" data-asset={asset.id} onClick={() => removeAsset(asset.id)}>X</a></td>
                </tr>
              );
            })
          }

        </table>
        <br></br>
        <div className='footer'>
          <button className="btn-add" onClick={addAsset} style={styles.iconColor} > <i class="fas fa-plus-square"></i> Adicionar ativo</button>
          <button className="btn-remove-portfolio" onClick={removePortfolio} style={styles.iconColor} ><i  class="fas fa-times-circle"></i> Excluir portfolio</button>
        </div>
        <hr style={styles.hrColor}></hr>
      </div>

    );
  }

}

export default Portfolio;