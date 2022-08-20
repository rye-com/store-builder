import { ReactComponent as EditIconSvgComponent } from 'assets/icons/edit-icon.svg';
import classNames from 'classnames';
import './ActionIcon.css';

export function EditIcon(props) {
  if (props.name === undefined) {
    throw new Error('EditIcon: name is required');
  }
  return (
    <EditIconSvgComponent
      {...props}
      className={classNames(props.className, 'action-icon', 'edit-icon')}
      id={`edit-button-${props.name}`}
    />
  );
}
