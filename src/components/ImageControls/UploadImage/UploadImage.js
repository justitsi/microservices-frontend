import styles from './UploadImage.module.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CONSTANTS from './../../../modules/CONSTANTS.json';
import { sendRequest } from './../../../modules/requests';



const UploadImage = (props) => {
    const { t } = useTranslation('translations');
    const [file, setFile] = useState(null)
    const [isPublic, setIsPublic] = useState(true)
    const [errors, setErrors] = useState([])

    const handleFileSelect = (file) => {
        console.log(file)
        if (checkValidFileType(file.name)) {
            setFile(file)
            setErrors([])
        }
        else {
            setFile(null)
            setErrors(createErrorMsg(t('ImageControls.UploadImage_Component.errors.invalid_fType')))
        }
    }

    const handlePublicSelect = (visibility) => {
        if (visibility.toString() === "public") setIsPublic(true)
        if (visibility.toString() === "private") setIsPublic(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (errors.length === 0) {
            const data = new FormData()
            data.append('file', file)

            const postFix = (isPublic ? "public" : "private")
            const location = `${CONSTANTS.PUT_IMAGE_API_ADDRESS}/${postFix}`

            sendRequest('PUT', location, data).then(data => {
                if (parseInt(data.status) === 200) {
                    props.onUpload()
                }
                if (parseInt(data.status) === 403) {
                    setErrors(createErrorMsg(t('ImageControls.UploadImage_Component.errors.invalid_jwt')))
                    props.onUpload()
                }
                setErrors(errors);
            });
        }
    }

    const createErrorMsg = (txt) => {
        return (
            <li key={txt} className={styles.errorsItem}>
                {txt}
            </li>
        )
    }

    const checkValidFileType = (fName) => {
        const subStrings = fName.split('.')
        const fType = subStrings.pop()
        for (const type of CONSTANTS.VALID_FILE_TYPES) {
            if (fType.toString() === type.toString()) return true;
        }
        return false;
    }

    return (
        <div>
            {t('ImageControls.UploadImage_Component.label')}
            <div className={styles.errorContainer}>
                {errors}
            </div>
            <form id={'upload-image-form'}>
                <div className={styles.formItem}>
                    <select name="image_type" onChange={(e) => handlePublicSelect(e.target.value)}>
                        <option value="public">{t('ImageControls.UploadImage_Component.form_labels.public')}</option>
                        <option value="private">{t('ImageControls.UploadImage_Component.form_labels.private')}</option>
                    </select>
                </div>

                <div className={styles.formItem}>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => handleFileSelect(e.target.files[0])}
                    />
                </div>

                <div className={styles.formItem}>
                    <button onClick={handleSubmit}>
                        {t('ImageControls.UploadImage_Component.form_labels.submit')}
                    </button>
                </div>
            </form>
        </div>
    )
}
export default UploadImage