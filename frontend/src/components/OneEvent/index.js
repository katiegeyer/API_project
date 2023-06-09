import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getOneEvent } from '../../store/events';
// import './OneEvent.css'
import OpenModalButton from '../OpenModalButton';
// import DeleteOpenModal from '../DeleteOpenModal';
import DeleteEvent from '../DeleteEvent';
import './OneEvent.css'
//does not throw error when groupId doesn't exist, shows same thing



function OneEvent() {
    const { eventId } = useParams();
    const dispatch = useDispatch();

    const singleEvent = useSelector((state) => state.events.singleEvent);
    useEffect(() => {
        dispatch(getOneEvent(eventId));
    }, [dispatch, eventId]);
    console.log(singleEvent);
    const sessionUser = useSelector((state) => state.session.user);


    function formatDate(dateString) {
        // const date = new Date(dateString);
        // const month = String(date.getMonth() + 1).padStart(2, '0');
        // const day = String(date.getDate()).padStart(2, '0');
        // const year = date.getFullYear();

        // return `${month}-${day}-${year}`;
        const date = new Date(dateString);
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };
    function formatTime(dateString) {
        // const date = new Date(dateString);
        // const hours = String(date.getHours()).padStart(2, '0');
        // const minutes = String(date.getMinutes()).padStart(2, '0');

        // return `${hours}:${minutes}`;
        const date = new Date(dateString);
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // If the hours is 0, change it to 12

        return `${hours}:${minutes} ${ampm}`;
    };

    console.log('Session user ID:', sessionUser?.id);
    console.log('Event organizer ID:', singleEvent.organizerId);

    // function formatDate(dateString) {
    //     const date = new Date(dateString);
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const year = date.getFullYear();

    //     return `${month}/${day}/${year}`;
    // };
    // function formatTime(dateString) {
    //     const date = new Date(dateString);
    //     const hours = String(date.getHours()).padStart(2, '0');
    //     const minutes = String(date.getMinutes()).padStart(2, '0');

    //     return `${hours}:${minutes}`;
    // }

    //find out why it isn't giving us the event - store probably isnt updating the info properly
    //     return (
    //         <div>
    //             <section className='event-heading'>
    //                 <div>&lt; <NavLink to="/events" className="event-events-link">Events</NavLink></div>
    //                 <h1 className='event-name-header'>{singleEvent.name}</h1>
    //                 <h2>Hosted by {`${singleEvent.hostFirst} ${singleEvent.hostLast}`}</h2>
    //             </section>

    //             <section className='event-details-section1'>
    //                 <div className="section1-left-image">
    //                     <img src={singleEvent.previewImage} />
    //                 </div>
    //                 <div className="section1-topright">
    //                     <img src={singleEvent.groupImage} />
    //                     <h1 className='events-group-name'>{singleEvent.groupName}</h1>
    //                     <h2 className='type-of-event'>{singleEvent.private}</h2>
    //                     {/* <div className='location'>{singleEvent.city}</div> */}
    //                 </div>
    //                 <div className="section1-bottomright">
    //                     <div className='time-details'>
    //                         <span>
    //                             <i className="fa-regular fa-clock"></i>
    //                             <div className='start'>START</div>
    //                             <div className='date'>{formatDate(`${singleEvent.startDate}`)}</div>
    //                             <div className='time'>{formatTime(`${singleEvent.startDate}`)}</div></span>
    //                         <span>
    //                             <div className='start'>END</div>
    //                             <div className='date'>{formatDate(`${singleEvent.endDate}`)}</div>
    //                             <div className='time'>{formatTime(`${singleEvent.endDate}`)}</div>
    //                         </span>
    //                     </div>
    //                     <div>
    //                         <i className="fa-solid fa-dollar-sign"></i>
    //                         {`${singleEvent.price}`}</div>
    //                     <span>
    //                         <div>
    //                             <i className="fa-solid fa-location-dot"></i>
    //                             {`${singleEvent.type}`}</div>
    //                     </span>
    //                 </div >
    //                 <div>
    //                     {/*if not organizer*/}
    //                     {/* <button className="join-event-button">Join this Event</button> */}
    //                 </div>
    //                 {/* if session user && if group organizerId = userId} */}
    //                 <div>
    //                     <OpenModalButton
    //                         buttonText="Delete"
    //                         modalComponent={<DeleteEvent />}
    //                     />
    //                 </div>
    //             </section >
    //             <section className='event-detail-section3'>
    //                 <h1>What we're about</h1>
    //                 <p>{singleEvent.description}</p>
    //             </section>
    //         </div >
    //     );
    // }


    // export default OneEvent;

    return (
        <div>
            <div className='bread-crumb'>&lt; <NavLink to="/events" className="event-events-link">Events</NavLink></div>
            <div className='oneevent-body'>
                <section className='event-heading'>
                    <h1 className='event-name-header'>{singleEvent.name}</h1>
                    <h2>Hosted by {`${singleEvent.hostFirst} ${singleEvent.hostLast}`}</h2>
                </section>

                <div className='top-side'>
                    <div className="section1-left-image">
                        <img src={singleEvent.previewImage} />
                    </div>
                    {/* <div className='section1-right-card'> */}
                    <div className='right-side'>
                        <section className='section1-card'>
                            <div className="section1-topright">
                                <img src={singleEvent.groupImage} />
                            </div>
                            <div className="section1-bottomright">
                                <div className='part1'>
                                    <h2 className='events-group-name'>{singleEvent.groupName}</h2>
                                    <h3 className='type-of-event'>{singleEvent.private}</h3>
                                </div>
                            </div>
                        </section >
                        <section className='columncard'>
                            <div className='time'>
                                <i id='clock' className="fa-regular fa-clock"></i>
                                <div className='time-details'>
                                    <span>

                                        <div className='start'>START {formatDate(`${singleEvent.startDate}`)} {formatTime(`${singleEvent.startDate}`)}</div>
                                    </span>
                                    <span>
                                        <div className='start'>END {formatDate(`${singleEvent.endDate}`)} {formatTime(`${singleEvent.endDate}`)}</div>

                                    </span>
                                </div>
                            </div>
                            <div>
                                <i id='dollar' className="fa-solid fa-dollar-sign"></i>
                                {`${singleEvent.price}`}</div>
                            <span>
                                {sessionUser && sessionUser.id === singleEvent.organizerId && (
                                    <div className="delete-modal-events">
                                        <i id='dot' className="fa-solid fa-location-dot"></i>
                                        <span className='eventtype'>{`${singleEvent.type}`}</span>
                                        <OpenModalButton
                                            buttonText="Delete"
                                            modalComponent={<DeleteEvent />}
                                        />
                                        <button className="Update-events1">Update</button>
                                    </div>
                                )}
                                {sessionUser && sessionUser.id !== singleEvent.organizerId && (
                                    <>
                                        <i id='dot' className="fa-solid fa-location-dot"></i>
                                        <span className='eventtype'>{`${singleEvent.type}`}</span>
                                    </>
                                )}
                            </span>
                        </section>
                    </div>
                </div>

                {/* </div> */}

                <section className='event-detail-section3'>
                    <h1>Details </h1>
                    <p>{singleEvent.description}</p>
                </section>
            </div>
        </div >
    );
}

export default OneEvent;
