import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import UserItem from '../UserItem'
import './index.css'

class AllUsers extends Component {
  state = {
    usersDataList: [],
    selectedUsersList: [],
    searchInput: '',
    activeSearchCategory: 'name',
  }

  componentDidMount() {
    this.getAllUsersData()
  }

  getAllUsersData = async () => {
    // const {checkedState} = this.state
    const url =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedUsersData = await response.json()

    this.setState({usersDataList: fetchedUsersData})
    // this.setState(prevState => ({
    //   usersDataList: prevState.usersDataList.map(eachFetch => {
    //     if (true) {
    //       return {...eachFetch, ischecked: false}
    //     }
    //   }),
    // }))
  }

  deleteUserEntry = deleteUserId => {
    const {usersDataList} = this.state
    const updatedUsersDataList = usersDataList.filter(
      eachUser => eachUser.id !== deleteUserId,
    )
    this.setState({usersDataList: updatedUsersDataList})
  }

  addToSelectedUsers = selectedUserId => {
    this.setState(prevState => ({
      selectedUsersList: [...prevState.selectedUsersList, selectedUserId],
    }))
  }

  deleteSelectedUsers = () => {
    const {selectedUsersList, usersDataList} = this.state

    const updatedUsers = usersDataList.filter(
      eachUser => !selectedUsersList.includes(eachUser.id),
    )

    this.setState({usersDataList: updatedUsers})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSearchBy = event => {
    this.setState({activeSearchCategory: event.target.value})
  }

  checkAllItems = event => {
    //   // const {checkedState} = this.state
    //   // this.setState(prevState => ({checkedState: !prevState.checkedState}))
    //   // const checkedState = false
    //   // if (checkedState === false) {
    //   //   this.setState({checkedState: true})
    //   // } else {
    //   //   this.setState({checkedState: false})
    //   // }
    //   this.setState(prevState => ({
    //     usersDataList: prevState.usersDataList.map(eachData => {
    //       if (event.target.checked) {
    //         return {...eachData, ischecked: true}
    //       }
    //       return {...eachData, ischecked: false}
    //     }),
    //   }))
  }

  render() {
    const {
      usersDataList,
      searchInput,
      activeSearchCategory,
      selectedUsersList,
    } = this.state
    const activeSearch = `${activeSearchCategory}`
    const filteredUsersDataList = usersDataList.filter(eachUser =>
      eachUser[activeSearch].toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(usersDataList, selectedUsersList)
    return (
      <>
        <div className="search-section">
          <select
            activecategory={activeSearchCategory}
            onChange={this.onChangeSearchBy}
            className="active-category-search"
          >
            <option>name</option>
            <option>email</option>
            <option>role</option>
          </select>
          <div className="search-container">
            <AiOutlineSearch />
            <input
              type="search"
              placeholder="Search by name,email and role"
              className="search-input"
              onChange={this.onChangeSearchInput}
            />
          </div>
        </div>
        <ul className="users-list-container">
          <li className="table-head-item">
            <div className="table-column-head">
              <input type="checkbox" onChange={this.checkAllItems} />
            </div>
            <p className="table-column-head">Name</p>
            <p className="table-column-head email">Email</p>
            <p className="table-column-head">Role</p>
            <p className="table-column-head">Actions</p>
          </li>
          {filteredUsersDataList.map(eachUserData => (
            <UserItem
              key={eachUserData.id}
              // checkItem={this.checkAllItems(false)}
              userDetails={eachUserData}
              deleteUserEntry={this.deleteUserEntry}
              addToSelectedUsers={this.addToSelectedUsers}
            />
          ))}
        </ul>
        <button type="button" onClick={this.deleteSelectedUsers}>
          Delete Selected
        </button>
      </>
    )
  }
}

export default AllUsers
