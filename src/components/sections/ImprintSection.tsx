import Container from '@/components/Container';

function ImprintSection() {
  return (
    <section
      className="relative z-1 flex min-h-screen py-8"
      aria-label="Imprint"
    >
      <Container>
        <div className="flex flex-col gap-y-12">
          <h1 className="font-display font-bold text-7xl">Imprint</h1>
          <div>
            <h2 className="mb-4 font-display font-bold text-3xl">Details</h2>
            <p className="text-neutrals-50/70">
              Lokkee Studios
              <br />
              Kilian Peters
              <br />
              Langenfelderstraße 75
              <br />
              22769 Hamburg, Germany
            </p>
          </div>
          <div>
            <h2 className="mb-4 font-display font-bold text-3xl">Contact</h2>
            <p className="text-neutrals-50/70">
              E-Mail:{' '}
              <a
                href="mailto:lokkee@lokkeestudios.com"
                title="Hit me up"
                className="border-b-0.5 border-b-neutrals-50/70 text-neutrals-50/70 transition-colors duration-200 hover:border-transparent hover:text-neutrals-50"
              >
                lokkee@lokkeestudios.com
              </a>
              <br />
            </p>
          </div>
          <div>
            <h2 className="mb-4 font-display font-bold text-3xl">
              Content responsibility
            </h2>
            <a
              href="https://lokkeestudios.com"
              title="Get inspired by more great work"
              target="_blank"
              rel="noreferrer"
              className="border-b-0.5 border-b-neutrals-50/70 text-neutrals-50/70 transition-colors duration-200 hover:border-transparent hover:text-neutrals-50"
            >
              LOKKEE STUDIOS
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ImprintSection;
