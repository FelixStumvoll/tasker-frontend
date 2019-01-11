import { format } from 'date-fns';

export const dateSortFunction = (lhs, rhs) => {
    if (!lhs.dueDate) {
        return 1;
    }

    if (!rhs.dueDate) {
        return -1;
    }

    return new Date(lhs.dueDate) - new Date(rhs.dueDate);
};

const searchString = (regex, string, searchTerm) => {
    return regex
        ? regex.test(string) || string.includes(searchTerm)
        : string.includes(searchTerm);
};

export const searchFilterFunction = (task, searchTerm) => {
    let taskEx;
    try {
        taskEx = new RegExp(`.*${searchTerm}.*`);
    } catch (ex) {}

    if (task.title && searchString(taskEx, task.title, searchTerm)) return true;

    //text:\s*(".*")\s*([,]|[}])
    if (
        task.text &&
        searchString(taskEx, JSON.stringify(task.text), searchTerm)
    )
        return true;

    if (
        task.tags.find(tag => {
            return searchString(taskEx, tag, searchTerm);
        })
    ) {
        return true;
    }

    if (
        task.dueDate &&
        searchString(taskEx, format(task.dueDate, 'dd.MM.yyyy'), searchTerm)
    )
        return true;

    return false;
};
