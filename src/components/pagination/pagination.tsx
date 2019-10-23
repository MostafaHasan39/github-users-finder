import React, { Component } from 'react';
import './pagination.css';

const range=(start:number,end:number)=>{
    let result=[];
    if(start<=0)
        start=1;
    for(let i=start;i<=end;i++){
        result.push(i)
    }
    return result;
}

const calculateDisplayRange=(activePage:number,maxPageNumber:number)=>{
    if(activePage===0)
        activePage=1;
    let maxNumberInRange= Math.ceil(activePage/5)*5;
    if(maxNumberInRange < maxPageNumber){
        return range(maxNumberInRange-4 , maxNumberInRange)
    }
    else{
      return range(maxNumberInRange-4 , maxPageNumber)  
    }  
        
}


class Pagination extends Component<{
    onChangePage:(newPageNumber:number)=>void,
    activePage:number,
    totalNumberOfRecords:number,
    itemsPerPage:number,
},{
    displayRange:number[],
    maxPageNumber:number
}>{
    constructor(props: any) {
        super(props);
        this.state={
            displayRange:calculateDisplayRange(this.props.activePage,Math.floor(this.props.totalNumberOfRecords/this.props.itemsPerPage)+1),
            maxPageNumber:Math.floor(this.props.totalNumberOfRecords/this.props.itemsPerPage)+1
        }
    }

    increaseRange=()=>{
        this.setState({displayRange:calculateDisplayRange(this.state.displayRange[this.state.displayRange.length-1]+1,this.state.maxPageNumber)})
    }
    decreaseRange=()=>{
        this.setState({displayRange:calculateDisplayRange(this.state.displayRange[0]-1,this.state.maxPageNumber)})
    }
    render() {
        return (
            <div className="pagination">
                <span onClick={()=>this.decreaseRange()} id="pagination-left-arrow">&laquo;</span>

                {this.state.displayRange.map((pageNumber)=>{
                    return <span key={pageNumber} className="paginationPage" id={this.props.activePage===pageNumber?"pagination-active":""} onClick={()=>{this.props.onChangePage(pageNumber)}}>{pageNumber}</span>
                })   
                }
                <span onClick={(e)=>this.increaseRange()} id="pagination-right-arrow">&raquo;</span>
                <span id="page-numbers">of <b>{this.state.maxPageNumber}</b> pages</span>
            </div>
        )
    }


}


export default Pagination;