// import React from 'react';
// import '../styles/EventList.css';

// const EventList = ({ events }) => {
//   return (
//     <div className="event-list">
//       {events.length > 0 ? (
//         events.map(event => (
//           <div key={event.id} className="event-item">
//             <h3>{event.title}</h3>
//             <p>Start: {new Date(event.start).toLocaleString()}</p>
//             <p>End: {new Date(event.end).toLocaleString()}</p>
//           </div>
//         ))
//       ) : (
//         <p>Upcoming Events</p>
//       )}
//     </div>
//   );
// };

// export default EventList;


// import React from 'react';
// import '../styles/EventList.css';

// const EventList = ({ events }) => {
//   return (
//     <div className="event-list">
//       {events.length > 0 ? (
//         events.map(event => (
//           <div key={event.id} className="event-item">
//             <h3>{event.title}</h3>
//             <div className="event-times">
//               <p>Start: {new Date(event.start).toLocaleString()}</p>
//               <p>End: {new Date(event.end).toLocaleString()}</p>
//             </div>
//             {event.meetLink && (
//               <a href={event.meetLink} className="meet-button" target="_blank" rel="noopener noreferrer">
//                 Join Google Meet
//               </a>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No Upcoming Events</p>
//       )}
//     </div>
//   );
// };

// export default EventList;

// import React from 'react';
// import '../styles/EventList.css';

// const coolColors = [
//   '#a0c4ff', '#bdb2ff', '#ffc6ff', '#ffadad', '#fdffb6',
//   '#caffbf', '#9bf6ff', '#bde0fe', '#a4a4ff', '#a6e3e9'
// ];

// const getRandomColor = () => {
//   return coolColors[Math.floor(Math.random() * coolColors.length)];
// };

// const EventList = ({ events }) => {

  
//   return (
//     <div className="my-event-list">
//       {events.length > 0 ? (
//         events.map(event => (
//           <div key={event.id} className="event-item" style={{ backgroundColor: getRandomColor() }}>
//             <h3>{event.title}</h3>
//             <div className="event-times">
//               <p>Start: {new Date(event.start).toLocaleString()}</p>
//               <p>End: {new Date(event.end).toLocaleString()}</p>
//             </div>
//             {event.meetLink && (
//               <a href={event.meetLink} className="calendar-meet-button" target="_blank" rel="noopener noreferrer">
//                 Join Google Meet
//               </a>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>Upcoming Events</p>
//       )}
//     </div>
//   );
// };

// export default EventList;

// import React from 'react';
// import Modal from 'react-modal';
// import '../styles/EventList.css';

// Modal.setAppElement('#root'); // Ensure this matches the root element of your app

// const coolColors = [
//   '#a0c4ff', '#bdb2ff', '#ffc6ff', '#ffadad', '#fdffb6',
//   '#caffbf', '#9bf6ff', '#bde0fe', '#a4a4ff', '#a6e3e9', '#89CFF0',
//   '#98FF98',
//   '#FFD1DC',
//   '#E6E6FA',
//   '#FFE5B4',
//   '#D3D3D3',
//   '#FFFACD',
//   '#7FFFD4',
//   '#87CEEB',
//   '#FFC0CB',
//   '#9FE2BF',
//   '#CCCCFF',
//   '#FF7F50',
//   '#B19CD9',
//   '#FFA07A',
//   '#EEE8AA',
//   '#F0FFF0',
//   '#FFFFF0',
//   '#F0F8FF',
//   '#AFEEEE',
//   '#E0FFFF',
//   '#FFFACD',
//   '#FFE4E1',
//   '#D8BFD8',
//   '#B0E0E6',
//   '#F08080',
//   '#FFB6C1',
//   '#FFDAB9',
//   '#FAFAD2',
//   '#FFF0F5',
//   '#98FB98',
//   '#B0C4DE',
//   '#FFEFD5',
//   '#FFE4B5',
//   '#FFF5EE',
//   '#FDF5E6',
//   '#87CEFA',
//   '#F5FFFA',
//   '#FFFAF0',
//   '#FAEBD7',
//   '#FFE4C4',
//   '#778899',
//   '#6A5ACD',
//   '#9370DB',
//   '#BA55D3',
//   '#20B2AA',
//   '#F0E68C',
//   '#DB7093',
//   '#DEB887',
//   '#BC8F8F',
// ];

// const getRandomColor = () => {
//   return coolColors[Math.floor(Math.random() * coolColors.length)];
// };

// const EventList = ({ events }) => {
//   return (
//     <div className="event-list">
//       {events.length > 0 ? (
//         events.map(event => (
//           <div
//             key={event.id}
//             className="event-item"
//             style={{ backgroundColor: getRandomColor() }}
//           >
//             <h3>{event.title}</h3>
//             {event.meetLink && (
//               <a href={event.meetLink} className="meet-button" target="_blank" rel="noopener noreferrer">
//                 Join Google Meet📚
//               </a>
//             )}
//           </div>
//         ))
//       ) : (
//         <p>No Upcoming Events</p>
//       )}
//     </div>
//   );
// };

// export default EventList;

import React from 'react';
import '../styles/EventList.css';

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      <h2>Event List</h2>
      <ul>
        {events.map(event => (
          <li key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p>Start: {new Date(event.start).toLocaleString()}</p>
            <p>End: {new Date(event.end).toLocaleString()}</p>
            {event.meetLink && (
              <a href={event.meetLink} target="_blank" rel="noopener noreferrer">
                Join Google Meet
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

