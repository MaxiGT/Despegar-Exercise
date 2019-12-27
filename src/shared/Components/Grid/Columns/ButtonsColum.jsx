import React from 'react';

const ButtonsColum = ({ config, actions, delivery }) => {
  return(
    <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
      {
        config.map((c, idx) => {
          const Icon = c.icon;
          const onClick = actions[c.name] || c.onClick;

          return (
            <button
              key={idx}
              onClick={() => onClick(delivery)}
              type="button"
              className={`btn btn-${c.buttonType}`}
              style={{ marginBottom: '0px', marginTop: '0px', marginRight: '5px'}}>
              <Icon /> {c.label}
            </button>
          );
        })
      }
    </div>
  )

};

export default ButtonsColum;