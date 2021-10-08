import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionDetails: [],
    income: 0,
    balance: 0,
    expense: 0,
    titleInput: '',
    amountInput: '',
    typeInput: 'Income',
  }

  delItemFromState = uniqueId => {
    const {transactionDetails} = this.state
    const index = transactionDetails.findIndex(
      transaction => transaction.id === uniqueId,
    )
    const deletedItem = transactionDetails.splice(index, 1)
    if (deletedItem[0].type === 'Expenses') {
      this.setState(prevState => ({
        expense: prevState.expense - deletedItem[0].amount,
        balance: prevState.balance + deletedItem[0].amount,
      }))
    } else {
      this.setState(prevState => ({
        income: prevState.income - deletedItem[0].amount,
        balance: prevState.income - deletedItem[0].amount - prevState.expense,
      }))
    }
    this.setState({
      transactionDetails: [...transactionDetails],
    })
  }

  submitFunc = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state
    const eventType = event.target[2].value
    if (titleInput !== '' && amountInput !== '') {
      const parsedAmount = parseInt(amountInput)
      const data = {
        id: v4(),
        type: typeInput,
        amount: parsedAmount,
        title: titleInput,
      }
      this.setState(prevState => ({
        transactionDetails: [...prevState.transactionDetails, data],
        titleInput: '',
        amountInput: '',
        typeInput: 'Income',
      }))

      if (eventType === 'Income') {
        this.setState(prevState => ({
          income: prevState.income + parsedAmount,
          balance: prevState.balance + parsedAmount,
        }))
      } else {
        this.setState(prevState => ({
          expense: prevState.expense + parsedAmount,
          balance: prevState.balance - parsedAmount,
        }))
      }
    }
  }

  changeStateTitle = event => this.setState({titleInput: event.target.value})

  changeStateAmount = event => this.setState({amountInput: event.target.value})

  changeStateType = event => this.setState({typeInput: event.target.value})

  render() {
    const {
      typeInput,
      titleInput,
      amountInput,
      transactionDetails,
      income,
      balance,
      expense,
    } = this.state
    return (
      <div className="container">
        <div className="card">
          <div className="header">
            <h1>Hi, Richard</h1>
            <p>
              Welcome Back to your <span className="span">Money Manager</span>
            </p>
          </div>
          <MoneyDetails income={income} expense={expense} balance={balance} />
          <div className="bottom-card">
            <form className="form" onSubmit={this.submitFunc}>
              <h5>Add Transactions</h5>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                value={titleInput}
                onChange={this.changeStateTitle}
                id="title"
                placeholder="TITLE"
              />
              <br />
              <label htmlFor="amount">AMOUNT</label>
              <br />
              <input
                value={amountInput}
                onChange={this.changeStateAmount}
                placeholder="AMOUNT"
                id="amount"
              />
              <br />
              <label htmlFor="type">Type</label>
              <br />
              <select
                onChange={this.changeStateType}
                value={typeInput}
                id="type"
              >
                {transactionTypeOptions.map(item => (
                  <option key={item.optionId} id={item.optionId}>
                    {item.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <div className="history">
              <h4>history</h4>
              <div className="history-content-div">
                <div className="history-header">
                  <p className="title-col">Title</p>
                  <p className="amount-col">Amount</p>
                  <p className="type-col">Type</p>
                </div>
                <ul className="u-list">
                  {transactionDetails.map(item => (
                    <TransactionItem
                      key={item.id}
                      delFunc={this.delItemFromState}
                      details={item}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
