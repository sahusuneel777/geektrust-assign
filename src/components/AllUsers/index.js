import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import UserItem from '../UserItem'
import './index.css'

class AllUsers extends Component {
  state = {
    usersDataList: [],
    selectedUsersList: [],
    searchInput: '',
    ischecked: false,
    activeSearchCategory: 'name',
  }

  componentDidMount() {
    this.getAllUsersData()
  }

  getAllUsersData = async () => {
    const {ischecked} = this.state
    const url =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json?offset=0&limit=10'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedUsersData = await response.json()
    const updatedFetchedUserData = fetchedUsersData.map(eachfetch => {
      return {...eachfetch, ischecked}
    })

    this.setState({usersDataList: updatedFetchedUserData})
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

      usersDataList: prevState.usersDataList.map(eachUser => {
        if (selectedUserId === eachUser.id) {
          return {...eachUser, ischecked: !eachUser.ischecked}
        }
        return eachUser
      }),
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
    const {ischecked} = this.state
    // console.log(event.target.checked)
    this.setState(prevState => ({
      usersDataList: prevState.usersDataList.map(eachData => {
        if (event.target.checked) {
          return {...eachData, ischecked: !prevState.ischecked}
        }
        return {...eachData, ischecked: ischecked}
      }),
    }))
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
