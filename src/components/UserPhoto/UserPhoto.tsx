import { useState } from 'react';
import './UserPhoto.css';

interface UserPhotoProps {
  photoUrl?: string;
  firstName: string;
  lastName: string;
  className?: string;
}

const UserPhoto = ({ photoUrl, firstName, lastName, className = '' }: UserPhotoProps) => {
  const [imageLoadError, setImageLoadError] = useState(false);

  const handleImageError = () => { setImageLoadError(true); };

  const getInitials = () => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  return (
    <div className={`user-photo ${className}`}>
      {photoUrl && !imageLoadError ? (
        <img
          src={photoUrl}
          alt="" // Decorative image, so empty alt
          onError={handleImageError}
          className="user-photo__image"
          width={32}
          height={32}
        />
      ) : (
        <div className="user-photo__initials" role="img" aria-hidden="true">
          {getInitials()}
        </div>
      )}
    </div>
  );
};

export default UserPhoto;
