import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewGroup } from '../../store/groups';
import { useHistory } from 'react-router-dom';

const GroupForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState({
        city: '',
        state: '',
        name: '',
        about: '',
        type: '',
        private: '',
        previewImage: '',
    });

    //need to combine city and state, parse location
    //potential code for modified handlesubmit
    /*    const [city, state] = formData.location.split(',').map((item) => item.trim());

    const modifiedFormData = {
        ...formData,
        city,
        state,
        private: formData.private === 'private' ? true : false,
    };
    delete modifiedFormData.location;
    */


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(createNewGroup(formData));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const modifiedFormData = {
            ...formData,
            private: formData.private === 'private' ? true : false,
        };
        const createdGroup = await dispatch(createNewGroup(modifiedFormData));
        console.log('created group:', createdGroup)
        if (createdGroup) {
            history.push(`/group/${createdGroup.id}`);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            /* SECTION 1 */
            <div className="section">
                <h2>BECOME AN ORGANIZER</h2>
                <p>We'll walk you through a few steps to build your local community</p>
            </div>

            /* SECTION 2 */
            <div className="section">
                <h2>First, set your group's location.</h2>
                <p>Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.</p>
                <input
                    type="text"
                    name="city"
                    placeholder="Enter your group's city"
                    value={formData.city}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="state"
                    placeholder="Enter your group's state"
                    value={formData.state}
                    onChange={handleChange}
                />
            </div>

            /* SECTION 3 */
            <div className="section">
                <h2>What will your group's name be?</h2>
                <p>Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your group's name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>

            {/* SECTION 4 */}
            <div className="section">
                <h2>Now describe what your group will be about</h2>
                <p>People will see this when we promote your group, but you'll be able to add to it later, too. 1, What's the purpose of the group? 2. Who should join? 3. What will you do at your events?</p>
                <textarea
                    name="about"
                    placeholder="Describe your group"
                    value={formData.about}
                    onChange={handleChange}
                />
            </div>

            {/* SECTION 5 */}
            <div className="section">
                <label htmlFor="type">Is this an in-person or online group?</label>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="" selected disabled>Please select one</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Online">Online</option>
                </select>

                <label htmlFor="private">Is this group private or public?</label>
                <select name="private" value={formData.private} onChange={handleChange}>
                    <option value="" selected disabled>Please select one</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>

                <label htmlFor="previewImage">Please add an image URL for your group below:</label>
                <input
                    type="text"
                    name="previewImage"
                    placeholder="Image URL"
                    value={formData.previewImage}
                    onChange={handleChange}
                />
            </div>

            /* SECTION 6 */
            <div className="section">
                <button type="submit">Create Group</button>
            </div>
        </form>
    )
}

export default GroupForm;
