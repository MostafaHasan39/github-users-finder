import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../loading/loading';
import Error from '../error/error';
import Pagination from '../pagination/pagination';
import UserSearchResults from '../../interfaces/UserSearchResults';

import './searchresults.css';



class SearchResults extends Component<{
    keyWord: string
}, {
    loading: boolean,
    errorState: boolean,
    errorCode: number | null,
    errorMsg: string | null,
    redirectToProfile: boolean,
    users: UserSearchResults["items"],
    keyWord: string,
    itemsPerPage: number,
    currentPage: number,
    totalNumberOfRecords: UserSearchResults["total_count"]
}> {

    constructor(props: { keyWord: string }) {
        super(props);
        this.state = {
            errorState: false,
            errorCode: null,
            errorMsg: null,
            loading: false,
            redirectToProfile: false,
            users: JSON.parse(localStorage.getItem('users') || '[]'),
            keyWord: JSON.parse(localStorage.getItem('keyWord') || '""'),
            itemsPerPage: JSON.parse(localStorage.getItem('currentItemsPerPage') || "10"),
            currentPage: JSON.parse(localStorage.getItem('currentPage') || "1"),
            totalNumberOfRecords: JSON.parse(localStorage.getItem('totalNumberOfRecords') || "0")
        }
    }

    componentWillMount() {
        if (this.state.users.length === 0) {
            this.fetchUsers(this.state.keyWord, this.state.currentPage, this.state.itemsPerPage);
        }
    }
    componentWillReceiveProps(nextProps: { keyWord: string }) {
        if (nextProps.keyWord !== this.props.keyWord) {
            this.setState({ keyWord: nextProps.keyWord });
            this.setState({ currentPage: 1 });
            this.fetchUsers(nextProps.keyWord, 1, this.state.itemsPerPage);
        }

    }

    fetchUsers = (keyWord: string, pageNumber: number, itemsPerPage: number) => {
        if (keyWord.length > 0) {
            localStorage.setItem("keyWord", JSON.stringify(keyWord))
            localStorage.setItem("users", JSON.stringify([]))
            this.setState({ loading: true })
            fetch(` https://api.github.com/search/users?q=${keyWord}&page=${pageNumber}&per_page=${itemsPerPage}`)
                .then(response => {
                    switch (response.status) {
                        case 200: {
                            response.json().then(results => {
                                localStorage.setItem("keyWord", JSON.stringify(keyWord));
                                localStorage.setItem("users", JSON.stringify(results.items));
                                localStorage.setItem("currentPage", JSON.stringify(this.state.currentPage));
                                localStorage.setItem("currentItemsPerPage", JSON.stringify(this.state.itemsPerPage));
                                localStorage.setItem("totalNumberOfRecords", results.total_count);
                                this.setState({
                                    loading: false,
                                    users: results.items,
                                    totalNumberOfRecords: results.total_count,
                                    keyWord
                                })
                                if (results.items.length === 1)
                                    this.setState({ redirectToProfile: true })

                            })

                            break;
                        }
                        // maximum rate for requests is reached
                        case 403: {
                            this.setState({
                                errorState: true,
                                errorCode: response.status,
                                errorMsg: "Maximum number of reuqests per minute is reached..Please try again within a minute..",
                                loading: false
                            });
                            break;
                        }
                        case 422: {
                            this.setState({
                                errorState: true,
                                errorCode: response.status,
                                errorMsg: "GitHub only allows first 1,000 record..",
                                loading: false
                            });
                        }
                        default: {
                            this.setState({ errorState: true, errorCode: response.status, loading: false });

                        }
                    }
                }).catch(err => {
                    this.setState({ errorState: true, loading: false });
                })
        }
    }

    onChangePage = (newPageNumber: number) => {
        if (newPageNumber !== this.state.currentPage) {
            this.setState({ currentPage: newPageNumber });
            this.fetchUsers(this.state.keyWord, newPageNumber, this.state.itemsPerPage);
        }
    }

    clearSearchResults = () => {
        localStorage.removeItem("users");
        localStorage.removeItem("keyWord");
        localStorage.removeItem("currentItemsPerPage");
        localStorage.removeItem("totalNumberOfRecords");
        localStorage.removeItem("currentPage");
        this.setState({
            errorState: false,
            errorCode: null,
            loading: false,
            redirectToProfile: false,
            users: JSON.parse(localStorage.getItem('users') || '[]'),
            keyWord: "",
            itemsPerPage: JSON.parse(localStorage.getItem('currentItemsPerPage') || "10"),
            currentPage: 1,
            totalNumberOfRecords: 0
        })

    }

    changeItemsPerPage = (event: any) => {
        this.setState({ itemsPerPage: event.target.value });
        localStorage.setItem("currentItemsPerPage", JSON.stringify(event.target.value));
        this.setState({ currentPage: 1 });
        this.fetchUsers(this.state.keyWord, 1, event.target.value);

    }

    listUsers = () => {
        return (
            <Fragment>
                <div className="pagination-container">
                    <Pagination onChangePage={this.onChangePage} activePage={this.state.currentPage} itemsPerPage={this.state.itemsPerPage} totalNumberOfRecords={this.state.totalNumberOfRecords} />
                    <button id="clear-btn" onClick={() => { this.clearSearchResults() }}>clear</button>
                </div>
                <div className="dropdown-div">
                    <label htmlFor="items-page">Items per page </label>
                    <select name="items-page" id="items-page" onChange={this.changeItemsPerPage}>
                        <option value="5" selected={this.state.itemsPerPage == 5}>5</option>
                        <option value="10" selected={this.state.itemsPerPage == 10}>10</option>
                        <option value="20" selected={this.state.itemsPerPage == 20}>20</option>
                        <option value="30" selected={this.state.itemsPerPage == 30}>30</option>
                    </select>

                </div>

                <ul className="search-items">
                    {
                        this.state.users.map((user) => {
                            return <li key={user.id} className="search-item">

                                <div className="search-item-image-div">
                                    <img className="search-item-image" src={user.avatar_url} />
                                </div>
                                <div className="search-item-link-div">
                                    <Link to={{
                                        pathname: '/profile',
                                        state: {
                                            user
                                        }
                                    }} className="search-item-link" > {user.login} </Link>
                                </div>

                            </li>
                        })
                    }
                </ul>
            </Fragment>
        )
    }

    displayNoResults = () => {
        if (this.state.keyWord.length > 0)
            return (
                <div className="no-results-div">
                    No search results found for {this.state.keyWord}...
            </div>
            )
    }

    displayUsers = () => {
        if (!this.state.errorState) {
            if (this.state.redirectToProfile) {
                return <Redirect from="/" to={{
                    pathname: '/profile',
                    state: {
                        user: this.state.users[0]
                    }
                }} />
            }
            else {

                return <div className="search-results-div">
                    <div className="search-results-header-div">
                        <p className="search-results-header-title">Search results for keyWord: <b>{this.state.keyWord}</b>
                            <span className="results-number"><b>{this.state.totalNumberOfRecords}</b> records</span>
                        </p>
                    </div>
                    {this.state.users.length ? this.listUsers() : this.displayNoResults()}

                </div>
            }
        }
        else {
            return <div className="search-results-div">
                <div className="search-results-header-div">
                    <p className="search-results-header-title">Search results for keyWord: <span>{this.state.keyWord}</span> </p>
                </div>
                <Error errorCode={this.state.errorCode} errorMsg={this.state.errorMsg} />

            </div>
        }

    }

    displayLoading = () => {
        return <Spinner />
    }
    render() {
        return (
            this.state.loading ? this.displayLoading() : this.displayUsers()
        )
    }
}


export default SearchResults;