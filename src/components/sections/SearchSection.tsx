import Container from '@/components/Container';
import LocationSearchInput from '@/components/forms/LocationSearchInput';

function SearchSection() {
  return (
    <section
      className="relative z-10 py-8"
      aria-label="Location search"
    >
      <Container>
        <LocationSearchInput />
      </Container>
    </section>
  );
}

export default SearchSection;
