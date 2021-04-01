import React from 'react'

import {withRoomConsumer} from '../context'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'

import Loading from '../components/Loading'

function RoomsContainer({context}){
const {loading,sortedRooms,rooms}=context;
if(loading){
     return <Loading />
            }
            return(
                <>
                <RoomsFilter rooms={rooms} />
                <RoomsList rooms={sortedRooms} />
            </>)
}

export default withRoomConsumer(RoomsContainer)
// import React from 'react'

// import {RoomConsumer} from '../context'
// import RoomsFilter from './RoomsFilter'
// import RoomsList from './RoomsList'

// import Loading from '../components/Loading'
// function RoomsContainer() {
//     return (
//         // access the context i will have to use roomconsumer
//         //in order to access the information we need to pass the 
//         //function and this is something called render props

//         <RoomConsumer>
//             {
//                 (value) => {
//                     // console.log(value);
//                     const {loading,sortedRooms,rooms} = value;
//                     if(loading){
//                         return <Loading />
//                     }
//                     return(
//                         <div>
//                         hello from rooms container 
//                         <RoomsFilter rooms={rooms} />
//                         <RoomsList rooms={sortedRooms} />
//                     </div>
//                     )
//                 }
//             }
//         </RoomConsumer>

      
//     )
// }

// export default RoomsContainer
