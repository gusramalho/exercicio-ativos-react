import React, { Component } from 'react';
import reactCSS from 'reactcss';
import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';


import './Portfolio.css';
class Portfolio extends Component {

  state = {}

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


  render() {
  
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

          <th><ColorPicker color={color} onChange={this.handleUpdateColor}></ColorPicker></th>

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