import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';

const Homepage = (props) => {
    const { t } = useTranslation('translations');

    return (
        <div className={styles.page}>
            <h1>{t('Home_Page.title')}</h1>
        </div>
    )
}
export default Homepage;