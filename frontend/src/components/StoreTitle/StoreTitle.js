import { Editable } from 'components';

const storeTitleStyle = {
    fontWeight: 'bold',
    marginBottom: '0px',
    textAlign: 'center',
  },
  storeDescriptionStyle = {
    marginTop: '0px',
    display: 'inline-block',
  },
  storeTitleContainerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
  };
const StoreTitle = ({ isView }) => {
  return (
    <div style={storeTitleContainerStyle}>
      <Editable
        isView={isView}
        tag={'h1'}
        styles={{ edit: storeTitleStyle }}
        placeholder="Store name here"
        className={'mx-auto'}
        storePath="title"
        name="store-title"
      />
      <Editable
        isView={isView}
        tag={'p'}
        styles={{ edit: storeDescriptionStyle }}
        placeholder={'Add a store description'}
        storePath="description"
        name="store-description"
      />
    </div>
  );
};

export default StoreTitle;
