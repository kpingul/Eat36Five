var React = require('react');

var VenueItem = React.createClass({
	render: function() {
		return (
			<li>

				<div className="media">
					<div className="media-left SearchVenuePhotoContainer">
						<a href={"venue/" + this.props.venue.venue.id}>
							<img className="media-object SearchVenuePhoto" src={this.props.venue.venue.photos.groups[0].items[0].prefix + "300x300" + this.props.venue.venue.photos.groups[0].items[0].suffix} alt="" />
						</a>

					</div>
					<div className="media-body searchVenueBody">
						<p>
							<span className="searchVenueIndex">{this.props.reactKey}</span>. 
							<span className="searchVenueRating">{this.props.venue.venue.rating}</span>
							<small>Click for more details...</small>
						</p>
						<h4 className="media-heading">
						<a href={"venue/" + this.props.venue.venue.id}>{this.props.venue.venue.name}</a>
						</h4>
							<strong>{this.props.venue.venue.price.tier}</strong> &middot; {this.props.venue.venue.categories[0].name}<br/>
							{this.props.venue.venue.hours.status}
					</div>
					<div className="media-right searchVenueAddressContainer">
								
							<address className="searchVenueAddress">
								{this.props.venue.venue.location.address}<br/>
								{this.props.venue.venue.location.city},{this.props.venue.venue.location.state}<br/>
								{this.props.venue.venue.contact.formattedPhone}
							</address>
					</div>
		
					<div className="media" >
											
						<img
							className="SearchVenueUserPhoto" src={this.props.venue.tips[0].user.photo.prefix + "300x300" + this.props.venue.tips[0].user.photo.suffix} alt=""/>
							
							<span  className="searhVenueUserTip">{this.props.venue.tips[0].text}</span>					

					</div>
				</div>
			</li>
		);
	
	}
});


module.exports = VenueItem;				

