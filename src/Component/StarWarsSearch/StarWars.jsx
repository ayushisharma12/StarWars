import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import './StarWars.css'

const columns = [
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'birth_year', headerName: 'Birth Year', width: 170 },
    { field: 'gender', headerName: 'Gender', width: 170 },
  ];

const StarWars = (props) => {
  const [planetList,setPlanetList] = useState([]);
  const [peopleList,setPeopleList] = useState([]);
  const [planetSelected, setSelectedPanet]= useState('');
  const [isError,setIsError] = useState(false);
  useEffect(()=>{
    axios.get('https://swapi.dev/api/planets').then((res)=>{
        setPlanetList(res.data.results);
    }).catch((err)=>{
        console.log("error",err);
    });
  },[]);

  const handleSubmit = () => {
    const sPlanet = planetList.find(x => x?.name?.toUpperCase() == planetSelected?.toUpperCase())
    if(sPlanet){
       const residents = sPlanet.residents;
        setIsError(false);
        axios.all(residents.map((endpoint) => axios.get(endpoint))).then(
            (res) => {
                const arr = res.map((item,index) => {return {...item.data,id: index+1}});
                setPeopleList(arr);
            },
          ).catch((err)=>{
            console.log("error",err);
        });  
    }
    else {
        setIsError(true);
        setPeopleList([]);
    }
  };
  
    return (<>
    <div className="bold">List Of Planets:</div>
    {planetList.map((item,index) => <div key={index} className='planets'>{item.name}</div>)}
    <label htmlFor='planetName'  className="bold">Enter a Planet From the List: </label>
    <input 
        type='text' 
        name='planetName' 
        id='planetName' 
        onChange={(e) => {
        setSelectedPanet(e.target.value)
        }} 
        value={planetSelected}/>
    {isError && (
        <span className="error">Enter a Valid Planet</span>
        )}
    <div> <button type='submit'onClick={handleSubmit}>Search</button></div>
     <h2>People from this Planet</h2>
    {peopleList && 
        <div className='center'>
        <DataGrid
        rows={peopleList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        disableRowSelectionOnClick
      />
        </div>}
    </>)
}

export default StarWars;