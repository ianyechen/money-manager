import React from 'react';
import { Redirect } from 'react-router';
import { withStyles } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

// imports for sorting buttons 
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// imports for drawer
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import './spendings.css'
// import { data } from './data'

import TableComp from '../Table'
import PieChart from '../Investments/PieChart'

// getting the config settings variable 
import CONFIG from '../../config'
const API_HOST = CONFIG.api_host

const useStyles = () => ({
  drawer_paper: {
    position: "relative",
    height: "100%"
  },
  menu_list: {
    width: "15vw",
    marginTop: "5%",
    marginLeft: "1vw",
    marginRight: "1vw"
  },
  menu_item: {
    width: "15vw",
    marginTop: "5%",
  },
  formControl_root: {
    outline: "none",
    minWidth: "15vw"
  },
  listItem_buttonSelected: {
    backgroundColor: deepPurple[100],
    '&:hover': {
      backgroundColor: deepPurple[100]
    }
  },
  listItem_button: {
    backgroundColor: ""
  },
  accountBalance: {
    backgroundColor: deepPurple[100],
  },
  accountBalanceDiv: {
    marginTop: "5%",
    right: "10%",
    textAlign: "center",
    position: "absolute",
    top: "75%",
    minWidth: "30vw",
    display: "inline-block",
    borderRadius: "25px",
    padding: "20px",
    backgroundColor: deepPurple[100],
    zIndex: "-1",
  }
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[800],
    },
    secondary: {
      main: deepPurple[100],
    }
  },
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },
});

class Spendings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // the headings to appear in the header bar 
      transactions_headings: ["Date", "Amount", "Description", "Category"],
      // the options for each transaction for the table to know which kind of cell to display
      transactions_options: ["Date", "Dollar", "Any", "Select"],
      // a list of the categories that the transaction falls under 
      transactions_categories: [],
      // the data to appear in each rows of the table, the transactions for a specific year and month
      transactions_data: [],
      // the entire data for all years and all months
      entire_data: [],
      // the net balance on the account 
      accountBalance: 0,
      // current sorting by string, default is sort by date
      sortBy: "Date",
      // sorting in an ascending/descending order
      sortDes: {
        "Date": false,
        "Amount": false,
        "Category": false
      },
      // true for displaying the drawer (sidebar for months), false to hide
      openDrawer: false,
      // the array used for displaying the pie chart, will contain array of objects, key is the category, value is the total spending of that category
      sumForCategories: [],
      // the position for the menu used to create a new spendings page
      menuPosition: null,
      // the month selected for the menu
      newSpendings: { month: "", year: "", projectedSpendings: "" },
      // the projected balance on the selected year and month 
      projectedSpendings: 0,
      // used for changing the colours of the items in the drawer 
      currentlySelectedMonth: { monthIndex: "", yearIndex: "" }
    }

    /***************************************************************************************************************************
    for phase 2, you would be populating "entire_data" in the state and get all the transaction history from the server
    currently, it's just importing from another js file, but we would need to make a server call here to populate that dynamically 
    you would also need to get the transactions_categories from the server since the user can have their own customized categories 
    which would need to be stored in a database 
    ****************************************************************************************************************************/

    // initialize transactions_data
    this.sortEntireData()

    // only initialize if there is any spendings sheet in the database 
    if (this.state.entire_data.length != 0) {
      this.state.transactions_data = this.state.entire_data["0"]["Data"]["0"]["Data"]["Transactions"]
      this.state.projectedSpendings = this.state.entire_data["0"]["Data"]["0"]["Data"]["Projected Spendings"]
      this.state.currentlySelectedMonth["monthIndex"] = "0"
      this.state.currentlySelectedMonth["yearIndex"] = "0"

      this.setState({
        transactions_data: this.state.transactions_data,
        projectedSpendings: this.state.projectedSpendings,
        currentlySelectedMonth: this.state.currentlySelectedMonth
      })
    }

    this.sumCategoriesAmount()
    this.sumAccountBalance()

  }

  // conversion from numbers representation to letter representation of months 
  numbersToMonth = {
    "1": "Jan", "2": "Feb", "3": "Mar", "4": "Apr", "5": "May", "6": "Jun",
    "7": "Jul", "8": "Aug", "9": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
    "Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", "Jun": "6",
    "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", "Nov": "11", "Dec": "12"
  }

  componentDidUpdate(undefined, prevState) {
    // only update the account balance if any transaction has been modified
    if (prevState.transactions_data != this.state.transactions_data) {
      this.sumAccountBalance()
      this.sumCategoriesAmount()
    }
  }

  componentDidMount() {

    // populate the data variable in the state upon mount 
    const url = `${API_HOST}/spendings/transactions`
    const request = new Request(url, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {
        this.setState({ entire_data: data.spendings, transactions_categories: data.categories })
      })
      .catch(error => {
        console.log(error)
      })

  }

  sumAccountBalance = () => {
    this.state.accountBalance = this.state.transactions_data.reduce((total, current) => {
      let sum = parseFloat(total) + parseFloat(current["Amount"])
      sum = sum.toFixed(2)
      return sum
    }, 0)
    this.setState({ accountBalance: this.state.accountBalance })
  }

  sumCategoriesAmount = () => {

    this.state.sumForCategories = []

    this.state.transactions_data.map(transaction => {
      const category = transaction["Category"]
      let index = this.state.sumForCategories.findIndex(x => x.Name == category)
      if (index == -1) {
        this.state.sumForCategories.push({ "Name": category, "Book Cost": 0 })
        index = this.state.sumForCategories.length - 1
      }
      this.state.sumForCategories[index]["Book Cost"] += parseFloat(transaction["Amount"])
    })

    this.setState({ sumForCategories: this.state.sumForCategories })

  }

  sortObj = (a, b) => {

    switch (this.state.sortBy) {

      case "Date":
        if (!this.state.sortDes["Date"]) {
          if (a["Date"] < b["Date"]) return -1
          else return 1
        }
        else {
          if (a["Date"] > b["Date"]) return -1
          else return 1
        }

      case "Amount":
        if (!this.state.sortDes["Amount"]) {
          if (parseFloat(a["Amount"]) < parseFloat(b["Amount"])) return -1
          else return 1
        }
        else {
          if (parseFloat(a["Amount"]) > parseFloat(b["Amount"])) return -1
          else return 1
        }

      case "Category":
        if (!this.state.sortDes["Category"]) {
          if (a["Category"] < b["Category"]) return -1
          else return 1
        }
        else {
          if (a["Category"] > b["Category"]) return -1
          else return 1
        }

      case "Default":
        return

    }

  }

  // sorting the transactions based on the currently selected element 
  sortTransactions = () => {
    this.state.transactions_data.sort(this.sortObj)
    this.setState({ transactions_data: this.state.transactions_data })
  }

  // add newTransaction to the beginning of the transactions_data array 
  addTransaction = (newTransaction) => {
    // this.state.transactions_data.unshift(newTransaction)
    // this.setState({ transactions_data: this.state.transactions_data })
    /********************************************************************************
    for phase 2, you would be making a server call to add this transaction to the data
    *********************************************************************************/

    const body = newTransaction
    const yearIndex = this.state.currentlySelectedMonth.yearIndex
    const monthIndex = this.state.currentlySelectedMonth.monthIndex

    const url = `${API_HOST}/spendings/transaction/${yearIndex}/${monthIndex}`
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {
        this.setState({ transactions_data: data })
        this.sumAccountBalance()
        this.sumCategoriesAmount()
      })
      .catch(error => {
        console.log(error)
      })

  }

  // finds the index of the oldTransaction data and replace it with the newTransaction data
  editTransaction = (oldTransaction, newTransaction) => {
    // const index = this.state.transactions_data.findIndex(t => t === oldTransaction)
    // this.state.transactions_data[index] = newTransaction
    // this.setState({ transactions_data: this.state.transactions_data })

    newTransaction._id = oldTransaction._id

    const body = newTransaction
    const yearIndex = this.state.currentlySelectedMonth.yearIndex
    const monthIndex = this.state.currentlySelectedMonth.monthIndex

    const url = `${API_HOST}/spendings/transaction/${yearIndex}/${monthIndex}`
    const request = new Request(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {
        this.setState({ transactions_data: data })
        this.sumAccountBalance()
        this.sumCategoriesAmount()
      })
      .catch(error => {
        console.log(error)
      })
    /********************************************************************************
    for phase 2, you would be making a server call to edit this transaction to the data
    *********************************************************************************/

  }

  // deletes transaction from transactions_data array 
  deleteTransaction = (transaction) => {
    // const keepTransactions = this.state.transactions_data.filter(t => t !== transaction)
    // this.setState({ transactions_data: keepTransactions })

    const body = transaction
    const yearIndex = this.state.currentlySelectedMonth.yearIndex
    const monthIndex = this.state.currentlySelectedMonth.monthIndex

    const url = `${API_HOST}/spendings/transaction/${yearIndex}/${monthIndex}`
    const request = new Request(url, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {
        this.setState({ transactions_data: data })
      })
      .catch(error => {
        console.log(error)
      })

    /********************************************************************************
    for phase 2, you would be making a server call to delete this transaction to the data
    *********************************************************************************/
  }

  // adds a user defined category 
  addCategory = (newCategory) => {

    const body = {
      newCategory: newCategory
    }

    const url = `${API_HOST}/spendings/categories`
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {
        this.setState({ transactions_categories: data })
      })
      .catch(error => {
        console.log(error)
      })
    /********************************************************************************
    for phase 2, you would be making a server call to add a customized category to the data
    *********************************************************************************/
  }

  // deletes a user defined category (the default cannot be deleted)
  deleteCategory = (category) => {
    // const keepCategories = this.state.transactions_categories.filter(c => c !== category)
    // this.setState({ transactions_categories: keepCategories })

    const body = {
      deleteCategory: category
    }

    const url = `${API_HOST}/spendings/categories`
    const request = new Request(url, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {
        this.setState({ transactions_categories: data })
      })
      .catch(error => {
        console.log(error)
      })

    /********************************************************************************
    for phase 2, you would be making a server call to delete a customized category to the data
    *********************************************************************************/
  }

  changeSort(sortBy) {
    this.state.sortBy = sortBy
    this.setState({ sortBy: this.state.sortBy })
    this.state.sortDes[sortBy] = !this.state.sortDes[sortBy]
    this.setState({ sortDes: this.state.sortDes })
    this.sortTransactions()
  }

  toggleDrawer = () => {
    this.state.openDrawer = !this.state.openDrawer
    this.setState({ openDrawer: this.state.openDrawer })
  }

  hideAddNewMonth = () => {
    this.setState({ menuPosition: null })
  }

  displayAddNewMonth = (e) => {
    this.setState({ menuPosition: e.currentTarget })
  }

  // to update the months on the select for the menu
  selectFieldOnChangeHandler = (e) => {
    this.state.newSpendings.month = e.target.value
    this.setState({ newSpendings: this.state.newSpendings })
  }

  updateSpendingsYear = (e) => {
    if (isNaN(e.target.value)) return
    this.state.newSpendings.year = e.target.value
    this.setState({ newSpendings: this.state.newSpendings })
  }

  updateSpendingsProjected = (e) => {
    if (isNaN(e.target.value)) return
    this.state.newSpendings.projectedSpendings = e.target.value
    this.setState({ newSpendings: this.state.newSpendings })
  }

  createNewSpendings() {

    if (this.state.newSpendings.year == "" || this.state.newSpendings.month == "" || this.state.newSpendings.projectedSpendings == "") return

    const year = this.state.newSpendings.year
    const month = this.numbersToMonth[this.state.newSpendings.month.substr(0, 3)]
    const projectedSpendings = parseFloat(this.state.newSpendings.projectedSpendings).toFixed(2)

    const body = {
      year: year,
      month: month,
      projectedSpendings: projectedSpendings
    }

    const url = `${API_HOST}/spendings/sheet`
    const request = new Request(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })

    fetch(request)
      .then(res => res.json())
      .then(data => {

        this.state.entire_data = data

        // sorting data again so it's in order 
        this.sortEntireData()
        this.setState({ entire_data: this.state.entire_data })

        // resetting form and closing menu 
        Object.keys(this.state.newSpendings).map(heading => {
          this.state.newSpendings[heading] = ""
        })
        this.state.menuPosition = null
        this.setState({ newSpendings: this.state.newSpendings, menuPosition: this.state.menuPosition })
      })
      .catch(error => {
        console.log(error)
      })

    /********************************************************************************
    for phase 2, you would be making a server call to add a new spendings page for a new month and year 
    *********************************************************************************/
  }

  // sorting the entire dataset for transactions of all months and years 
  sortEntireData() {
    this.state.entire_data.map((yearObj, index) => {
      this.state.entire_data[index]["Data"].sort(this.sortDataByKey)
    })
    this.state.entire_data.sort(this.sortDataByKey)
  }

  sortDataByKey(a, b) {
    // keys can be either month or year, want the latest to be on top 
    const keyA = "Year" in a ? parseInt(a["Year"]) : parseInt(a["Month"])
    const keyB = "Year" in b ? parseInt(b["Year"]) : parseInt(b["Month"])
    if (keyA > keyB) return -1
    else return 1
  }

  // when clicking the months on the drawer, need to update the transactions_data in state for the table 
  monthsOnClickHandler(e, yearIndex, monthIndex, year, month) {
    this.state.transactions_data = this.state.entire_data[yearIndex]["Data"][monthIndex]["Data"]["Transactions"]
    this.state.currentlySelectedMonth["yearIndex"] = yearIndex
    this.state.currentlySelectedMonth["monthIndex"] = monthIndex
    this.setState({
      transactions_data: this.state.transactions_data,
      projectedSpendings: this.state.entire_data[yearIndex]["Data"][monthIndex]["Data"]["Projected Spendings"],
      currentlySelectedMonth: this.state.currentlySelectedMonth
    })
    this.sumAccountBalance()
    this.sumCategoriesAmount()
  }

  // renders the months for a specific year in the drawer
  renderMonths(yearObj, index) {
    let months = []
    this.state.entire_data[index]["Data"].map(monthObj => {
      months.push(this.numbersToMonth[monthObj["Month"]])
    })
    return months
  }

  // get the year from the year index 
  getYearFromIndex(yearIndex) {
    // there will always be only one key, which is the year
    return this.state.entire_data[yearIndex]["Year"]
  }

  // get the year index from the year 
  getIndexFromYear(year) {
    let index = undefined
    this.state.entire_data.map((yearObj, i) => {
      const yearFromObj = yearObj["Year"]
      if (yearFromObj == year) index = i
    })
    return index
  }

  // get the month from the month index 
  getMonthFromIndex(monthIndex, yearIndex, year) {
    // there will always be only one key, which is the month
    return this.state.entire_data[yearIndex]["Data"][monthIndex]["Data"]
  }

  // get the month index from the month
  getIndexFromMonth(month, arr) {
    let index = undefined
    arr.map((yearObj, i) => {
      const monthFromObj = yearObj["Month"]
      if (monthFromObj == month) index = i
    })
    return index
  }

  // check if a key exists in any objects in an array of objects 
  checkIfInArray(key, arr, type) {
    let exists = false
    arr.map(obj => {
      if (obj[type] == key) exists = true
    })
    return exists
  }

  render() {

    const { loggedIn, classes } = this.props

    return (

      loggedIn ?

        <ThemeProvider theme={theme}>

          <div>

            <div className="DrawerDiv">

              {/* <IconButton className="OpenDrawerButton"
                // color="inherit"
                aria-label="open drawer"
                onClick={() => this.toggleDrawer()}
              // edge="start"
              // className={clsx(classes.menuButton, {
              //   [classes.hide]: open,
              // })}
              >
                <MenuIcon />
              </IconButton> */}

              <Drawer
                classes={{ paper: classes.drawer_paper, paperAnchorDocked: classes.drawer_paper }}
                variant="permanent"
              >

                <Menu
                  id="long-menu"
                  anchorEl={this.state.menuPosition}
                  open={Boolean(this.state.menuPosition)}
                  onClose={() => this.hideAddNewMonth()}
                  classes={{ list: classes.menu_list }}
                >

                  <FormControl
                    classes={{ root: classes.formControl_root }}
                  >

                    <InputLabel id="simple-select-label">Month</InputLabel>
                    <Select
                      id="simple-select"
                      defaultValue={this.state.newSpendings.month}
                      onChange={(e) => this.selectFieldOnChangeHandler(e)}
                    >

                      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month =>
                        <MenuItem
                          value={month}>
                          {month}
                        </MenuItem>
                      )}

                    </Select>

                  </FormControl>

                  <TextField onKeyDown={e => e.stopPropagation()}
                    id="standard-basic"
                    label="Year"
                    classes={{ root: classes.menu_item }}
                    value={this.state.newSpendings.year}
                    onChange={(e) => this.updateSpendingsYear(e)}
                  />

                  <TextField onKeyDown={e => e.stopPropagation()}
                    id="standard-basic"
                    label="Projected Spendings"
                    classes={{ root: classes.menu_item }}
                    value={this.state.newSpendings.projectedSpendings}
                    onChange={(e) => this.updateSpendingsProjected(e)}
                  />

                  <Button
                    variant="outlined"
                    color="primary"
                    classes={{ root: classes.menu_item }}
                    size="small"
                    onClick={() => this.createNewSpendings()}
                  >
                    Add New Spendings Page
                  </Button>

                </Menu>

                <IconButton
                  aria-label="add"
                  onClick={(e) => this.displayAddNewMonth(e)}>
                  <AddIcon />
                </IconButton>
                <Divider />

                <div>
                  {this.state.entire_data.map((yearObj, yearIndex) => (
                    <div>

                      <Typography
                        color="textSecondary"
                        display="block"
                        variant="caption"
                        align="center"
                      >
                        {<p>{yearObj["Year"]}</p>}
                      </Typography>

                      <List>
                        {this.renderMonths(yearObj, yearIndex).map((month, monthIndex) => (
                          <ListItem
                            className={(this.state.currentlySelectedMonth["yearIndex"] == yearIndex && this.state.currentlySelectedMonth["monthIndex"] == monthIndex) ? classes.listItem_buttonSelected : classes.listItem_button}
                            button
                            key={month}
                            onClick={(e) => this.monthsOnClickHandler(e, yearIndex, monthIndex, this.getYearFromIndex(yearIndex), month)}>
                            <ListItemText primary={month} />
                          </ListItem>
                        ))}
                      </List>

                    </div>
                  ))}
                </div>

              </Drawer>

            </div>

            <div className="Content">

              <div className="Chart">

                <PieChart
                  listToDisplay={this.state.sumForCategories}
                  pieChartSize={600}
                  pieChartRadius={150}
                >

                </PieChart>

                <div className={classes.accountBalanceDiv}>
                  <Typography variant="h5" className={classes.accountBalance}>
                    Total Amount: ${this.state.accountBalance}
                    <br></br>
                    Projected Spendings: ${this.state.projectedSpendings}
                  </Typography>
                </div>

              </div>

              <div className="Table">

                <TableComp
                  // use the TableContainer class to style the table itself 
                  classes={{ TableContainer: 'TableContainer' }}
                  headings={this.state.transactions_headings}
                  data={this.state.transactions_data}
                  options={this.state.transactions_options}
                  categories={this.state.transactions_categories}
                  addRow={this.addTransaction}
                  editRow={this.editTransaction}
                  removeRow={this.deleteTransaction}
                  addCategory={this.addCategory}
                  removeCategory={this.deleteCategory}
                />

                <div className="SortButtons">

                  <Grid container spacing={3}>

                    <Grid item xs={4}>
                      <Paper>
                        <Button
                          className="SortButton"
                          variant={this.state.sortBy == "Date" ? "contained" : "outlined"}
                          color="primary"
                          onClick={() => this.changeSort("Date")}>
                          Sort By Date
                          {this.state.sortDes["Date"] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                        </Button>
                      </Paper>
                    </Grid>

                    <Grid item xs={4}>
                      <Paper>
                        <Button
                          className="SortButton"
                          variant={this.state.sortBy == "Amount" ? "contained" : "outlined"}
                          color="primary"
                          onClick={() => this.changeSort("Amount")}>
                          Sort By Amount
                          {this.state.sortDes["Amount"] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                        </ Button>
                      </Paper>
                    </Grid>

                    <Grid item xs={4}>
                      <Paper>
                        <Button
                          className="SortButton"
                          variant={this.state.sortBy == "Category" ? "contained" : "outlined"}
                          color="primary"
                          onClick={() => this.changeSort("Category")}>
                          Sort By Category
                          {this.state.sortDes["Category"] ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                        </Button>
                      </Paper>
                    </Grid>

                  </Grid>

                </div>

              </div>

            </div>

          </div >

        </ThemeProvider >

        : <Redirect to="/login" />

    )

  }

}

export default withStyles(useStyles)(Spendings);