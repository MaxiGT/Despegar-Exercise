import React from 'react';
import { PropTypes } from 'prop-types'
import _ from 'lodash'

import './pager.css'

class Pager extends React.Component {
    static propTypes = {
      items: PropTypes.array,
      onChangePage: PropTypes.func,
      initialPage: PropTypes.number,
      itemsPerPage: PropTypes.number,
    }
    
    static defaultProps = {
      initialPage: 1
    }

    constructor(props) {
      super(props);
      this.state = { pager: {} };
    }
 
    componentWillMount() {
      if (this.props.items && this.props.items.length) {
          this.setPage(this.props.initialPage);
      }
    }
 
    componentDidUpdate(prevProps, prevState) {
      if (this.props.items !== prevProps.items) {
        this.setPage(this.props.initialPage);
      }
    }
 
    setPage(page) {
      const items = this.props.items;
      let pager = this.state.pager;

      if (page < 1 || page > pager.totalPages) {
        return;
      }

      pager = this.getPager(items.length, page, this.props.itemsPerPage);
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      this.setState({ pager: pager });
      this.props.onChangePage(pageOfItems);
    }
 
    getPager(totalItems, currentPage, pageSize) {
      currentPage = currentPage || 1;
      pageSize = pageSize || 10;

      let totalPages = Math.ceil(totalItems / pageSize);

      let startPage, endPage;
      if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
      } else {
        if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }

      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
      var pages = _.range(startPage, endPage + 1);

      return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
      };
    }
 
    render() {
      const { pager } = this.state;
 
      if (!pager.pages || pager.pages.length <= 1) {
        return null;
      }
 
      return (
        <div className='col-11 paddingCero'>
          <ul className="pagination float-right">
            <li className={pager.currentPage === 1 ? 'd-none' : ''}>
              <a onClick={() => this.setPage(1)}>{`<<`}</a>
            </li>
            <li className={pager.currentPage === 1 ? 'd-none' : ''}>
                <a onClick={() => this.setPage(pager.currentPage - 1)}>{`<`}</a>
            </li>
            {pager.pages.map((page, index) =>
                <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                    <a onClick={() => this.setPage(page)}>{page}</a>
                </li>
            )}
            <li className={pager.currentPage === pager.totalPages ? 'd-none' : ''}>
                <a onClick={() => this.setPage(pager.currentPage + 1)}>{`>`}</a>
            </li>
            <li className={pager.currentPage === pager.totalPages ? 'd-none' : ''}>
                <a onClick={() => this.setPage(pager.totalPages)}>{`>>`}</a>
            </li>
          </ul>
        </div>
      );
    }
}

export default Pager;