import React from 'react';
import Input from './Input'
import StockList from './StockList'
import Canvas from './PieChartReact'

class Investments extends React.Component {

  state = {
    totalAmountInvested: 100,
    ticker: 0,
    quantity: 0,
    price: 0,
    avgCost: 0,
    mktValue: 0,
    bookCost: 0,
    gainLoss: 0,
    percentageOfPortfolio:0,
    stockList: [{name: "abc", quantity: 1, price: 1.0, avgCost: 1.0, mktValue: 1, bookCost: 100, gainLoss:0, percentageOfPortfolio:100 }],
  }


  handleInputStock = () => {
    console.log("Handling input stock");
    console.log(this.state.bookCost)
    console.log(this.state.totalAmountInvested)
    let a =Number(this.state.quantity)* Number(this.state.price)
    console.log(Number(this.totalAmountInvested)+Number(a))
    const stock = {
      name:this.state.name,//no query selector..
      quantity: this.state.quantity,
      price: this.state.price,
      avgCost: this.state.avgCost,
      mktValue: this.state.mktValue,
      bookCost: Number(this.state.quantity)* Number(this.state.price),
      gainLoss: this.state.gainLoss,
      percentageOfPortfolio:(Number(this.state.bookCost)/(Number(this.state.bookCost)+Number(this.state.totalAmountInvested)))*100,
      totalAmountInvested: Number(this.totalAmountInvested)+Number(this.bookCost)
    }
    const currList = this.state.stockList
    console.log(currList)
    currList.push(stock)
    this.setState({
      stockList:currList
    })

    console.log(Number(stock.totalAmountInvested))


    console.log(currList)
    for(let i = 0; i < this.state.stockList.length; i++){
      let allStocks = [...this.state.stockList];
      // 2. Make a shallow copy of the item you want to mutate
      let currentStock = {...allStocks[i]};
      // 3. Replace the property you're intested in
      console.log(Number(currentStock.bookCost))
      console.log(Number(currentStock.totalAmountInvested))
      currentStock.percentageOfPortfolio = Number(currentStock.bookCost)/Number(currentStock.totalAmountInvested);
      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      allStocks[i] = currentStock;
      // 5. Set the state to our new copy
      this.setState({allStocks});


      // console.log(this.state.stockList[i].percentageOfPortfolio)
      // this.state.stockList[i].percentageOfPortfolio = Number(this.state.stockList[i].bookCost)/Number(this.state.stockList[i].totalAmountInvested)
      // console.log(this.state.stockList[i].percentageOfPortfolio)
    }

  }

  handleInputChange = (event) =>{
    //this in this function refers to the app
    console.log("Handle input change")
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      //this is bound to App class 
      [name]: value //now the name of the input
      
      //entire state is updated
    })

  }


    //student is the object to reference
  deleteStock = (stock) => {
    //make var because not mutating this 
    console.log("Delete")
    const filteredStock = this.state.stockList.filter((s) => {
      return s !== stock  //the one's we don't want to remove
    })

    this.setState({
      stockList: filteredStock
    })
  }

  editStock = (stock, valueToEdit) => {

    console.log("Editing stock")
    console.log(stock)
    console.log("Value")
    console.log(valueToEdit)
    
  }

  render() {
    return (

      <div>
 
      <Input stockList={this.state.stockList} 
      handleInputStock = {this.handleInputStock} 
      handleInputChange = {this.handleInputChange}
      />
      <StockList stockList={this.state.stockList} deleteStock = {this.deleteStock} editStock = {this.editStock}/>
      
    
      <Canvas stockList = {this.state.stockList}/>
      
      </div>
      

    )

  }

}

export default Investments;

/*  */