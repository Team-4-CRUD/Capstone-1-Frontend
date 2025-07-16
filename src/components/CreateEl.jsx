import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const CreateEl = () => {

    const [element, setElement] = useState({
        title: "",
        description: "",
        picture: "",
    });

    const handleSubmit = async (e) => {
           e.preventDefault();

        try {
           const res =  await axios.post("http://localhost:8080/api/pollelements/",
                element
            );
            console.log(element);
        }
        catch (error) {
            console.error("Failed to add element", error);
        }
    }
      const handleChange = (event) => {
            const { name, value } = event.target;
            setElement((prevElement) => ({
                ...prevElement,
                [name]: value
            }))
        }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label> Tittle </label>
                    <input
                        type="text"
                        name="title"
                        placeholder='title'
                        value={element.title}
                        onChange={handleChange}
                        required
                    />
                    <label> Description </label>
                    <input
                        type="text"
                        name="description"
                        placeholder='description'
                        value={element.description}
                        onChange={handleChange}
                        required
                    />
                    <label> Picture Url </label>
                    <input
                        type="url"
                        name="picture"
                        placeholder='imageUrl'
                        value={element.picture}
                        onChange={handleChange}
                        required
                    />
                    <input type="submit" />
                </form>
            </div>

            <div>
                  
            </div>
        </>
    )
}

export default CreateEl
