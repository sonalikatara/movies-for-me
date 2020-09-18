import React from 'react';

export default function Ratings(props){
    let i=0;
    let stars = [];
    for(; i < props.rating; i++) {
        stars.push(<span className='fa fa-star Ratings-checked' key={'i'+i} > </span>)
    }
    props.rating === 0 && stars.push(<span key={'i'} className='Ratings-checked'> No Ratings yet</span>)
    return (
    <div >
       {stars}
    </div>
    );       
}