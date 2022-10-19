import axios from 'axios';
import React, { useEffect, useState } from 'react';

const URL = 'http://localhost:8080/workouts';

const Workouts = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        axios.get(URL).then(({ data }) => {
            setWorkouts(data);
        });
    }, []);

    const workoutsList = workouts.map((item) => (
        <div key={item._id}>
            <p>Название: {item.name}</p>
        </div>
    ));

    return (
        <div>
            <p>Список тренировок</p>
            <div>{workouts.length ? workoutsList : 'Loading...'}</div>
        </div>
    );
};

export default Workouts;
