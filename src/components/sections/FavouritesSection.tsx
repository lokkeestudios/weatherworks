/* eslint-disable @typescript-eslint/no-unsafe-call */
import styled from 'styled-components';
import {
  MAX_FAVOURITES,
  useFavouritesContext,
} from '../../contexts/FavouritesContext';
import WeatherCard from '../cards/WeatherCard';
import StyledWrapper from '../styles/StyledWrapper';
import { StyledH2 } from '../styles/TextStyles';

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
      <StyledH2>{`Favourites (${favourites.favouriteCityIds.length}/${MAX_FAVOURITES})`}</StyledH2>
      <StyledCardsWrapper>
        {favourites.favouriteCityIds.map((favouriteCityId) => (
          <WeatherCard key={favouriteCityId} cityId={favouriteCityId} />
        ))}
      </StyledCardsWrapper>
    </StyledSectionWrapper>
  );
}

export default FavouritesSection;
