import React, { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'

class Ratings extends Component {

  render() {
    const { book } = this.props
    return (
      <div>
        <StarRatingComponent 
          name={book.id}
          editing={false}
          renderStarIcon={() => <span></span>}
          starCount={5}
          value={book.averageRating}
        />
      </div>
    )
  }
}

export default Ratings