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


updateColor = colors => {

  this.setState({color: colors.color});
}