import React, { Component } from 'react';
import './searchbar.css';

class SearchBar extends Component<{

    submitSearch: (keyWord: string) => void
}, { keyWord: string }> {
    state = {
        keyWord: ""
    }


    handleSearchSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (this.state.keyWord.length > 0)
            this.props.submitSearch(this.state.keyWord);
    }



    render() {
        return (
            // <div className="search-div">
                <form onSubmit={this.handleSearchSubmit} className="search-form">
                    <input type="text" className="search-text" placeholder=" Search a user name..." value={this.state.keyWord} onChange={(event: any) => {
                        this.setState({ keyWord: event.target.value })
                    }}>
                    </input>
                    <button type="submit" className="search-submit">Submit</button>
                </form>
            // </div>

        )
    }
}


export default SearchBar;