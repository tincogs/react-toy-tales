import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy => {
        return <ToyCard
        key={toy.id}
        {...toy}
        handleLike={props.handleLike}
        handleDonate={props.handleDonate}
        />
      })}
    </div>
  );
}

export default ToyContainer;
