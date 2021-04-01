import React, { Component } from 'react'
import items from './data'
//set up context api
 const RoomContext = React.createContext();

 class RoomProvider extends Component {
    
    //setup state here than we're going to place all our information in stae 
    state={
       rooms:[],
       sortedRooms:[],
       featuredRooms:[],
       loading:true,
       type:'all',
       capacity:1,
       price:0,
       minPrice:0,
       maxPrice:0,
       minSize:0,
       maxSize:0,
       breakfast:false,
       pets:false
    }

    componentDidMount(){
        let rooms = this.formateData(items);
        // consol e.log(rooms);
        let featuredRooms = rooms.filter(room => room.featured === true);
        //getting the max price 
        let maxPrice = Math.max(...rooms.map(item => item.price));
        //console.log(maxPrice);

        //getting the maxSize
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms,
            featuredRooms,
            sortedRooms:rooms,
            loading:false,
            price:maxPrice,
            maxPrice,
            maxSize
        });
       // console.log(featuredRooms);
    }

    formateData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);


            let room = { ...item.fields,images,id};
            // console.log(room);
            return room;
        });
        console.log(tempItems);
        return tempItems;
    }

    //getrooms
    getRoom = (slug) =>{
        let tempRooms = [...this.state.rooms];
        //difference between find and filter
        //find a first match and also is going to be an object within a filter you would need
        // get it out from the array filter is going to return the array
        const room = tempRooms.find(room => room.slug === slug)
        return room;
    }

    //handle change event
    handleChange = event =>{
        // for the general sleect option 
         const type = event.target.type
        // const name = event.target.name
        // const value = event.target.value
        //if the checkbox with filtering 
        //we have to target first 
        const target = event.target;
        //checkbox does'nt use value attribute 
        //it is used for checked attribute
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = event.target.name;

        this.setState(
            {
              [name]: value
            },
            this.filterRooms
          );
          //depending what we're gonna do with our input
          //we are also changing the values
        
        console.log(type,name,value)
    }


    filterRooms = () =>{
        //destructuring the state value
        let {rooms,type,capacity,price,minSize,maxSize,breakfast,pets} = this.state;
        //copy all the rooms
        let tempRooms = [...rooms];
        //transform value cause when we change the capacity it take the value as string 
        capacity = parseInt(capacity);
        //trnsform range value
        price= parseInt(price);
        //check if type is not equal to all
        //filter by type 
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type);
        }
        //filter by capacity
        if(capacity !==1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }
        //filter by price range
        tempRooms = tempRooms.filter(room => room.price <=price);

        //filter by size type input 
        tempRooms = tempRooms.filter(room => room.size >=minSize && room.size <=maxSize);

        //filter by extras checkbox
        if(breakfast){
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }
        //filter by pets checkbox
        if(pets){
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
        //change state
        this.setState({
            sortedRooms: tempRooms
        })
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state,getRoom:this.getRoom,handleChange:this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

//access the data we need to create consumer

const RoomConsumer = RoomContext.Consumer;

//higher order component 
//in the function we're gonna pass the component than it will return 
//another function where basically they return another component 
export function withRoomConsumer(Component){
    //in this inner function we will grabing props
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value => <Component {...props} context={value} />}
        </RoomConsumer>
    }
}
export {RoomProvider,RoomConsumer,RoomContext}
