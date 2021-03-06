import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'

//get all unique values
const getUnique = (items,value)  =>{

    //set datastructure is the fact that set only accepts unique values.
    return [...new Set(items.map(item => item[value]))]
}
function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    console.log(context);
    const {handleChange,type,capacity,price,minPrice,maxPrice,minSize,maxSize,breakfast,pets} = context;
//get unique type using the function
    let types = getUnique(rooms,'type')
    //add all in the type option 
    types=['all',...types]
    //types map to jsx
    types = types.map((item,index) => {
        return (
            <option key={index} value={item}>{item}</option>
        )
    })

   let people = getUnique(rooms,'capacity');
   people = people.map((item,index) =>{
       return <option key={index} value={item}>{item}</option>
   })
    console.log(types);
    console.log();
    return (
        <section className='filter-container'>
            <Title title='search rooms' />

            <form className='filter-form'>
                {/* select type */}
                <div className='form-group'>
                    <label htmlFor='type'>room type</label>
                    {/* name inherite from handlechange event from the context and it should be same value is upper context value we use */}
                    <select name='type' id='type' value={type} className='form-control' onChange={handleChange}>
                    {types}
                    </select>
                    
                </div>
                {/* end select type */}

                    {/*guest*/}
                    <div className='form-group'>
                    <label htmlFor='type'>Guest</label>
                    <select name='capacity' id='capacity' value={capacity} className='form-control' onChange={handleChange}>
                    {people}
                    </select>
                </div>
                {/* end guest type */}
                {/* room price */}
                <div className='form-group'>
                    <label htmlFor='price'>
                        room price ${price}
                    </label>
                    {/* value are be the price that we are getting currently from state */}
                    <input type='range' name='price' min={minPrice} max={maxPrice} id='price' value={price} onChange={handleChange} className='form-control' />
                </div>
                {/* end of room price */}

                {/* size */}
                <div className='form-group'>
                    <label htmlFor='size'>room size
                    </label>
                    <div className='size-inputs'>
                        <input type='number' name='minSize' id='size' value={minSize} onChange={handleChange} className='size-input' />
                        <input type='number' name='maxSize' id='size' value={maxSize} onChange={handleChange} className='size-input' />
                    </div>
                </div>
                {/* end of size */}
                {/* extras */}
                <div className='form-group'>
                    <div className='single-extra'>
                        <input type='checkbox' name='breakfast' id='breakfast' checked={breakfast} onChange={handleChange}/>
                        <label htmlFor='breakfast'>breakfast</label>
                    </div>
                    <div className='single-extra'>
                        <input type='checkbox' name='pets' id='pets' checked={pets} onChange={handleChange}/>
                        <label htmlFor='pets'>pets</label>
                    </div>
                </div>
                {/* end of extras */}
            </form>
        </section>
    )
}

export default RoomsFilter
