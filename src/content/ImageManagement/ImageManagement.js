import { useTranslation } from 'react-i18next';
import styles from './ImageManagement.module.scss';

const ImageManagement = (props) => {
    const { t } = useTranslation('translations');

    return (
        <div className={styles.page}>
            <h1>{t('ImageManagement_Page.title')}</h1>
        </div>
    );
}
export default ImageManagement
