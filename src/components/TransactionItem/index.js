import './index.css'

const TransactionItem = props => {
  const {details, delFunc} = props
  const {amount, title, type, id} = details

  const onDelBtn = () => {
    delFunc(id)
  }

  return (
    <li className="li-item">
      <p className="title-para">{title}</p>
      <p className="amount-para">{amount}</p>
      <p className="type-para">{type}</p>
      <button onClick={onDelBtn} testid="delete" className="del-btn">
        <img
          className="delete-img"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        />
      </button>
    </li>
  )
}

export default TransactionItem
