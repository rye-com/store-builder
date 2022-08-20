import { ReactComponent as DeleteIconSvgComponent } from 'assets/icons/delete-icon.svg';
import classNames from 'classnames';
import './ActionIcon.css';

export function DeleteIcon(props) {
  if (props.name === undefined) {
    throw new Error('DeleteIcon: name is required');
  }
  return (
    <DeleteIconSvgComponent
      {...props}
      className={classNames(props.className, 'action-icon')}
      id={`delete-button-${props.name}`}
    />
  );
}
