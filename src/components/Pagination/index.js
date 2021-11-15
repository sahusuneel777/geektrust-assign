import './index.css'

const Pagination = props => {
  const {pageNo, ChangePage, isActive} = props
  const activebtnClass = isActive ? 'active-button' : 'button-item'

  const onClickChangePage = () => {
    ChangePage(pageNo)
  }

  return (
    <button
      type="button"
      onClick={onClickChangePage}
      className={activebtnClass}
    >
      {pageNo}
    </button>
  )
}

export default Pagination
