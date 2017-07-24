import React from 'react';

const ScreenRow = (props) => {
  return(
    <div className="screen-row">
      <input type="text" readOnly value={props.value}></input>
    </div>
  )
}

ScreenRow.propTypes = {
  value: React.PropTypes.string.isRequired
}

export default ScreenRow;
