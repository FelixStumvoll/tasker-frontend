import { TASK_CREATE, TASK_REMOVE, TASK_UPDATE } from './taskActionTypes';

const initialState = [
    {
        id: 1,
        title: 'test',
        description:
            'test-description\nasdfasdfasy xcvvvvvvvvvvvvvvvvvvvv\nvv vvvvvvv vvvvvvvvvv vvvvvvvvvv vvvvvvvvvvv vvvvvvvvvvv vvvvvvv vv vvvvvvvvvvvvvvvvvvvvvvvv vvvd',
        completed: false
    },
    {
        id: 2,
        title: 'test2',
        description: 'test-description1',
        completed: false
    }
];

export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case TASK_UPDATE:
            let index = state.indexOf(payload.task);

            return [
                ...state.slice(0, index),
                Object.assign({}, payload.task),
                ...state.slice(index + 1)
            ];
        // return [
        //     ...state.filter(task => task.id !== payload.task.id),
        //     Object.assign({}, payload.task)
        // ];

        case TASK_CREATE:
            return [...state, Object.assign({}, payload.event)];

        case TASK_REMOVE:
            return [...state.filter(task => task.id !== payload.task.id)];
        default:
            return state;
    }
};
