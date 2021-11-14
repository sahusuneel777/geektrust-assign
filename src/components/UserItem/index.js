import {BiEdit} from 'react-icons/bi'
import {AiOutlineDelete} from 'react-icons/ai'
import './index.css'

const UserItem = props => {
  const {userDetails, deleteUserEntry, addToSelectedUsers} = props
  const {id, ischecked, name, email, role} = userDetails

  const onClickDelete = () => {
    deleteUserEntry(id)
  }

  const onChangeCheck = event => {
    addToSelectedUsers(id)
    console.log('checked')
  }

  return (
    <li className="user-item">
      <div className="table-cell">
        <input type="checkbox" checked={ischecked} onChange={onChangeCheck} />
        {/* <input type="checkbox" onChange={onChangeCheck} /> */}
      </div>
      <div className="table-cell">
        <p>{name}</p>
      </div>
      <div className="table-cell email">
        <p>{email}</p>
      </div>
      <div className="table-cell">
        <p>{role}</p>
      </div>

      <div className="table-cell">
        <button type="button" className="edit-button">
          <BiEdit />
        </button>
        <button type="button" onClick={onClickDelete} className="delete-button">
          <AiOutlineDelete className="delete-icon" />
        </button>
      </div>
    </li>
  )
}

export default UserItem
