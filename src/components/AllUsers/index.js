import {Component} from 'react'
import {
  AiOutlineSearch,
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineDoubleRight,
  AiOutlineRight,
} from 'react-icons/ai'
import Pagination from '../Pagination'
import UserItem from '../UserItem'
import './index.css'

class AllUsers extends Component {
  state = {
    usersDataList: [],
    selectedUsersList: [],
    searchInput: '',
    activePage: 1,
    ischecked: false,
    isedited: false,
    activeSearchCategory: 'name',
    allChecked: false,
  }

  componentDidMount() {
    this.getAllUsersData()
  }

  getAllUsersData = async () => {
    const {ischecked, isedited} = this.state
    const url =
      'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json?offset=0&limit=10'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const fetchedUsersData = await response.json()
    const updatedFetchedUserData = fetchedUsersData.map(eachfetch => {
      return {...eachfetch, ischecked, isedited}
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
    // const {selectedUsersList, usersDataList} = this.state
    const filteredUsersDataList = this.getSearchedUser()
    // const updatedUsers = currentData.filter(
    //   eachUser => !selectedUsersList.includes(eachUser.id),
    // )

    const updatedUsers = filteredUsersDataList.filter(
      eachUser => !eachUser.ischecked,
    )

    this.setState({usersDataList: updatedUsers, allChecked: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSearchBy = event => {
    this.setState({activeSearchCategory: event.target.value})
  }

  checkAllItems = event => {
    const {ischecked} = this.state
    this.setState(prevState => ({allChecked: !prevState.allChecked}))
    // const filteredUsersDataList = this.getSearchedUser()
    const {activePage} = this.state
    const offset = (activePage - 1) * 10
    const searchedList = this.getSearchedUser().slice(offset, offset + 10)
    this.setState(prevState => ({
      usersDataList: prevState.usersDataList.map(eachData => {
        if (event.target.checked && searchedList.includes(eachData)) {
          return {...eachData, ischecked: !prevState.ischecked}
        }
        return {...eachData, ischecked: ischecked}
      }),
    }))
  }

  EditUser = id => {
    const {usersDataList} = this.state
    this.setState(prevState => ({
      usersDataList: prevState.usersDataList.map(eachUserData => {
        if (id === eachUserData.id) {
          return {...eachUserData, isedited: !eachUserData.isedited}
        }
        return eachUserData
      }),
    }))
    console.log(usersDataList)
  }

  addNewData = data => {
    const {id, nameInput, roleInput, emailInput} = data
    console.log(data)
    this.setState(prevState => ({
      usersDataList: prevState.usersDataList.map(eachUser => {
        if (id === eachUser.id) {
          console.log(true)
          return {
            ...eachUser,
            name: nameInput,
            email: emailInput,
            role: roleInput,
            isEdited: false,
          }
        }
        return eachUser
      }),
    }))
  }

  ChangePage = id => {
    const {allChecked} = this.state
    this.setState(prevState => ({
      usersDataList: prevState.usersDataList.map(eachUser => {
        return {...eachUser, ischecked: false}
      }),
    }))
    if (allChecked) {
      this.setState(prevState => ({allChecked: !prevState.allChecked}))
    }

    this.setState({activePage: id})
  }

  goToFirstPage = () => {
    const {allChecked} = this.state

    this.setState({activePage: 1})
    this.setState(prevState => ({
      usersDataList: prevState.usersDataList.map(eachUser => {
        return {...eachUser, ischecked: false}
      }),
    }))
    if (allChecked) {
      this.setState(prevState => ({allChecked: !prevState.allChecked}))
    }
  }

  goLastPage = () => {
    const {allChecked} = this.state
    const filteredUsersDataList = this.getSearchedUser()
    const pageNum = Math.ceil(filteredUsersDataList.length / 10)
    this.setState({activePage: pageNum})
    this.setState(prevState => ({
      usersDataList: prevState.usersDataList.map(eachUser => {
        return {...eachUser, ischecked: false}
      }),
    }))
    if (allChecked) {
      this.setState(prevState => ({allChecked: !prevState.allChecked}))
    }
  }

  goToBackWard = () => {
    const {activePage, allChecked} = this.state
    if (activePage > 1) {
      this.setState(prevState => ({activePage: prevState.activePage - 1}))
    }
    this.setState(prevState => ({
      usersDataList: prevState.usersDataList.map(eachUser => {
        return {...eachUser, ischecked: false}
      }),
    }))
    if (allChecked) {
      this.setState(prevState => ({allChecked: !prevState.allChecked}))
    }
  }

  goToForward = () => {
    const {activePage, allChecked} = this.state
    const filteredUsersDataList = this.getSearchedUser()

    const pageNumber = Math.ceil(filteredUsersDataList.length / 10)
    if (pageNumber > activePage) {
      this.setState(prevState => ({activePage: prevState.activePage + 1}))
      this.setState(prevState => ({
        usersDataList: prevState.usersDataList.map(eachUser => {
          return {...eachUser, ischecked: false}
        }),
        // allChecked: !prevState.allChecked,
      }))
    }
    if (allChecked) {
      this.setState(prevState => ({allChecked: !prevState.allChecked}))
    }
  }

  getSearchedUser = () => {
    const {usersDataList, searchInput, activeSearchCategory} = this.state
    const activeSearch = `${activeSearchCategory}`
    // console.log(activeSearch)

    const filterData = usersDataList.filter(eachUser =>
      eachUser[activeSearch].toLowerCase().includes(searchInput.toLowerCase()),
    )
    console.log(`filterData`, filterData)
    return filterData
  }

  render() {
    const {activePage, allChecked, activeSearchCategory} = this.state

    const filteredUsersDataList = this.getSearchedUser()
    console.log(`filteredUsersDataList`, filteredUsersDataList)

    const limit = 10

    const totalNeededPages = Math.ceil(filteredUsersDataList.length / limit)
    // console.log(totalNeededPages)
    const totalPaginationButtons = []
    for (let index = 1; index < totalNeededPages + 1; index += 1) {
      totalPaginationButtons.push(index)
    }

    const offset = (activePage - 1) * limit
    // console.log(offset)
    const maxUserList = filteredUsersDataList.slice(offset, offset + limit)
    console.log(`maxUserList`, maxUserList)

    return (
      <div>
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
              <input
                type="checkbox"
                checked={allChecked}
                onChange={this.checkAllItems}
              />
            </div>
            <p className="table-column-head">Name</p>
            <p className="table-column-head email">Email</p>
            <p className="table-column-head">Role</p>
            <p className="table-column-head">Actions</p>
          </li>
          {maxUserList.map(eachUserData => (
            <UserItem
              key={eachUserData.id}
              userDetails={eachUserData}
              EditUser={this.EditUser}
              deleteUserEntry={this.deleteUserEntry}
              addNewData={this.addNewData}
              addToSelectedUsers={this.addToSelectedUsers}
            />
          ))}
        </ul>
        <div className="bottom-container">
          <button
            type="button"
            className="delete-all-btn"
            onClick={this.deleteSelectedUsers}
          >
            Delete Selected
          </button>
          <div className="pagination-buttons-container">
            <button type="button" onClick={this.goToFirstPage}>
              <AiOutlineDoubleLeft />
            </button>
            <button type="button" onClick={this.goToBackWard}>
              <AiOutlineLeft className="previous" />
            </button>
            {totalPaginationButtons.map(eachPageButton => (
              <Pagination
                key={eachPageButton}
                pageNo={eachPageButton}
                ChangePage={this.ChangePage}
                isActive={activePage === eachPageButton}
              />
            ))}
            <button type="button" onClick={this.goToForward}>
              <AiOutlineRight />
            </button>
            <button type="button" onClick={this.goLastPage}>
              <AiOutlineDoubleRight />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default AllUsers
