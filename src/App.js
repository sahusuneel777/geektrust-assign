import AllUsers from './components/AllUsers'

const App = () => {
  return <AllUsers />
}
export default App

// import pagination from
// class App extends Component {
//   state = {
//     searchElement: '',
//     activePage: 1,
//     mailData: [],
//     isChecked: false,
//     isEdited: false,
//   }

//   componentDidMount() {
//     this.getDataFromApi()
//   }

//   getDataFromApi = async () => {
//     const {isChecked, isEdited} = this.state
//     const url = `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
//     const options = {
//       method: 'GET',
//     }
//     const response = await fetch(url, options)
//     const fetchedData = await response.json()
//     const fetchedDataWithCheck = fetchedData.map(eachData => ({
//       id: eachData.id,
//       name: eachData.name,
//       email: eachData.email,
//       role: eachData.role,
//       isChecked,
//       isEdited,
//     }))
//     this.setState({mailData: fetchedDataWithCheck})
//   }

//   searchItem = event => {
//     this.setState({
//       searchElement: event.target.value,
//     })
//   }

//   onChangePage = id => {
//     this.setState({activePage: id})
//   }

//   goToFirstPage = () => {
//     this.setState({activePage: 1})
//   }

//   goToLastPage = () => {
//     const searchedList = this.getSearchItems()
//     const pageNumber = Math.ceil(searchedList.length / 10)
//     this.setState({activePage: pageNumber})
//   }

//   goToNextPage = () => {
//     const {activePage} = this.state
//     const searchedList = this.getSearchItems()
//     const pageNumber = Math.ceil(searchedList.length / 10)
//     if (pageNumber > activePage) {
//       this.setState(prevState => ({activePage: prevState.activePage + 1}))
//     }
//   }

//   goToPreviousPage = () => {
//     const {activePage} = this.state
//     if (activePage > 1) {
//       this.setState(prevState => ({activePage: prevState.activePage - 1}))
//     }
//   }

//   onClickDelete = id => {
//     const searchedList = this.getSearchItems()
//     const updatedList = searchedList.filter(eachItem => eachItem.id !== id)
//     this.setState({mailData: updatedList})
//   }

//   changeSelectAllCheckBox = () => {
//     const {activePage} = this.state
//     const offset = (activePage - 1) * 10
//     const searchedList = this.getSearchItems().slice(offset, offset + 10)
//     console.log(searchedList)
//     this.setState(
//       prevState => ({isChecked: !prevState.isChecked}),
//       this.getDataFromApi,
//     )
//   }

//   onCheckSelect = id => {
//     this.setState(prevState => ({
//       mailData: prevState.mailData.map(eachDataItem => {
//         if (id === eachDataItem.id) {
//           return {...eachDataItem, isChecked: !eachDataItem.isChecked}
//         }
//         return eachDataItem
//       }),
//     }))
//   }

//   deleteSelectedItems = () => {
//     const searchedList = this.getSearchItems()
//     const deleteToBeList = searchedList.filter(eachMail => !eachMail.isChecked)
//     this.setState({mailData: deleteToBeList})
//   }

//   getSearchItems = () => {
//     const {searchElement, mailData} = this.state
//     const filteredData = mailData.filter(
//       each =>
//         each.name.toLowerCase().includes(searchElement) ||
//         each.email.toLowerCase().includes(searchElement) ||
//         each.role.toLowerCase().includes(searchElement),
//     )
//     return filteredData
//   }

//   onClickEdit = id => {
//     this.setState(prevState => ({
//       mailData: prevState.mailData.map(eachDataItem => {
//         if (id === eachDataItem.id) {
//           return {...eachDataItem, isEdited: !eachDataItem.isChecked}
//         }
//         return eachDataItem
//       }),
//     }))
//   }

//   saveDetails = data => {
//     const {id, nameInput, roleInput, emailInput} = data
//     console.log(data)
//     this.setState(prevState => ({
//       mailData: prevState.mailData.map(eachData => {
//         if (id === eachData.id) {
//           console.log(true)
//           return {
//             ...eachData,
//             name: nameInput,
//             email: emailInput,
//             role: roleInput,
//             isEdited: false,
//           }
//         }
//         return eachData
//       }),
//     }))
//   }

//   render() {
//     const {searchElement, activePage} = this.state
//     const searchedList = this.getSearchItems()
//     const limit = 10
//     const totalPages = Math.ceil(searchedList.length / limit)
//     const totalItems = []
//     for (let index = 1; index < totalPages + 1; index += 1) {
//       totalItems.push(index)
//     }
//     const offset = (activePage - 1) * limit
//     const dataToShow = searchedList.slice(offset, offset + limit)
//     const disabledPreviousButtons =
//       activePage === 1 ? 'disabled-button' : 'button-item'
//     const disabledNextButtons =
//       activePage === totalPages ? 'disabled-button' : 'button-item'

//     return (
//       <div className="app-container">
//         <div className="app-details">
//           <input
//             type="search"
//             placeholder="Search by name, email or role"
//             value={searchElement}
//             onChange={this.searchItem}
//             className="input-field"
//           />
//           <div className="heading-container">
//             <input type="checkbox" onChange={this.changeSelectAllCheckBox} />
//             <p className="heading">Name</p>
//             <p className="heading">Email</p>
//             <p className="heading">Role</p>
//             <p className="heading">Actions</p>
//           </div>
//           <hr />
//           {dataToShow.map(eachPerson => (
//             <PersonType
//               key={eachPerson.id}
//               personDetails={eachPerson}
//               onClickDelete={this.onClickDelete}
//               onClickEdit={this.onClickEdit}
//               deleteSelectedItems={this.deleteSelectedItems}
//               onCheckSelect={this.onCheckSelect}
//               searchedList={searchedList}
//               saveDetails={this.saveDetails}
//             />
//           ))}
//           <div className="pagination-container">
//             <button
//               type="button"
//               onClick={this.deleteSelectedItems}
//               className="delete-selected-button"
//             >
//               Delete Selected
//             </button>
//             <div className="buttons-container">
//               <button
//                 type="button"
//                 onClick={this.goToFirstPage}
//                 className={disabledPreviousButtons}
//               >
//                 <AiOutlineDoubleLeft />
//               </button>
//               <button
//                 type="button"
//                 onClick={this.goToPreviousPage}
//                 className={disabledPreviousButtons}
//               >
//                 <AiOutlineLeft className="previous" />
//               </button>
//               {totalItems.map(eachPage => (
//                 <Pagination
//                   key={eachPage}
//                   details={eachPage}
//                   onChangePage={this.onChangePage}
//                   isActive={activePage === eachPage}
//                 />
//               ))}
//               <button
//                 type="button"
//                 onClick={this.goToNextPage}
//                 className={disabledNextButtons}
//               >
//                 <AiOutlineRight />
//               </button>
//               <button
//                 type="button"
//                 onClick={this.goToLastPage}
//                 className={disabledNextButtons}
//               >
//                 <AiOutlineDoubleRight />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default App
