import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

//user profile
const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>this is user Your User Profile for chage the password of your application </h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
