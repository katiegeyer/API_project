
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGroups } from '../../store/groups';
import GroupSummary from '../GroupSummary';
import { NavLink } from 'react-router-dom';
import './Groups.css'
import GroupImg1 from '../GroupImgs/Group1';

function GroupList() {
  const dispatch = useDispatch();
  let groups = useSelector((state) => state.groups.allGroups);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  //Need to learn how to connect number of group's events to frontend!!

  return (
    <div>
      <h1><NavLink to={"/events"} className="groups-event-link">Events</NavLink>
        <NavLink to={"/groups"} className="groups-groups-link">Groups</NavLink></h1>
      <h2>Groups in SpeakUp</h2>
      {groups && Object.values(groups).map((group) => (
        <div key={group.id} className="group-card">
          <NavLink to={`/group/${group.id}`} className="landing-page-section3-link">
            <img src="https://static.boredpanda.com/blog/wp-content/uploads/2019/12/guy-protesting-randon-things-dudewithsign-1-13-5df09bdd2244f__700.jpg" />
            <GroupSummary group={group}></GroupSummary>
          </NavLink>
        </div>
      ))}
    </div>
  );
}



export default GroupList;