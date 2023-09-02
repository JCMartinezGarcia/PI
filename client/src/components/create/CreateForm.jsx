import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, React } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import {
    getAllVideoGames,
    getAllGenres,
    getAllPlatforms
} from '../../redux/actions';
import "react-toastify/dist/ReactToastify.css";
import style from './create.module.css';

const CreateForm = () => {
    const dispatch = useDispatch();
    const allPlatforms = useSelector((state) => state.allPlatforms);
    const allGenres = useSelector((state) => state.allGenres);
    const navigate = useHistory();
    const [urlImage, setUrlImage] = useState();
    let url = '';
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(getAllVideoGames());
        dispatch(getAllGenres());
        dispatch(getAllPlatforms());
        /**if the arr is empty gets in */
    }, [dispatch]);

    const notify = () => {
        toast.success('¡🦄 Video game created successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const handleUpload = async (file) => {
        const { name } = file;
        const reader = new FileReader();

        reader.onload = async () => {
            const base64data = 'data:image/png;base64,' + reader.result.split(',')[1];

            try {
                const { data } = await axios.post('http://localhost:3001/videogames/upload', { file: base64data, fname: name });
                const { message, imageUrl, status } = data;
                setUrlImage(imageUrl);
                url = imageUrl;

            } catch (error) {
                alert(error);
                console.error('Error al subir archivo:', error);
            }
        };

        reader.readAsDataURL(file);
    }
    const handleSubmitForm = async (data) => {
        delete data.image;
        data.image = url
        const postObject = data;
        try {
            const response = await axios.post('http://localhost:3001/videogames/', postObject);
            if (response.statusText === "OK") {
                notify();
                setTimeout(() => {
                    navigate.push("/home");
                }, 1 * 6000);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const onSubmitForm = (data) => {
        const fileObject = data.image[0];
        handleUpload(fileObject);
        setTimeout(() => {
            handleSubmitForm(data);
        }, 1 * 3000);
    }


    return (
        <div className={style.createFormContainer}>
            <Link to='/home'>
                <button className={style.linkHomeButton}><strong>Home</strong></button>
            </Link>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <form
                className={style.formCreate}
                onSubmit={handleSubmit(onSubmitForm)}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        {...register("name", { required: " * This field is required. Please introduce a value" })}
                        type='text'
                        placeholder='introduce a name...'
                        className={style.createInput}
                    />
                    <p>{errors.name?.message}</p>
                </div>
                <div>
                    <label htmlFor="image">Image: </label>
                    <input
                        {...register("image", { required: " * This field is required. Please introduce a value" })}
                        type='file'
                        accept='image/*'
                        placeholder='select an image...'
                        className={style.createInput}
                    />
                    <p>{errors.image?.message}</p>
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea
                        {...register("description", { required: " * This field is required. Please introduce a value" })}
                        className={style.createInput}
                    >
                    </textarea>
                    <p>{errors.description?.message}</p>
                </div>
                <div>
                    <label htmlFor="platform">Platforms: </label>
                    <div className={style.radioContainer}>
                        {
                            allPlatforms.map((platform, i) => {

                                return <div>
                                    <label>{platform.name}</label>
                                    <input
                                        {...register("platforms", { required: " * This field is required. Please introduce a value" })}
                                        type='checkbox'
                                        id={platform.id}
                                        value={platform.name}
                                        className={style.createInput}
                                    />
                                </div>
                            })

                        }
                    </div>
                    <p>{errors.platforms?.message}</p>
                </div>
                <div>
                    <label htmlFor="release">Release Date: </label>
                    <input
                        {...register("released", { required: " * This field is required. Please introduce a value" })}
                        type='date'
                        placeholder='set a date...'
                        className={style.createInput}
                    />
                    <p>{errors.released?.message}</p>
                </div>
                <div>
                    <label htmlFor="rate">Rating: </label>
                    <input
                        {...register("rating",
                            {
                                required: " * This field is required. Please introduce a value. ",
                                min: {
                                    value: 1,
                                    message: "The minimum value is 1."
                                },
                                max: {
                                    value: 10,
                                    message: "The maximum value is 10."
                                }
                            }

                        )}
                        type='number'
                        placeholder='introduce a rate'
                        className={style.createInput}
                    />
                    <p>{errors.rating?.message}</p>
                </div>
                <div>
                    <label htmlFor="genre">Genres: </label>
                    <div className={style.radioContainer}>

                        {
                            allGenres.map((genres, i) => {

                                return <div>
                                    <label>{genres.name}</label>
                                    <input
                                        {...register("genres", { required: " * This field is required. Please introduce a value." })}
                                        type='checkbox'
                                        id={genres.id}
                                        value={genres.name}
                                        className={style.createInput}
                                    />
                                </div>
                            })

                        }

                    </div>
                    <p>{errors.genres?.message}</p>
                </div>
                <input
                    type='submit'
                    value='Submit'
                    className={style.submitInput} />


            </form>
        </div>
    )
}


export default CreateForm;