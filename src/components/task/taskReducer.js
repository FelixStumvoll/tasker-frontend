import {
    TASK_CREATE,
    TASK_REMOVE,
    TASK_UPDATE,
    TASK_END_EDIT,
    TASK_START_EDIT
} from './taskActionTypes';

const initialState = [
    {
        id: '1',
        title: 'test',
        description: 'task 1',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '2',
        title: 'test2',
        description:
            'test-description1cvxyvxyc\nasdfasdfsadfasfcxvbcvxbcxvbxcvbxcvb',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '3',
        title: '',
        description: 'test-description1',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '2',
        title: 'test2',
        description:
            'test-description1cvxyvxyc\nasdfasdfsadfasfcxvbcvxbcxvbxcvbxcvb',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '2',
        title: 'test2',
        description:
            'test-description1cvxyvxyc\nasdfasdfsadfasfcxvbcvxbcxvbxcvbxcvb',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '2',
        title: 'test2',
        description:
            'test-description1cvxyvxyc\nasdfasdfsadfasfcxvbcvxbcxvbxcvbxcvb',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '2',
        title: 'test2',
        description:
            'test-description1cvxyvxyc\nasdfasdfsadfasfcxvbcvxbcxvbxcvbxcvb',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '2',
        title: 'test2',
        description:
            'test-description1cvxyvxyc\nasdfasdfsadfasfcxvbcvxbcxvbxcvbxcvb',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '2',
        title: 'test2',
        description:
            'test-description1cvxyvxyc\nasdfasdfsadfasfcxvbcvxbcxvbxcvbxcvb',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '2',
        title: 'test2',
        description:
            'test-description1cvxyvxyc\nasdfasdfsadfasfcxvbcvxbcxvbxcvbxcvb',
        completed: false,
        editing: false,
        showAnimation: false
    },
    {
        id: '2',
        title: 'test2',
        description:
            'test-description1cvxyvxyc\nasdfasdfsadfasfcxvbcvxbcxvbxcvbxcvb',
        completed: false,
        editing: false,
        showAnimation: false
    }
];

export default (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case TASK_UPDATE:
            let updateIndex = getTaskById(payload.task.id, state);

            return [
                ...state.slice(0, updateIndex),
                Object.assign({}, payload.task),
                ...state.slice(updateIndex + 1)
            ];

        case TASK_CREATE:
            return [Object.assign({}, payload.task), ...state];

        case TASK_REMOVE:
            return [...state.filter(task => task.id !== payload.task.id)];

        case TASK_START_EDIT:
            let startEditIndex = getTaskById(payload.id, state);

            return [
                ...state.slice(0, startEditIndex),
                Object.assign({}, state[startEditIndex], { editing: true }),
                ...state.slice(startEditIndex + 1)
            ];
        case TASK_END_EDIT:
            let endEditIndex = getTaskById(payload.id, state);

            return [
                ...state.slice(0, endEditIndex),
                Object.assign({}, state[endEditIndex], { editing: false }),
                ...state.slice(endEditIndex + 1)
            ];
        default:
            return state;
    }
};

const getTaskById = (id, state) => {
    return state.findIndex(item => item.id === id);
};
