import Wave from './Wave';

function WaveBackground1() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 h-screen w-full overflow-hidden"
    >
      <div className="absolute h-[25rem] w-full bg-gradient-to-b from-[#290379] to-[#5c10ec]" />
      <Wave
        src="/images/waves/background1/wave1.svg"
        width={1700}
        height={554}
        yOffsetClass="top-[90px]"
        isPriority
      />
      <Wave
        src="/images/waves/background1/wave2.svg"
        width={1998}
        height={1025}
        yOffsetClass="top-[10px]"
        hasBlur
      />
      <Wave
        src="/images/waves/background1/wave3.svg"
        width={1709}
        height={809}
        yOffsetClass="top-[156px]"
      />
      <Wave
        src="/images/waves/background1/wave4.svg"
        width={2012}
        height={835}
        yOffsetClass="top-[126px]"
        hasBlur
      />
      <Wave
        src="/images/waves/background1/wave5.svg"
        width={1709}
        height={471}
        yOffsetClass="top-[349px]"
      />
      <Wave
        src="/images/waves/background1/wave6.svg"
        width={1700}
        height={695}
        yOffsetClass="top-[389px]"
        hasBlur
      />
      <Wave
        src="/images/waves/background1/wave7.svg"
        width={1711}
        height={659}
        yOffsetClass="top-[489px]"
      />
    </div>
  );
}

export default WaveBackground1;
