import { DotPulse } from '@uiball/loaders';

// const StyledLoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

function Loader() {
  return (
    <div>
      <DotPulse
        size={48}
        speed={1.3}
        // color={CommonStyles.colors.text}
      />
    </div>
  );
}

export default Loader;
