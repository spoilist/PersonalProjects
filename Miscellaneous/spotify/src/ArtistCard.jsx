import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { MdStar, MdStarBorder } from "react-icons/md";
import { convertPopularity, formatFollowersNumber, formatString } from "./util";
import * as BasicCardStyles from "./styles/BasicCard";

class ArtistCard extends React.Component {
  constructor(props) {
    super(props);

    this.searchAlbums = this.searchAlbums.bind(this);
  }

  searchAlbums(artistId) {
    this.props.history.push(`/albums/${artistId}`);
  }

  render() {
    const { artist } = this.props;
    const starRatings = [1, 2, 3, 4, 5];

    return (
      <Artist onClick={() => this.searchAlbums(artist.id)}>
        {<BasicCardStyles.BasicImage src={artist.images[0] ? artist.images[0].url : null} />}
        <BasicCardStyles.BasicCardBody>
          <div>
            <BasicCardStyles.BasicCardTitle title={artist.name}>{formatString(artist.name, 60)}</BasicCardStyles.BasicCardTitle>
            <BasicCardStyles.BasicCardSubtitle>
              {formatFollowersNumber(this.props.artist.followers.total)}{" "}
              {this.props.artist.followers.total === 1
                ? "follower"
                : "followers"}
            </BasicCardStyles.BasicCardSubtitle>
          </div>
          <ArtistFooter>
            <StarRatings>
              {starRatings.map(numberOfStar => {
                return numberOfStar <=
                  convertPopularity(this.props.artist.popularity) ? (
                  <FullStar size="30px" key={numberOfStar} />
                ) : (
                  <EmptyStar size="30px" key={numberOfStar} />
                );
              })}
            </StarRatings>
          </ArtistFooter>
        </BasicCardStyles.BasicCardBody>
      </Artist>
    );
  }
}

export default withRouter(ArtistCard);

const Artist = styled(BasicCardStyles.BasicCard)`
  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const ArtistFooter = styled(BasicCardStyles.BasicCardFooter)`
  position: relative;
  margin-bottom: 0;
`;

const StarRatings = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 10px;
`;

const FullStar = styled(MdStar)`
  color: orange;
`;

const EmptyStar = styled(MdStarBorder)`
  color: grey;
`;
