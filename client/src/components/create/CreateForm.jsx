import style from './create.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
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
        image: "",
        released: "",
        rating: 0,
    });


    const [errors, setErrors] = useState({
        name: "* Please introduce a name",
        description: "* Please introduce a description",
        platforms: "* Please select a platform",
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
            setInputs({
                ...inputs,
                [name]: arr
            });
        } else {

            setInputs({
                ...inputs,
                [name]: [value]
            });
        }

        setErrors(
            validateInputs({
                ...inputs,
                [name]: (name === 'platforms') ? [arr] : [value]
            })
        );
    }

    const validateInputs = (inputs) => {
        const { name, image, description, platforms } = inputs;
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

        if (!platforms[0]) {
            errors.description = '* Please select a platform';
        } else {
            errors.platform = '';
        }
        console.log('platform', platforms);
        return errors;
    }


    return (
        <div>

            <form className={style.formCard}>
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
                    name='release'
                    placeholder='set a date...'
                    value={inputs.released}
                    className={style.createInput}
                />
                <span>{errors.released}</span><br></br>
                <label for="rate">Rating: </label>
                <input
                    type='number'
                    name='rate'
                    placeholder='introduce a rate'
                    value={inputs.rating}
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
                                    type='radio'
                                    id={genres.id}
                                    name={genres.name}
                                    value={genres.name}
                                    className={style.createInput}
                                />
                            </div>
                        })

                    }
                    <span>{errors.genres}</span><br></br>
                </div>

                <input
                    type='submit'
                    value='Submit'
                    className={style.submitInput}
                />
            </form>
        </div>
    )
}


export default CreateForm;