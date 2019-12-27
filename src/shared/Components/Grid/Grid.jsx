import React from 'react';
import _ from 'lodash';
import './grid.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Grid = ({ cols, deliveries, dataSource, buttonActions, setOrder, order }) => {

  const formatBody = () => {
    let grid = [];
    deliveries.map((d) => {
      let row = [];
      cols.map((c) => {
        row.push(
          renderCell(d, c)
        );
      })
      grid.push(row);
    });
    return grid;
  }

  const renderCell = (r, c) => {
    let content = '';

    if (c.component) {
      const Comp = c.component;
      content = (<Comp delivery={r} actions={buttonActions} config={c.config} />);
    } else if (typeof c.content === 'function') {
      content = c.content(r);
    } else if (Array.isArray(c.content)) {
      content = _.get(r, c.content, 'default');
    }
    
    return {
      content: content,
      width: c.width,
    };
  }

  const handleOrder = (col) => {
    let ord = col.retrieveOrder ? col.retrieveOrder() : col.defaultOrder;
    if (col.field === order.field) {
      if (order.order === 'ASC') ord = 'DESC';
      if (order.order === 'DESC') ord = 'ASC';
    }
    setOrder(col.field, ord, col.sort);
  }

  return(
    <div className='row-fluid' style={{ minHeight: '260px' }}>
      <div className='gridHeader d-flex'>
        {
          cols.map((c) => {
            return (
              <div onClick={() => handleOrder(c)} className={`headerCell col-${c.width}`}>
                <span>
                  {c.title}
                </span>
                <span className='orderArrow'>
                  {
                    c.field === order.field && order.order === 'ASC' && (
                      <FaArrowUp />
                    )
                  }
                  {
                    c.field === order.field && order.order === 'DESC' && (
                      <FaArrowDown />
                    )
                  }
                </span>
              </div>
            );
          })
        }
      </div>
      <div className='gridBody'>
        {
          formatBody().map((r) => {
            return(
              <div className='col-12 d-flex'
                style={{ padding: '0px' }}>
                {r.map((c) => {
                  return (
                    <div className={`headerCell d-flex col-${c.width}`}>
                      <div style={{ marginBottom: 'auto', marginTop: 'auto' }}>
                        <span>
                          {c.content}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Grid;