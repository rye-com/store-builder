import LogoImg from 'assets/icons/logo.svg';
import classes from './AuthPageLayout.module.scss';

export function AuthPageLayout({ children }) {
  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <img src={LogoImg} alt="logo" className={classes.logo} />
        {children}
      </div>
    </div>
  );
}
