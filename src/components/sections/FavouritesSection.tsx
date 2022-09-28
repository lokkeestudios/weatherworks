/* eslint-disable @typescript-eslint/no-unsafe-call */
import { AiFillStar as FavouriteIcon } from 'react-icons/ai';
import styled from 'styled-components';
import {
  MAX_FAVOURITES,
  useFavouritesContext,
} from '../../contexts/FavouritesContext';
import WeatherCard from '../cards/WeatherCard';
import CommonStyles from '../styles/CommonStyles';
import StyledWrapper from '../styles/StyledWrapper';
import {
  StyledBodyMedium,
  StyledCaptionLarge,
  StyledH2,
} from '../styles/TextStyles';

const StyledSectionWrapper = styled(StyledWrapper)`
  display: grid;
  row-gap: 30px;
  padding-block: 35px;
`;

const StyledCardsWrapper = styled.div`
  display: grid;
  row-gap: 20px;
`;

function FavouritesSection() {
  const [favourites] = useFavouritesContext();

  return (
    <StyledSectionWrapper as="section">
      <StyledH2>{`Your favourites (${favourites.favouriteCityIds.length}/${MAX_FAVOURITES})`}</StyledH2>
      <StyledCardsWrapper>
        {favourites.favouriteCityIds.length === 0 && (
          <>
            <FavouriteIcon
              size={128}
              color={CommonStyles.colors.text2}
            />
            <StyledCaptionLarge>No favourites yet</StyledCaptionLarge>
            <StyledBodyMedium>
              Locations you mark as favourite are shown here
            </StyledBodyMedium>
          </>
        )}
        {favourites.favouriteCityIds.map((favouriteCityId) => (
          <WeatherCard
            key={favouriteCityId}
            cityId={favouriteCityId}
          />
        ))}
      </StyledCardsWrapper>
    </StyledSectionWrapper>
  );
}

export default FavouritesSection;
