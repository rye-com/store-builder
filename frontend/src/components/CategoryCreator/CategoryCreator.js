import { useCallback, useContext, useMemo } from 'react';
import Button from 'react-bootstrap/Button';

import { DataContext } from 'context/Data';
import { ReactComponent as PlusCircleIcon } from 'assets/icons/plus-circle.svg';
import './styles.scss';

const CategoryCreator = () => {
  const { state, actions } = useContext(DataContext);

  const maxCategoryId = useMemo(() => {
    const collectionCount = state.collections.length;
    if (collectionCount === 0) {
      return 0;
    } else {
      return state.collections[collectionCount - 1].id;
    }
  }, [state.collections]);

  const handleCategoryAddClick = useCallback(() => {
    actions.addCategory({
      id: maxCategoryId + 1,
      title: `New Section`,
      description: '',
      products: [],
    });
  }, [maxCategoryId]);

  return (
    <div className="category-creator">
      <div className="category-creator__content">
        <Button
          className="btn btn-light category-creator__content-button"
          onClick={handleCategoryAddClick}
          id="add-new-section-button"
        >
          <PlusCircleIcon />
          Add a new section
        </Button>
      </div>
    </div>
  );
};

export default CategoryCreator;
