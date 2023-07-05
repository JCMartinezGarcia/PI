import style from './create.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    getAllVideoGames,
    getAllGenres,
    getAllPlatforms
} from '../../redux/actions';

const CreateForm = () => {
    const dispatch = useDispatch();
    const allPlatforms = useSelector((state) => state.allPlatforms);
    const allGenres = useSelector((state) => state.allGenres);

    useEffect(() => {
        dispatch(getAllVideoGames());
        dispatch(getAllGenres());
        dispatch(getAllPlatforms());
        /**if the arr is empty gets in */
    }, [dispatch]);

    const [inputs, setInputs] = useState({
        name: "",
        description: "",
        platforms: [{}],
        genres: [{}],
        image: "",
        released: "",
        rating: 0,
    });


    const [errors, setErrors] = useState({
        name: "* Please introduce a name",
        description: "* Please introduce a description",
        platforms: "",
        image: "* Please select an image",
        released: "* Please select a released date",
        rating: "* Please introduce a rate",
    });

    function handleChange(e) {
        const { name, value, id } = e.target;
        let arr;
        if (name === 'platforms') {
            arr = [
                ...inputs.platforms,
                { id: id, name: value }
            ]
        } else if (name === 'genres') {
            arr = [
                ...inputs.genres,
                { id: id, name: value }
            ]
        }

        setInputs({
            ...inputs,
            [name]: (name === 'platforms' || name === 'genres') ? arr : [value]
        });

        setErrors(
            validateInputs({
                ...inputs,
                [name]: [value]
            })
        );
    }

    const validateInputs = (inputs) => {
        const { name, image, description, released, rating } = inputs;
        let errors = {};
        let regexSymbols = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
        if (regexSymbols.test(inputs.name)) {
            errors.name = 'Name cannot contain special characteres';
        } else if (!name[0]) {
            errors.name = '* Please Introduce a name';
        } else {
            errors.name = '';
        }

        if (!image[0]) {
            errors.image = '* Please introduce an image'
        } else {
            errors.image = ''
        }

        if (regexSymbols.test(inputs.description)) {
            errors.description = 'Description cannot contain special characteres';
        } else if (!description[0]) {
            errors.description = '* Please Introduce a description';
        } else {
            errors.description = '';
        }

        if (!released[0]) {
            errors.released = '* Please select a released date';
        } else {
            errors.released = '';
        }
        if (!rating || !rating[0]) {
            errors.rating = '* Please introduce a rate';
        } else if (rating[0] > 10 || rating[0] < 1) {
            errors.rating = 'Rate must be between 1 and 10';
        } else {
            errors.rating = '';
        }


        return errors;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, description, platforms, image, released, rating, genres } = inputs;
        platforms.shift();
        genres.shift();
        const body = {
            name: name[0],
            description: description[0],
            platforms,
            image: image[0],
            rating: rating[0],
            released: released[0],
            genres
        };
        try {
            const response = await axios.post('http://localhost:3001/videogames/', body);
            console.log(response);
        } catch (error) {
            console.log({ error: error.message });
        }

        /*
        if (!errors.nombre && !errors.descripcion && !errors.reglas) {
            dispatch(actions.createDeporte(inputs));
        }*/

    }

    return (
        <div className={style.createFormContainer}>
            <Link to='/home'>
                <button className={style.linkHomeButton}><strong>Home</strong></button>
            </Link>
            <form className={style.formCreate} onSubmit={handleSubmit}>
                <label for="name">Name: </label>
                <input
                    type='text'
                    name='name'
                    placeholder='introduce a name...'
                    value={inputs.name}
                    onChange={handleChange}
                    className={style.createInput}
                />
                <span>{errors.name}</span><br></br>
                <label for="image">Image: </label>
                <input
                    type='file'
                    name='image'
                    placeholder='select an image...'
                    value={inputs.image}
                    onChange={handleChange}
                    className={style.createInput}
                />
                <span>{errors.image}</span><br></br>
                <label for="description">Description: </label>
                <textarea
                    name='description'
                    value={inputs.description}
                    onChange={handleChange}
                    className={style.createInput}
                >
                </textarea>
                <span>{errors.description}</span><br></br>
                <label for="platform">Platforms: </label>
                <div className={style.radioContainer}>

                    {
                        allPlatforms.map((platform, i) => {

                            return <div>
                                <label>{platform.name}</label>
                                <input
                                    type='checkbox'
                                    id={platform.id}
                                    name='platforms'
                                    value={platform.name}
                                    onChange={handleChange}
                                    className={style.createInput}
                                />
                            </div>
                        })

                    }
                </div>
                <span>{errors.platforms}</span><br></br>

                <label for="release">Release Date: </label>
                <input
                    type='date'
                    name='released'
                    placeholder='set a date...'
                    onChange={handleChange}
                    className={style.createInput}
                />
                <span>{errors.released}</span><br></br>
                <label for="rate">Rating: </label>
                <input
                    type='number'
                    name='rating'
                    placeholder='introduce a rate'
                    onChange={handleChange}
                    className={style.createInput}
                />
                <span>{errors.rating}</span><br></br>
                <label for="genre">Genres: </label>
                <div className={style.radioContainer}>

                    {
                        allGenres.map((genres, i) => {

                            return <div>
                                <label>{genres.name}</label>
                                <input
                                    type='checkbox'
                                    id={genres.id}
                                    name='genres'
                                    value={genres.name}
                                    onChange={handleChange}
                                    className={style.createInput}
                                />
                            </div>
                        })

                    }
                    <span>{errors.genres}</span><br></br>
                </div>
                {
                    (errors.name === "" && errors.description === "" && errors.image === "" && errors.rating === "" && errors.released === "") ? <input
                        type='submit'
                        value='Submit'
                        className={style.submitInput} /> : null
                }

            </form>
        </div>
    )
}


export default CreateForm;