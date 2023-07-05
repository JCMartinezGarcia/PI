import styles from './Create.module.css';
import CreateForm from '../../components/create/CreateForm';

const Create = () => {
    return (
        <div className={styles.formContainer}>
            <h1 className={styles.createHead}>Create View</h1>
            <CreateForm />
        </div>
    )
}

export default Create;