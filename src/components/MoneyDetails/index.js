import './index.css'

const MoneyDetails = props => {
  const {income, expense, balance} = props
  return (
    <div className="money-card-div">
      <div className="balance-card">
        <img
          alt="balance"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        />
        <div className="card-text">
          <p>Your Balance</p>
          <p testid="balanceAmount">Rs {balance}</p>
        </div>
      </div>
      <div className="income-card">
        <img
          alt="income"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        />
        <div className="card-text">
          <p>Your Income</p>
          <p testid="incomeAmount">Rs {income}</p>
        </div>
      </div>
      <div className="expense-card">
        <img
          alt="expenses"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        />
        <div className="card-text">
          <p>Your Expenses</p>
          <p testid="expensesAmount">Rs {expense}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
