import {Component} from 'react'
import {BiEdit} from 'react-icons/bi'
import {FiSave} from 'react-icons/fi'
import {AiOutlineDelete} from 'react-icons/ai'
import './index.css'

class UserItem extends Component {
  state = {
    nameInput: '',
    mailInput: '',
    roleInput: '',
  }

  editName = event => {
    this.setState({nameInput: event.target.value})
  }

  editRole = event => {
    this.setState({roleInput: event.target.value})
  }

  editEmail = event => {
    this.setState({mailInput: event.target.value})
  }

  render() {
    const {
      userDetails,
      deleteUserEntry,
      addToSelectedUsers,
      EditUser,
      addNewData,
    } = this.props
    const {id, ischecked, name, isedited, email, role} = userDetails
    const {mailInput, nameInput, roleInput} = this.state
    const activeClassName = ischecked ? 'active' : ''

    const onClickDelete = () => {
      deleteUserEntry(id)
    }

    const onChangeCheck = event => {
      addToSelectedUsers(id)
      console.log('checked')
    }

    const onClickEdit = () => {
      EditUser(id)
    }

    const saveItem = () => {
      const userDetails = {nameInput, mailInput, roleInput, id}
      console.log(id)
      console.log(userDetails)
      addNewData(userDetails)
    }

    return (
      <li className={`user-item ${activeClassName}`}>
        <div className="table-cell ">
          <input type="checkbox" checked={ischecked} onChange={onChangeCheck} />
          {/* <input type="checkbox" onChange={onChangeCheck} /> */}
        </div>

        <div className="table-cell">
          {/* <p>{name}</p> */}
          {isedited ? (
            <input type="text" onChange={this.editName} value={nameInput} />
          ) : (
            <p className="detail-of-person">{name}</p>
          )}
        </div>
        <div className="table-cell email">
          {/* <p>{email}</p> */}
          {isedited ? (
            <input type="text" onChange={this.editEmail} value={mailInput} />
          ) : (
            <p className="detail-of-person">{email}</p>
          )}
        </div>
        <div className="table-cell">
          {/* <p>{role}</p> */}
          {isedited ? (
            <input type="text" onChange={this.editRole} value={roleInput} />
          ) : (
            <p className="detail-of-person">{role}</p>
          )}
        </div>

        <div className="table-cell">
          {isedited ? (
            <button type="button" className="save-button" onClick={saveItem}>
              <FiSave />
            </button>
          ) : (
            <button type="button" className="edit-button" onClick={onClickEdit}>
              <BiEdit />
            </button>
          )}

          <button
            type="button"
            onClick={onClickDelete}
            className="delete-button"
          >
            <AiOutlineDelete className="delete-icon" />
          </button>
        </div>
      </li>
    )
  }
}

export default UserItem
