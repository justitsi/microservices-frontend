import styles from './ImageList.module.scss';
import { useTranslation } from 'react-i18next';
import CONSTANTS from './../../modules/CONSTANTS.json'

const ImageList = (props) => {
    const { t } = useTranslation('translations');

    const items = []
    for (const i in props.images) {
        const image = props.images[i]
        const selected = (i === props.selected)

        const isPublic = ((image.accessList.length > 0) ? image.accessList[0].toString() === "*" : false)
        const picturePrefix = (isPublic ? "public" : "private")

        const imageHref = `${CONSTANTS.GET_IMAGE_API_ADDRESS}/${picturePrefix}/${image._id}`

        const onELementClick = () => {
            props.setSelected(i)
        }

        const tableItem = (
            <tr key={image._id} onClick={onELementClick}>
                <td>
                    <a href={imageHref}>
                        {image._id}
                    </a>
                </td>
                <td>
                    {image.belongsTo}
                </td>
                <td>
                    {(image.size / 1024).toFixed(2)}
                </td>
                <td>
                    {JSON.stringify(image.accessList)}
                </td>
                {(selected) &&
                    <td>
                        X
                    </td>
                }
            </tr>
        )
        items.push(tableItem)
    }


    return (
        <div>
            {t("ImaegList_Component.label")}
            <table>
                <thead>
                    <tr>
                        <th>
                            {t("ImaegList_Component.table_labels.id")}
                        </th>
                        <th>
                            {t("ImaegList_Component.table_labels.belongs_to")}
                        </th>
                        <th>
                            {t("ImaegList_Component.table_labels.size")}
                        </th>
                        <th>
                            {t("ImaegList_Component.table_labels.access_list")}
                        </th>
                        <th>
                            {t("ImaegList_Component.table_labels.selected")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}
export default ImageList