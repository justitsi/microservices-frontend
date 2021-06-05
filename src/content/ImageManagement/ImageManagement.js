import { useTranslation } from 'react-i18next';
import styles from './ImageManagement.module.scss';

import ImageList from './../../components/ImageList';
import UploadImage from '../../components/ImageControls/UploadImage';
import UpdateImagePermissions from '../../components/ImageControls/UpdateImagePermissions';

import { getRequest } from '../../modules/requests';
import CONSTANTS from './../../modules/CONSTANTS.json';
import { useState } from 'react';

const ImageManagement = (props) => {
    const { t } = useTranslation('translations');
    const [userImages, setUserImages] = useState([])
    const [selectedImage, setSelectedImage] = useState(-1)

    const getUserImages = (checkForEmptyState) => {
        const shouldUpate = (checkForEmptyState ? (userImages.length === 0) : true);

        if (shouldUpate)
            getRequest(`${CONSTANTS.GET_IMAGE_API_ADDRESS}/imageData/byOwner`).then(data => {
                setUserImages(data.images)
                setSelectedImage(-1)
            })
    }

    const onImageUpload = () => {
        getUserImages(false);
    }

    getUserImages(true);

    return (
        <div className={styles.page}>
            <h1>{t('ImageManagement_Page.title')}</h1>
            {(selectedImage > -1) &&
                <h4>Currently selected image is {userImages[selectedImage]._id}</h4>
            }

            <ImageList
                images={userImages}
                selected={selectedImage}
                setSelected={(i) => { setSelectedImage(i) }}
            />

            <br /><br />
            <UploadImage
                onUpload={onImageUpload}
            />
            <UpdateImagePermissions />

        </div>
    );



}
export default ImageManagement
